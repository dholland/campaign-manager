import React, { createContext, useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

export default function Modal({children, onModalClose}) {
	useEffect(() => {
		function keyListener(e) {
				const listener = keyListenersMap.get(e.keyCode);
				return listener && listener(e);
		}
		document.addEventListener("keydown", keyListener);
		return () => document.removeEventListener("keydown", keyListener);
		// eslint-disable-next-line
	}, []);
	
	const modalRef = useRef(null);
	const handleTabKey = e => {
		const focusable = modalRef.current.querySelectorAll(
		"a, button, textarea, input, select"
		);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		
		if (!e.shiftKey && document.activeElement === last) {
			first.focus();
			return e.preventDefault();
		}
		if (e.shiftKey && document.activeElement === first) {
			last.focus();
			return e.preventDefault();
		}
	};
	
	const keyListenersMap = new Map([
		[27, onModalClose],
		[9, handleTabKey]
	]);
	
	return createPortal(
		<div className="overlay" role="dialog" aria-modal="true">
			<div className="modal-content" ref={modalRef}>
				<ModalContext.Provider value={{onModalClose}}>
					{children}
				</ModalContext.Provider>
			</div>
		</div>,
		document.body
	);
}

Modal.Header = function ModalHeader(props) {
	const {onModalClose} = useContext(ModalContext);
	
	return (
		<div className="modal-header">
			{props.children}
			<button className="modal-z-button" onClick={onModalClose} title="Close">
				X
			</button>
		</div>
	);
}

Modal.Body = function ModalBody(props) {
	return (
		<div className="modal-body">
			{props.children}
		</div>
	);
}

Modal.Footer = function ModalFooter(props) {
	return (
		<div className="modal-footer">{props.children}</div>
	);
}

Modal.Footer.CloseBtn = function CloseBtn(props) {
	const {onModalClose} = useContext(ModalContext);
	
	return (
		<button className="close-button" {...props} onClick={onModalClose} title="Close" />
	);
}