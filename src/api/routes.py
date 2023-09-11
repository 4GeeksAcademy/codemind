"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Exercise
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

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
    firstName = request.json.get("firstName")
    lastName = request.json.get("lastName")
    email = request.json.get("email")
    password = request.json.get("password")
    secure_password = bcrypt.generate_password_hash(
        password, 10).decode("utf-8")
    img = request.json.get("img")
    # role = request.json.get("role")
    new_user = User()
    new_user.firstName = firstName
    new_user.lastName = lastName
    new_user.email = email
    new_user.password = secure_password
    new_user.img = img
    new_user.role = "alumno"
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario registrado"}), 201


@api.route('/user', methods=['GET'])
def get_users():

    users = User.query.all()
    return jsonify(users=[user.serialize() for user in users]), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_id(user_id):

    user = User.query.get(user_id)

    if user is not None:
        return jsonify(user=[user.serialize()]), 200

    return jsonify({"msg": "El usuario no existe"}), 400


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):

    user = User.query.get(user_id)

    if user is not None:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "Usuario eliminado"}), 201

    return jsonify({"msg": "El usuario no existe"}), 400


@api.route('/user/<int:user_id>', methods=['PUT'])
def put_user_id(user_id):

    user = User.query.get(user_id)

    firstName = request.json.get("firstName")
    lastName = request.json.get("lastName")
    email = request.json.get("email")
    password=request.json.get("password")
    secure_password = bcrypt.generate_password_hash(password,10).decode("utf-8")
    img = request.json.get("img")
    role = request.json.get("role")
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = secure_password
    user.img = img
    user.role = role
    # new_user.is_active = True
    db.session.commit()
    return jsonify({"msg": "El usuario a sido actualizado"}), 201



@api.route('/exercise', methods=['POST'])
def create_excercise():
    module = request.json.get("module")
    type = request.json.get("type")
    question = request.json.get("question")
    answers = request.json.get("answers")
    info_blog = request.json.get("info_blog")
    info_youtube = request.json.get("info_youtube")
    if not isinstance(answers, list):
        answers = [answers]
    print(answers)
    new_excercise = Exercise()
    new_excercise.module = module
    new_excercise.type = type
    new_excercise.question= question
    new_excercise.answers = answers
    new_excercise.info_blog = info_blog
    new_excercise.info_youtube = info_youtube
    db.session.add(new_excercise)
    db.session.commit()
    exercise_id = new_excercise.id
    exercise = answers
    
    return jsonify({"msg": "Exercise created successfully", "statusCode": 201, "exercise_id": exercise_id, "ex" : exercise }), 201

@api.route('/exercise/<int:id>', methods=['GET'])
def get_uexcercise_id(id):

    exercise = Exercise.query.get(id)

    if exercise is not None:
        return jsonify(exercise.serialize()), 200

    return jsonify({"msg": "El exercise no existe"}), 400


@api.route('/exercises/<string:module>', methods=['GET'])
def get_exercises_by_module(module):
    exercises = Exercise.query.filter_by(module=module).all()

    if exercises:
        serialized_exercises = [exercise.serialize() for exercise in exercises]
        return jsonify({"exercises": serialized_exercises}), 200
    else:
        return jsonify({"msg": "No se encontraron ejercicios para el tipo de módulo especificado"}), 404