import React, { useContext } from "react";
import SettingsContext from "../../context/SettingsContext";
import DieRow from "./DieRow";
import "./DiceRoller.css";

export default function DiceRoller() {
	const { rows, moveRowUp, moveRowDown } = useContext(SettingsContext);
	
	return (
		<div id="dice-roller" role="table">
			<div className="header-row" role="row">
				<div className="move" role="columnheader"></div>
				<div className="die" role="columnheader">Die</div>
				<div className="dice" role="columnheader">Number of Dice</div>
				<div className="mod" role="columnheader">Modifier</div>
				<div className="features" role="columnheader">Roll Features</div>
				<div className="roll" role="columnheader">Roll</div>
				<div className="result" role="columnheader">Result</div>
			</div>
			{rows.map((die, index) => (
				<DieRow key={die} die={die} moveUp={(index > 0) && moveRowUp} moveDown={(index < rows.length - 1) && moveRowDown} />)
			)}
		</div>
	);
}