const getState = ({ getStore, getActions, setStore }) => {
	const storedUser = JSON.parse(localStorage.getItem('userData'));

	return {
		store: {
			message: null,
			fib: [],
			simpleChoice: [],
			answers_SC: [],
			answers_fib: [],
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
			user: storedUser || null,
			teachers: null

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getFib: async (module) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${module}`)
					const data = await resp.json()
					const exercises = data.exercises
					const fib = exercises.filter(exercise => exercise.type === "FIB")
					setStore({ fib })
					console.log(data)
					console.log(getStore().fib)
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getSimpleChoice: async (module) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${module}`)
					const data = await resp.json()
					const exercises = data.exercises
					const simpleChoice = exercises.filter(exercise => exercise.type === "SC")
					setStore({ simpleChoice })
					console.log(data)
					console.log(getStore().simpleChoice)
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},


			getAnswers_fib: async (module) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `api/answer/${module}`)
					const data = await resp.json()
					const answers = data.answers
					const fib = answers.filter(answer => answer.type === "FIB")
					setStore({ answers_fib: fib })
					console.log(data)
					console.log(getStore().answers_fib)
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getAnswers_SC: async (module) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `api/answer/${module}`)
					const data = await resp.json()
					const answers = data.answers
					const SC = answers.filter(answer => answer.type === "SC")
					setStore({ answers_SC: SC })
					console.log(data)
					console.log(getStore().answers_SC)
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
					if (resp.ok) {
						const data = await resp.json();
						console.log('La solicitud se realizó con éxito');
						localStorage.setItem('userToken', data.token);
						await setStore({ user: data.user })
						localStorage.setItem('userData', JSON.stringify(data.user));
						let { user } = getStore()
						console.log("loginuserdata" + JSON.stringify(user))
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

				console.log("new User Data " + JSON.stringify(data) + "userId " + data.id)

				const url = process.env.BACKEND_URL + '/api/user/' + data.id;
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

		}
	};
};
export default getState;
