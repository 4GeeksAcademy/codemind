"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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