import React, { useState } from "react";
import Modal from "../components/Modal";

const ModalDisplayContext = React.createContext();
export default ModalDisplayContext;

export function ModalProvider(props) {
	const initState = {
		show: false,
		Header: null,
		Body: null,
		Footer: null,
		close: null
	};
	const [ModalState, setModalState] = useState(initState);
	
	const handleModalClose = () => {
		if (ModalState.close) {
			ModalState.close();
		}
		setModalState(initState);
	};
	
	const handleModalOpen = (h, b, f, c) => {
		setModalState({
			show: true,
			Header: h,
			Body: b,
			Footer: f || null,
			close: c || null
		});
	};
	
	const value = { openModal: handleModalOpen, closeModal: handleModalClose };
	return (
		<ModalDisplayContext.Provider value={value}>
			{props.children}
				{(ModalState.show) && <Modal onModalClose={handleModalClose}>
						<Modal.Header>{ModalState.Header}</Modal.Header>
				<Modal.Body>{ModalState.Body}</Modal.Body>
				<Modal.Footer>
				{ModalState.Footer}
				<Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
				</Modal.Footer>
					</Modal>
				}
		</ModalDisplayContext.Provider>
	);
}