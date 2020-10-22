import React from "react";
import { RollProvider } from "./context/RollContext";
import DiceRoller from "./components/DiceRoller";

export default function DRPage() {
	return (
		<RollProvider>
		<main id="dice-roller-page">
			<h1>Dice Roller</h1>
			<DiceRoller />
		</main>
		</RollProvider>
	);
}