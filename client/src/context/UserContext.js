import React, { useEffect, useState } from "react";
import axios from "axios";

const UserContext = React.createContext();
export default UserContext;

const initState = () => ({
	user: {},
	token: localStorage.getItem("token") || ""
});

const userAxios = axios.create();
let authInt;

export function UserProvider({children}) {
	const [auth, setAuth] = useState(initState());
	const [authError, setAuthError] = useState(null);
	
	useEffect(() => {
		if (auth.token) {
			userAxios.interceptors.request.eject(authInt);
			authInt = userAxios.interceptors.request.use(config => {
				config.headers.Authorization = `Bearer ${auth.token}`;
				return config;
			});
		} // eslint-disable-next-line
	}, [auth.token]);
	
	useEffect(() => {
		if (auth.token) {
			userAxios.get("/user").then(response => (
				setAuth(prevAuth => ({...prevAuth, user: response.data}))
			).catch(err => {
				console.dir(err);
				logout();
			});
		} // eslint-disable-next-line
	}, []);
	
	const signup = creds => {
		axios.post("/auth/signup", creds).then(response => {
			const { user, token } = response.data;
			setAuth({user, token});
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setAuthError(err.response.data.error);
			} else {
				console.dir(err);
			}
		});
	};
	
	const login = creds => {
		axios.post("/auth/signup", creds).then(response => {
			const { user, token } = response.data;
			setAuth({user, token});
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setAuthError(err.response.data.error);
			} else {
				console.dir(err);
			}
		});
	};
	
	const logout = () => {
		localStorage.removeItem("token");
		setAuth(initState());
	};
	
	const value = {...auth, signup, login, logout };
	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}