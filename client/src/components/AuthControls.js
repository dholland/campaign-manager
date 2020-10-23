import React, { useContext, useEffect, useRef } from "react";
import UserContext from "../context/UserContext";
import ModalDisplayContext from "../context/ModalDisplayContext";
import AuthForm from "./AuthForm";

export default function AuthControls() {
	const { token, logout } = useContext(UserContext);
	const { openModal, closeModal } = useContext(ModalDisplayContext);
	const btn = useRef(null);
	
	useEffect(() => {
		if (token) {
			closeModal();
		} // eslint-disable-next-line
	}, [token]);
	
	const handleModalOpen = e => {
		btn.current = e.target;
		const create = e.target.name === "signup";
		const header = <h1>{(create) ? "Create an Account" : "Login to Your Account"}</h1>;
		const body = <AuthForm create={create} />;
		const footer = null;
		const close = () => {
			btn.current.focus();
		};
		
		openModal(header, body, footer, close);
	};
	
	return (
		<div id="auth-buttons">
		{(token) ? <button onClick={logout} ref={btn}>Sign Out</button>
			: <>
				<button name="login" onClick={handleModalOpen}>Login</button>
				<button name="signup" onClick={handleModalOpen}>Register</button>
			</>
		}
		</div>
	);
}


