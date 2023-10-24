const getState = ({ getStore, getActions, setStore }) => {
	const storedUserData = localStorage.getItem('userData');
	const initialUser = storedUserData ? JSON.parse(storedUserData) : null;

	return {
		store: {
			token: null,
			message: null,
			exercises: [],
			simpleChoice: [],
			last_answer: [],
			respuestaUser: [],
			progress: null,
			progressModule: null,
			progressGeneral : {},
			progressStudents : {},
			module: {
				html: {
					imagen: "https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/html5-logo-and-wordmark-1@2x.png",
					color: "#F16529"
				},
				css: {
					imagen: "https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/1200px-css-3-1@2x.png",
					color: "#29A9DF"
				},
				js: {
					imagen: "https://generation-sessions.s3.amazonaws.com/ad60b588835c42a878fbc4ab00aaadec/img/unofficial-javascript-logo-2-1@2x.png",
					color: "#F7DF1E"
				}
			},

			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			user: initialUser,
			teachers: null,
			teacherData: null,
			email: null
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getRespuestaUser: async () => {
				const url = process.env.BACKEND_URL + `/api/respuestauser`
				const token = localStorage.getItem('userToken')
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}

				try {
					// fetching data from the backend
					const resp = await fetch(url, options)
					const data = await resp.json()
					const respuestaUser = data.respuestas
					setStore({ respuestaUser })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getProgreso: async () => {


				const url = process.env.BACKEND_URL + `/api/progress`
				const token = localStorage.getItem('userToken')
        
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}

				try {
					// fetching data from the backend
					const resp = await fetch(url, options)
					const data = await resp.json()
					const progress = data.progress

					setStore({progress})

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getProgresoModulo: async (module) => {

				const url = process.env.BACKEND_URL + `/api/progress/${module}`
				const token = localStorage.getItem('userToken')
				if (!token) {
					return false
				}
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}

				try {

					// fetching data from the backend
					const resp = await fetch(url, options)
					const data = await resp.json()
					const progressModule = data.progress
					setStore({ progressModule })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getProgresoGeneral: async () => {

				const url = process.env.BACKEND_URL + `/api/progressgeneral`
				const token = localStorage.getItem('userToken')
				if (!token) {
					return false
				}
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}

				try {

					// fetching data from the backend
					const resp = await fetch(url, options)
					const data = await resp.json()
					const progressGeneral = data
					setStore({ progressGeneral })
				
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getProgresoStudents: async () => {

				const url = process.env.BACKEND_URL + `/api/progressall`
				const token= localStorage.getItem('userToken')
				if(!token){
					return false
				}
				const options = {
						method:  'GET',
						headers: {
							'Content-Type': 'application/json', 
							'Access-Control-Allow-Origin': '*',
							'Authorization': `Bearer ${token}`
						}
					}

				try{

					// fetching data from the backend
					const resp = await fetch(url,options)
					const data = await resp.json()
					const progressStudents= data
					setStore({progressStudents})
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getLastAnswerModule: async (module) => {


				const url = process.env.BACKEND_URL + `/api/progress/${module}`
				const token = localStorage.getItem('userToken')
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}
				try {

					// fetching data from the backend
					const resp = await fetch(url, options)
					const data = await resp.json()
					const last_answer = data.last_answer
					setStore({ last_answer })

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			UpdateLastAnswer: (pregunta) => {
				setStore({ last_answer: pregunta })
			},

			getVerificar: async (id, respuesta) => {


				const url = process.env.BACKEND_URL + `/api/verificar-respuesta/${id}`
				const token = localStorage.getItem('userToken')
        
				const options = {
					method: 'POST',
					body: JSON.stringify({ respuesta }),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': `Bearer ${token}`
					}
				}
				try {
					const resp = await fetch(url, options)
					if (resp.ok) {
						const data = await resp.json()

						const respuesta = data.correct
						// don't forget to return something, that is how the async resolves
						return respuesta;
					} else {
						console.error('La solicitud no se realizó con éxito');
					}
				} catch (error) {
					console.error(error)
				}
			},

			getExercises: async (module) => {
				try {

					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${module}`)
					const data = await resp.json()
					const exercises = data.exercises


					setStore({ exercises })

					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addUser: async (newUser) => {
				const url = process.env.BACKEND_URL + '/api/user'
				const options = {
					method: 'POST',
					body: JSON.stringify(newUser),
					headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
				}
				try {
					const resp = await fetch(url, options)
					if (resp.ok) {
						console.log('La solicitud se realizó con éxito');
					} else {
						console.error('La solicitud no se realizó con éxito');
					}
				} catch (error) {
					console.error(error)
				}
			},

			loginUser: async (userCredentials) => {
				const url = process.env.BACKEND_URL + '/api/login';
				const options = {
					method: 'POST',
					body: JSON.stringify(userCredentials),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				};
				try {
					const resp = await fetch(url, options);
					console.log()
					if (resp.ok) {
						const data = await resp.json();
						console.log('La solicitud se realizó con éxito');
						localStorage.setItem('userToken', data.token);
						
						await setStore({ user: data.user, token: data.token });
						localStorage.setItem('userData', JSON.stringify(data.user));
						let { user } = getStore()
						// console.log("loginuserdata" + JSON.stringify(user))
						return { success: true };


					} else {
						console.log('La solicitud de login no se realizó con éxito');
						return { success: false, error: 'Contraseña incorrecta' };
					}
				} catch (error) {
					console.error(error);
					return { success: false, error: 'Error de red' };
				}
			},
			getTeachers: async () => {
				const url = process.env.BACKEND_URL + '/api/teachers';
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}

				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = await resp.json()
						await setStore({ teachers: data.teachers })
						return data
					}
				} catch (error) {
					console.error(error)
				}
			},
			updateUser: async (data) => {

				// console.log("new User Data " + JSON.stringify(data) + "userId " + data.id)
				const role = data.role;
				// console.log(role)
				let url;
				if (role === 'teacher') {

					url = process.env.BACKEND_URL + '/api/teacher/' + data.id;
				} else if (role === 'alumno') {

					url = process.env.BACKEND_URL + '/api/user/' + data.id;
				} else {
					console.error('Rol de usuario no válido');
					return;
				}

				const options = {
					method: 'PATCH',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}
				try {
					const resp = await fetch(url, options)
					if (resp.ok) {
						console.log('La solicitud se realizó con éxito');
						let { user } = getStore();
						const updatedUser = { ...user, ...data };
						await setStore({ user: updatedUser });
						localStorage.setItem('userData', JSON.stringify(updatedUser));
					
					} else {
						console.error('La solicitud no se realizó con éxito');
					}
				} catch (error) {
					console.error(error)
				}
			},
			getTeachersStudents: async (userid) => {
				let { teacherData } = getStore()
				const url = process.env.BACKEND_URL + '/api/teacher/' + userid;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}

				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = await resp.json()
						const updatedTeacherData = { ...teacherData, ...data };
						await setStore({ teacherData: updatedTeacherData })
						// console.log("getTeacherStflux" + JSON.stringify(updatedTeacherData));
						return data
					}
				} catch (error) {
					console.error(error)
				}
			},
			logout: async () => {
				const token = localStorage.getItem('userToken');
				if (!token) {
					console.error('No se encontró un token en localStorage');
					return;
				}
				const url = process.env.BACKEND_URL + '/api/logout';
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': 'Bearer ' + token
					}

				}
				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						localStorage.removeItem('userToken');
						localStorage.removeItem('userData');
						await setStore({ user: null, token: null });
						return { success: true };
					} else {
						console.error('La solicitud de logout no se realizó con éxito');
					}
				} catch (error) {
					console.error(error);
				}
			},
			checkToken: async (token) => {

				const url = process.env.BACKEND_URL + '/api/check-token';
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': 'Bearer ' + token
					}

				}
				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = JSON.stringify(resp.json)
						return data;
					} else {
						console.error('La solicitud de logout no se realizó con éxito');
					}
				} catch (error) {
					console.error(error);
				}
			},
			recoveryPassword: async (email) => {
				const url = process.env.BACKEND_URL + '/api/requestpassword';
				const options = {
					method: 'POST',
					body: JSON.stringify({
						email
					}),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}


				}
				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						return { success: true, "msg": "mail Enviado" };
					} else {
						console.error('La solicitud de logout no se realizó con éxito');
					}
				} catch (error) {
					console.error(error);
				}
			},
			getUser: async (userid) => {
				let { teacherData } = getStore()
				const url = process.env.BACKEND_URL + '/api/user/' + userid;
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}

				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = await resp.json()
						return data
					}
				} catch (error) {
					console.error(error)
				}
			},
			decrypt: async (token) => {
				const url = process.env.BACKEND_URL + '/api/decrypt';
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': 'Bearer ' + token
					}
				}
				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = await resp.json()
						return data
					}
				} catch (error) {
					console.error(error)
				}
			},
			changePassword: async (credentials) => {
				const url = process.env.BACKEND_URL + '/api/changepassword';
				console.log(credentials)
				const options = {
					method: 'PATCH',
					body: JSON.stringify({
						"email": credentials.email,
						"password": credentials.password
					}),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'

					}
				}
				try {
					const resp = await fetch(url, options);
					if (resp.ok) {
						const data = await resp.json()
						return data
					}
				} catch (error) {
					console.error(error)
				}
			},
			rechargeToken: ()=>{
				setStore({ token: localStorage.getItem('userToken') })
			}


		},
	};
};
export default getState;
