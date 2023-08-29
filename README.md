


# CodeMind Plataforma de Aprendizaje

![LOGO](https://github.com/4GeeksAcademy/codemind/assets/83560861/d2c8e8df-cd89-4529-bf01-aaa0a61ee2ff)

¡Bienvenido/a a la Plataforma de Aprendizaje CodeMind! Esta plataforma ha sido diseñada tanto para administradores como para estudiantes, brindando un entorno interactivo y educativo para mejorar tus habilidades en programación y convertirte en un desarrollador fullstack.



## Descripción del Proyecto

CodeMind es una plataforma de aprendizaje diseñada para empoderar a los estudiantes en su viaje para convertirse en desarrolladores fullstack. Ya sea que estés dando tus primeros pasos en la programación o buscando mejorar tus habilidades existentes, CodeMind te ofrece una variedad de recursos y ejercicios para estimular tu conocimiento y creatividad.


## Nuestras características clave incluyen:

- **Registro de Usuarios:** Los administradores pueden gestionar usuarios, mientras que los estudiantes pueden registrarse en la plataforma.

- **Ruta de Aprendizaje:** Los estudiantes tienen acceso a una guía de módulos de práctica para avanzar en su camino para convertirse en desarrolladores fullstack.

- **Aviso de Ejercicios:** Después de cada módulo, se proporciona un ejercicio recomendado para practicar.

- **Identificador de Progreso:** Los estudiantes pueden realizar un seguimiento de su progreso en los ejercicios.

- **Diversidad de Ejercicios:** Los ejercicios incluyen cuestionarios, proyectos y desafíos para estimular la creatividad y el conocimiento.

- **Recursos Adicionales:** Los estudiantes tienen acceso a enlaces y documentos extra para resolver dudas.

- **Contenidos de Aprendizaje:** Se proporcionan recursos educativos sobre diversos tópicos de programación.

- **Gestión de Usuarios:** Los administradores pueden eliminar usuarios en caso de comportamiento indebido.

- **Autenticación Segura:** Los usuarios pueden iniciar sesión de manera segura en sus cuentas de CodeMind.

- **Cambio y Olvido de Contraseña:** Los usuarios pueden cambiar su contraseña y recuperarla en caso de olvido.

- **Cerrar Sesión:** Los usuarios pueden cerrar sesión para proteger su privacidad y seguridad.


## Configuración

- Consulta los archivos README  para obtener detalles sobre la configuración específica.

## Contribución

Si deseas contribuir a este proyecto, ¡estamos emocionados por tener tu ayuda! Por favor, sigue estas pautas para contribuir:

1. Haz un fork de este repositorio.
2. Crea una rama para tu función o corrección: `git checkout -b nueva-funcion`.
3. Realiza los cambios necesarios y realiza commit: `git commit -m "Agrega nueva función"`.
4. Envía tus cambios a tu repositorio en GitHub: `git push origin nueva-funcion`.
5. Crea una Pull Request en este repositorio para que podamos revisar tus cambios.

##Figma
[Figma](https://www.figma.com/file/g48LF56UejAo4uYpuIMUgV/Untitled?type=design&node-id=0-1&mode=design&t=BDpkpQblPD672V5q-0
)
## Contacto

Si tienes preguntas o comentarios sobre la plataforma, no dudes en contactarnos.

---

¡Esperamos que disfrutes utilizando CodeMind para mejorar tus habilidades de programación! ¡Feliz aprendizaje!














------------------------------------------------


# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://start.4geeksacademy.com/starters/react-flask
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to heroku [in just a few steps here](https://start.4geeksacademy.com/backend/deploy-heroku-posgres).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://start.4geeksacademy.com/deploy).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).
