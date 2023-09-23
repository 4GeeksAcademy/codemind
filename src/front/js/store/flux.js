const getState = ({ getStore, getActions, setStore }) => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	return {
		store: {
			message: null,
			fib : [],
			simpleChoice:[],
			answers_SC : [],
			answers_fib : [],
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
			user:storedUser || null
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getFib: async (module) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${module}`)
					const data = await resp.json()
					const exercises = data.exercises
					const fib = exercises.filter(exercise=>exercise.type === "FIB")
					setStore({ fib })
					console.log(data)
					console.log(getStore().fib)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getSimpleChoice: async (module) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${module}`)
					const data = await resp.json()
					const exercises = data.exercises
					const simpleChoice = exercises.filter(exercise=>exercise.type === "SC")
					setStore({ simpleChoice})
					console.log(data)
					console.log(getStore().simpleChoice)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			

			getAnswers_fib: async (module) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `api/answer/${module}`)
					const data = await resp.json()
					const answers = data.answers
					const fib = answers.filter(answer=>answer.type === "FIB")
					setStore({ answers_fib: fib})
					console.log(data)
					console.log(getStore().answers_fib)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getAnswers_SC: async (module) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `api/answer/${module}`)
					const data = await resp.json()
					const answers = data.answers
					const SC = answers.filter(answer=>answer.type === "SC")
					setStore({ answers_SC: SC})
					console.log(data)
					console.log(getStore().answers_SC)
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
			addUser:  (newUser) => {
			const {user} = getStore()
			const updatedUser = { ...user, ...newUser };
			setStore({ user: updatedUser });
        	console.log("USER DESDE EL FLUX", updatedUser);
			localStorage.setItem('user', JSON.stringify(updatedUser))
			},

			updateUser: (useredit)=> {
			const {user} = getStore()
			const updatedUser = { ...user, ...useredit };
			setStore({ user: updatedUser });
			localStorage.setItem('user', JSON.stringify(updatedUser))

			}
		}
	};
};

export default getState;
