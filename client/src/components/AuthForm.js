import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";

export default function AuthForm({create}) {
	const { signup, login, authError, clearAuthError } = useContext(UserContext);
	const [fields, setFields] = useState({
		username: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState(null);
	const auto = useRef(null);
	const submitBtn = useRef(null);
	
	useEffect(() => {
		auto.current.focus();
		// eslint-disable-next-line
	}, []);
	
	useEffect(() => {
		if (authError) {
			submitBtn.current.removeAttribute("disabled");
		} // eslint-disable-next-line
	}, [authError]);
	
	const handleChange = e => {
		const {name, value} = e.target;
		setFields(prevFields => ({...prevFields, [name] : value}));
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		if (authError) {
			clearAuthError();
		}
		if (error) {
			setError(null);
		}
		submitBtn.current.setAttribute("disabled", true);
		submitBtn.current.focus();
		if (create && fields.password !== fields.confirmPassword) {
			setError("Passwords must match.");
			submitBtn.current.removeAttribute("disabled");
			return;
		}
		
		const creds = {...fields};
		delete creds.confirmPassword;
		
		if (create) {
			signup(creds);
		} else {
			login(creds);
		}
	};
	
	return (
		<form id="auth-form" onSubmit={handleSubmit}>
			<p className="error" role="log" aria-live="polite" aria-atomic={true} aria-relevant="text">{error || ""}</p>
			<p className="error" role="log" aria-live="polite" aria-atomic={true} aria-relevant="text">{authError || ""}</p>
			<label>
				<strong>Username: </strong>
				<input type="text" name="username" value={fields.username} onChange={handleChange} ref={auto} required />
			</label>
			<label>
				<strong>Password: </strong>
				<input type="password" name="password" value={fields.password} onChange={handleChange} required />
			</label>
			{(create) && <label>
					<strong>Retype Password: </strong>
					<input type="password" name="confirmPassword" value={fields.confirmPassword} onChange={handleChange} required />
				</label>
			}
			<button ref={submitBtn}>{(create) ? "Create Account" : "Login"}</button>
		</form>
	);
	
}