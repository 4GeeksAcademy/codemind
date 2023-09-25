const getState = ({ getStore, getActions, setStore }) => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	return {
		store: {
			message: null,
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
			addUser:  async (newUser) => {
			// const {user} = getStore()
			// const updatedUser = { ...user, ...newUser };
			// setStore({ user: updatedUser });
        	// console.log("USER DESDE EL FLUX", updatedUser);
			// localStorage.setItem('user', JSON.stringify(updatedUser))
			const url = process.env.BACKEND_URL + '/api/user'
			const options = {
				method:  'POST',
				body: JSON.stringify(newUser),
				headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
			}
			try {
				const resp = await fetch(url, options)
				if(resp.ok){
					console.log('La solicitud se realizó con éxito');
				}else {
					console.error('La solicitud no se realizó con éxito');
			 }
			} catch (error) {
				console.error(error)
			}
			},
		
			loginUser: async (userCredentials) => {
                let { user } = getStore();
                console.log("loginUser called");
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

                        // Guardar el token en localStorage
                        localStorage.setItem('userToken', data.token);

                        // Actualizar store.user con los datos del usuario
                        setStore({ user: { ...user, ...data } });

                        // Obtener los datos completos del usuario
                        getActions().getUser();
                    } else {
                        console.log('La solicitud no se realizó con éxito');
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            getUser: async () => {
                let { user } = getStore();
                console.log("GET USER called");
                const url = process.env.BACKEND_URL + '/api/' + user.userid;
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    }
                };
                try {
                    const resp = await fetch(url, options);
                    if (resp.ok) {
                        const data = await resp.json();
                        console.log('La solicitud se realizó con éxito');

                        // Actualizar store.user con los nuevos datos del usuario
                        setStore({ user: { ...user, ...data } });
                        console.log("user getUSER", user);
                    } else {
                        console.log('La solicitud no se realizó con éxito');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
};
export default getState;
