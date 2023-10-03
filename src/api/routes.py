"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Exercise,Answers, TokenBlockedList, Teacher
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timezone

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


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
        print(e)
        return jsonify({"error": str(e)}), 500


@api.route('/user', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify(users=[user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({"error":str(e)}),500

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_id(user_id):
    try:

        user = User.query.get(user_id)

        if user is not None:
         return jsonify(user=[user.serialize()]), 200

        return jsonify({"msg": "El usuario no existe"}), 400
    
    except Exception as e:
        return jsonify({"error":str(e)}),500


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
        return jsonify({"error":str(e)}),500


@api.route('/user/<int:user_id>', methods=['PATCH'])
def put_user_id(user_id):
    try:
        if user_id is  None:
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
def login_user():
    # Obtenemos los campos del cuerpo de la petición
    email = request.json.get("email")
    password = request.json.get("password")
    # Busca al ussuario en la base de datos
    user = User.query.filter_by(email = email).first()
    # Si el usuario no se encuentra, se retorna error
    if user is None:
        return jsonify({"message":"User not found"}),404
    # Si las claves no son validas, se retorna error
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"message":"Wrong password"}),401
    
    # Si pasan las validaciones, se genera el token
    token = create_access_token(identity = user.id, additional_claims = {"role":"admin"})
    user_data = {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "role": user.role,
        "img": user.img,
        "teacher": user.teacher
    }
    return jsonify({"message":"Login successful", "token":token, "user": user_data}),200

@api.route('/private') 
@jwt_required() # Este decorador convierte la ruta en protegida
def private():
    user_id = get_jwt_identity()
    claims = get_jwt()
    user = User.query.get(user_id)
    response = {
        "userId" : user_id,
        "claims" : claims,
        # "isActive" : user.is_active
    }
    return jsonify(response)

@api.route('/logout', methods=['POST'])
@jwt_required() 
def user_logout():
    jti=get_jwt()["jti"]
    now=datetime.now(timezone.utc)
    tokenBlocked=TokenBlockedList(token=jti,created_at=now)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message":"User logged out"}),200

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
        print(exercise_id)

        for answer_data in request.json.get("answers"):
            new_answer = Answers(
                answers=answer_data["text"],
                exercise_id=exercise_id,
                isCorrect=answer_data["isCorrect"],
                module= new_exercise.module,
                type= new_exercise.type
                )
            db.session.add(new_answer)

        db.session.commit()

        return jsonify({"msg": "Exercise created successfully", "statusCode": 201, "exercise_id": exercise_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@api.route('/exercise/<int:id>', methods=['GET'])
def get_exercise_by_id(id):
    try:
        exercise = Exercise.query.get(id)

        if exercise is not None:
            
            single_choice_answers = SingleChoiceAnswers.query.filter_by(exercise_id=id).all()

           
            serialized_answers = [answer.serialize() for answer in single_choice_answers]

            
            exercise_data = exercise.serialize()
            exercise_data["single_choice_answers"] = serialized_answers

            return jsonify(exercise_data), 200

        return jsonify({"msg": "El ejercicio no existe"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@api.route('/exercises/<string:module>', methods=['GET'])
def get_exercises_by_module(module):
    exercises = Exercise.query.filter_by(module=module.upper()).all()
    if exercises:
        serialized_exercises = [exercise.serialize() for exercise in exercises]
        return jsonify({"exercises": serialized_exercises}), 200
    else:
        return jsonify({"msg": "No se encontraron ejercicios para el tipo de módulo especificado"}), 404
    

@api.route('/answer/<string:module>', methods=['GET'])
def get_answer_fib(module):
    
    answers= Answers.query.filter_by(module=module.upper()).all()
    
    if answers:
        serialized_answers = [answer.serialize() for answer in answers]
        
        return jsonify({"answers": serialized_answers}), 200
    else:
        return jsonify({"msg": "No se encontraron ejercicios para el tipo de módulo especificado"}), 404
    
@api.route('/teachers', methods=['POST'])
def create_teacher():
    try:
        data = request.json
        new_teacher = Teacher(
            firstName=data['firstName'],
            lastName=data['lastName'],
            email=data['email'],
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