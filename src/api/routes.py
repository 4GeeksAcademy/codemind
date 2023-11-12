"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Exercise, Answers, TokenBlockedList, Teacher, AnswersUser, seed
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timezone

import smtplib
import ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders


smtp_address = os.getenv("SMTP_ADDRESS")
smtp_port = os.getenv("EMAIL_PORT")
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")


api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


def send_email(asunto, destinatario, body):
    message = MIMEMultipart("alternative")
    message["Subject"] = asunto
    message["From"] = email_address
    message["To"] = destinatario

    # Version HTML del body
    html = '''  
    <html>
    <body>
    <div>
    <h1></h1>
    ''' + body + '''
    </div>
    </body>
    </html> 
    '''

    # Crear elemento MIME
    html_mime = MIMEText(html, 'html')
    # adjuntamos el codigo del mensaje
    message.attach(html_mime)

    # Enviar el correo
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, destinatario, message.as_string())
        return True
    except Exception as error:
        print(str(error))
        return False


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['POST'])
def create_user():
    try:
        password = request.json.get("password")
        secure_password = bcrypt.generate_password_hash(
            password, 10).decode("utf-8")
        img = request.json.get("img")
        # role = request.json.get("role")
        new_user = User()
        new_user.firstName = request.json.get("firstName")
        new_user.lastName = request.json.get("lastName")
        new_user.email = request.json.get("email")
        new_user.password = secure_password
        new_user.img = request.json.get("img")
        new_user.role = "alumno"
        new_user.is_active = True
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario registrado"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/user', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify(users=[user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_id(user_id):
    try:

        user = User.query.get(user_id)

        if user is not None:
            return jsonify(user=[user.serialize()]), 200

        return jsonify({"msg": "El usuario no existe"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user is not None:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"msg": "Usuario eliminado"}), 201
        return jsonify({"msg": "El usuario no existe"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/user/<int:user_id>', methods=['PATCH'])
def put_user_id(user_id):
    try:
        if user_id is None:
            return jsonify({"msg": "El usuario no existe"}), 400

        user = User.query.get(user_id)

        if user is None:
            return jsonify({"msg": "El usuario no existe"}), 400

        fields_to_update = request.json

        for field, value in fields_to_update.items():
            if field == 'teacher':
                setattr(user, "teacher_id", value)
            else:
                print(field, value)
                setattr(user, field, value)

        print(user.serialize())

        db.session.commit()
        return jsonify({"msg": "El usuario ha sido actualizado"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    # Obtenemos los campos del cuerpo de la petición
    email = request.json.get("email")
    password = request.json.get("password")

    # Busca al usuario en la tabla de usuarios
    user = User.query.filter_by(email=email).first()
    teacher = Teacher.query.filter_by(email=email).first()

    if user:
        # Verifica la contraseña para usuarios
        if bcrypt.check_password_hash(user.password, password):
            identity = user.id
            user_data = {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "role": user.role,
                "img": user.img,
                 "teacher": user.teacher.student_teacher() if user.teacher else None
            }
        else:
            return jsonify({"message": "wrong password"}), 401

    elif teacher:
        # Verifica la contraseña para profesores
        if bcrypt.check_password_hash(teacher.password, password):
            identity = teacher.id
            user_data = teacher.serialize()
        else:
            return jsonify({"message": "Wrong password"}), 401
    else:
        return jsonify({"message": "User not found"}), 404

    # Genera el token basado en el rol
    role = "teacher" if teacher else "user"
    token = create_access_token(identity=identity, additional_claims={
                                "role": role, "email": email})

    return jsonify({"message": "Login successful", "token": token, "user": user_data}), 200


@api.route('/private')
@jwt_required()  # Este decorador convierte la ruta en protegida
def private():
    user_id = get_jwt_identity()
    claims = get_jwt()
    user = User.query.get(user_id)
    response = {
        "userId": user_id,
        "claims": claims,
        # "isActive" : user.is_active
    }
    return jsonify(response)


@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    tokenBlocked = TokenBlockedList(token=jti, created_at=now)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message": "User logged out"}), 200


@api.route('/exercise', methods=['POST'])
def create_excercise():
    try:
        new_exercise = Exercise(
            module=request.json.get("module"),
            type=request.json.get("type"),
            question=request.json.get("question"),
            info_blog=request.json.get("info_blog"),
            info_youtube=request.json.get("info_youtube"),
        )

        db.session.add(new_exercise)
        db.session.flush()
        exercise_id = new_exercise.id

        for answer_data in request.json.get("answers"):
            new_answer = Answers(
                answers=answer_data["text"],
                exercise_id=exercise_id,
                isCorrect=answer_data["isCorrect"],
                module=new_exercise.module,
                type=new_exercise.type
            )
            db.session.add(new_answer)

        db.session.commit()

        return jsonify({"msg": "Exercise created successfully", "statusCode": 201, "exercise_id": exercise_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/exercise/', methods=['GET'])
def get_exercise():
    try:
        exercises = Exercise.query.all()
        exercise_list = [exercise.serialize() for exercise in exercises]
        return jsonify({"exercise": exercise_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/exercises/<string:module>', methods=['GET'])
def get_exercises_by_module(module):
    try:
        exercises = Exercise.query.filter_by(module=module.upper()).all()
        if exercises:
            exercises = [exercise.serialize() for exercise in exercises]
            return jsonify({"exercises": exercises}), 200
        else:
            return jsonify({"msg": "No se encontraron ejercicios para el tipo de módulo especificado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/verificar-respuesta/<int:id>', methods=['POST'])
@jwt_required()
def verificar_respuesta(id):
    try:
        user_id = get_jwt_identity()
        correctAnswers = Answers.query.filter_by(
            exercise_id=id).filter_by(isCorrect=True).first()
        user_answer_exist = AnswersUser.query.filter_by(
            user_id=user_id).filter_by(exercise_id=id).first()
        

        if correctAnswers is None:
            return {"msg": "No existe el ejercicio"}

        data = request.json
        correct = data["respuesta"] == correctAnswers.answers

        if user_answer_exist is None and correct is True:
            user_answer = AnswersUser()
            user_answer.user_id = user_id,
            user_answer.exercise_id = id,
            user_answer.module = correctAnswers.module,
            user_answer.type = correctAnswers.type,
            db.session.add(user_answer)
            db.session.commit()

        return {"correct": correct}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/respuestauser', methods=['GET'])
@jwt_required()
def verifica():
    try:
        user_id = get_jwt_identity()
        users = AnswersUser.query.filter_by(user_id=user_id).all()
        id_respuestas = list(
            map(lambda respuesta: respuesta.exercise_id, users))
        return jsonify({"respuestas": id_respuestas}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/teachers', methods=['POST'])
def create_teacher():
    try:
        password = request.json.get("password")
        secure_password = bcrypt.generate_password_hash(
            password, 10).decode("utf-8")
        data = request.json
        new_teacher = Teacher(
            firstName=data['firstName'],
            lastName=data['lastName'],
            email=data['email'],
            password=secure_password,
            role=data['role']
        )
        db.session.add(new_teacher)
        db.session.commit()
        return jsonify({"message": "Profesor creado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/teachers', methods=['GET'])
def get_teachers():
    try:
        teachers = Teacher.query.all()
        teacher_list = [teacher.list_teachers() for teacher in teachers]
        return jsonify({"teachers": teacher_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/teachers/students', methods=['GET'])
def get_teachers_students():
    try:
        teachers = Teacher.query.all()
        teacher_list = [teacher.serialize() for teacher in teachers]
        return jsonify({"teachers": teacher_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/teacher/<int:user_id>', methods=['PATCH'])
def put_teacher_id(user_id):
    try:
        if user_id is None:
            return jsonify({"msg": "El usuario no existe"}), 400

        teacher = Teacher.query.get(user_id)

        if teacher is None:
            return jsonify({"msg": "El usuario no existe"}), 400

        fields_to_update = request.json

        for field, value in fields_to_update.items():
            if field == 'teacher':
                setattr(teacher, "teacher_id", value)
            else:
                print(field, value)
                setattr(teacher, field, value)

        print(teacher.serialize())

        db.session.commit()
        return jsonify({"msg": "El usuario ha sido actualizado"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/teacher/<int:teacher_id>', methods=['GET'])
def get_teacher_id(teacher_id):
    try:
        teacher = Teacher.query.get(teacher_id)

        if teacher is not None:
            return jsonify(teacher=[teacher.serialize()]), 200

        return jsonify({"msg": "El usuario no existe"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/check-token', methods=['POST'])
@jwt_required()
def check_token():
    jti = get_jwt()["jti"]
    # Verificar si el jti está en la tabla TokenBlockList
    blocked_token = TokenBlockedList.query.filter_by(token=jti).first()

    if blocked_token:
        return jsonify({"Success": True, "msg": "Token bloqueado"}), 200
    else:
        return jsonify({"Success": False, "msg": "Token no bloqueado"}), 200


@api.route('/seed', methods=['POST', 'GET'])
def handle():
    seed()
    response_body = {
        "message": "Data cargada"
    }

    return jsonify(response_body), 200


@api.route('/progress', methods=['GET'])
@jwt_required()
def progress_users():
    try:
        user_id = get_jwt_identity()
        answers_user = AnswersUser.query.filter_by(user_id=user_id)
        answers_number = answers_user.count()
        if answers_number == 0:
            return jsonify({"progress": 0}), 200
        last_answer = answers_user.order_by(AnswersUser.id.desc()).first()
        question_all = Exercise.query.count()
        progreso = answers_number/question_all * 100
        return jsonify({"progress": progreso, "last_answer": last_answer.serialize()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/progressall', methods=['GET'])
@jwt_required()
def progress_users_all():
    try:
        teacher_id = get_jwt_identity()
        users_progress=[]
        user_list= User.query.filter_by(teacher_id=teacher_id)
        for user in user_list:
            answers_user = AnswersUser.query.filter_by(user_id= user.id)
            answers_number = answers_user.count()
            if answers_number == 0:
                users_progress.append(0)
                continue
            question_all = Exercise.query.count()
            progreso = answers_number/question_all * 100
            users_progress.append(round(progreso,1))
        return jsonify(users_progress), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/progress/<string:module>', methods=['GET'])
@jwt_required()
def progress_users_module(module):
    try:
        user_id = get_jwt_identity()
        answers_user = AnswersUser.query.filter_by(
            user_id=user_id).filter_by(module=module.upper())
        answers_number = answers_user.count()
        if answers_number == 0:
            last_answer = Exercise.query.filter_by(
                module=module.upper()).first()
            return jsonify({"progress": 0, "last_answer": last_answer.serialize()}), 200
        last_answer = answers_user.order_by(AnswersUser.id.desc()).first()
        question_all_module = Exercise.query.filter_by(
            module=module.upper()).count()
        progreso = answers_number/question_all_module * 100
        return jsonify({"progress": progreso, "last_answer": last_answer.serialize()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/progressgeneral', methods=['GET'])
@jwt_required()
def progress_users_modules():
    try:
        user_id = get_jwt_identity()


        answers_user_html = AnswersUser.query.filter_by(user_id=user_id).filter_by(module="HTML")
        answers_number_html = answers_user_html.count()

        answers_user_css = AnswersUser.query.filter_by(user_id=user_id).filter_by(module="CSS")
        answers_number_css = answers_user_css.count()

        answers_user_js = AnswersUser.query.filter_by(user_id=user_id).filter_by(module="JS")
        answers_number_js = answers_user_js.count()

        question_all_html = Exercise.query.filter_by(module="HTML").count()
        question_all_css = Exercise.query.filter_by(module="CSS").count()
        question_all_js = Exercise.query.filter_by(module="JS").count()

        progreso_html = answers_number_html/question_all_html * 100
        progreso_css = answers_number_css/question_all_css * 100
        progreso_js = answers_number_js/question_all_js * 100

        return jsonify({"progress_html": progreso_html,"progress_css": progreso_css,"progress_js": progreso_js}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/requestpassword', methods=["POST"])
def endpoint_mail():
    body = request.get_json()
    email = body["email"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        user = Teacher.query.filter_by(email=email).first()
        if user is None:
            print(jsonify({"message": "El usuario no existe"}))

    token = create_access_token(identity=email, additional_claims={
                                "type": "password", "email": email})

    cuerpo = os.getenv("FRONTEND_URL") + '/changepassword?token=' + token
    verificar = send_email("Recuperacion de Clave", email, cuerpo)

    if verificar == True:
        return jsonify({"message": "Gmail Enviado"}), 200
    else:
        return jsonify({"message": "No se pudo enviar el correo"}), 400


@api.route('/changepassword', methods=['PATCH'])
def change_password():
    try:
        body = request.get_json()
        email = body["email"]
        user = User.query.filter_by(email=email).first()
        if user is None:
            teacher = Teacher.query.filter_by(email=email).first()
            if teacher is None:
                return jsonify({"message": "El usuario no existe"}), 404

        new_password = request.json.get("password")
        if new_password:
            hashed_password = bcrypt.generate_password_hash(
                new_password, 10).decode("utf-8")

            if user:
                user.password = hashed_password
            elif teacher:
                teacher.password = hashed_password

            db.session.commit()

            return jsonify({"message": "Contraseña cambiada exitosamente"}), 200
        else:
            return jsonify({"message": "La nueva contraseña no se proporcionó"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/decrypt', methods=['POST'])
@jwt_required()
def decrypt():
    try:
        email = get_jwt().get('email', None)

        return jsonify({"email": email}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
