import React, { useContext, useRef, useState } from "react";
import RollContext from "../context/RollContext";

export default function DieRow({die, moveUp, moveDown}) {
	const { roll } = useContext(RollContext);
	const settings = useContext(RollContext)[`d${die}`];
	const [fields, setFields] = useState({
		dice: settings.dice,
		mod: settings.mod,
		type: settings.type
	});
	const rollBtn = useRef(null);
	
	const handleRoll = e => {
		e.preventDefault();
		rollBtn.current.focus();
		roll(die, fields);
	};
	
	/*
	const handleToggleFeature = (id, enable) => {
		if (enable) {
			enableFeature(die, id);
		} else {
			disableFeature(die, id);
		}
	};
	*/
	
	const handleChange = e => {
		const {name, value} = e.target;
		setFields(prevFields => ({...prevFields, [name]: value}));
	};
	
	return (
		<form className="die-row" role="row" onSubmit={handleRoll}>
			<div className="move" role="cell">
			{(moveUp) && <button type="button" onClick={() => moveUp(die)} title="Move up" aria-label={`Move the d${die} row up`}>&uarr;</button>}
				{(moveDown) && <button type="button" onClick={() => moveDown(die)} title="Move down" aria-label={`Move the d${die} row down`}>&darr;</button>}
			</div>
			<div className="die" role="rowheader">
				<h1>{`d${die}`}</h1>
			</div>
			<div className="dice" role="cell">
				<input type="number" name="dice" value={fields.dice} min={1} onChange={handleChange} readOnly={die === 20} aria-readonly={die === 20} required={die !== 20} />
			</div>
			<div className="mod" role="cell">
				<span>+ </span>
				<input type="number" name="mod" value={fields.mod} onChange={handleChange} />
			</div>
			<div className="features" role="cell">
			
			</div>
			<div className="roll" role="cell" role-description="roll type">
				<button type="submit" className="roll-button" ref={rollBtn}>Roll</button>
				{(die === 20) ? <div className="roll-type" role="radiogroup">
						<label>
							<input type="radio" name="type" value="normal" checked={fields.type === "normal"} onChange={handleChange} />
							Normal
						</label><br />
						<label>
							<input type="radio" name="type" value="adv" checked={fields.type === "adv"} onChange={handleChange} />
							Advantage
						</label>
						<label>
							<input type="radio" name="type" value="dis" checked={fields.type === "dis"} onChange={handleChange} />
							Disadvantage
						</label>
					</div>
					: (die !== 100) &&<label>
						<input type="checkbox" name="type" value="crit" checked={fields.type === "crit"} onChange={handleChange} />
						Critical Hit
					</label>
				}
			</div>
			<div className="result" role="cell">
				{(settings.result.total !== undefined) ? <>
						<h2>{`${settings.result.total}${(die === 100) ? `(${settings.result.percent})` : ""}`}</h2>
						<h3>{settings.result.resultString}</h3>
							{(["adv", "dis"].includes(fields.type) || settings.showindividualRolls) &&
								<ul className="individual-rolls">
								{settings.result.baseRolls.map((r, i) => <li key={`${r}-${i}`}>{r}</li>)}
								</ul>
							}
					</>
					: " - "
				}
			</div>
		</form>
	);
}