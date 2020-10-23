import React, { useContext } from "react";
import UserContext from "./context/UserContext";
import UserArea from "./components/UserArea";
import AuthControls from "./components/AuthControls";
import DiceRoller from "./dice-roller/DRPage";

export default function App() {
	const { token } = useContext(UserContext);
	
	return (
		<div id="app">
		{(token) && <UserArea />}
			<AuthControls />
			<DiceRoller />
		</div>
	);
}