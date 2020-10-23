import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const SettingsContext = React.createContext();
export default SettingsContext;

export function SettingsProvider(props) {
	const { user } = useContext(UserContext);
	const [rows, setRows] = useState(initRows());
	const [hiddenRows, setHiddenRows] = useState(initHidden());
	
	useEffect(() => {
		if (user.settings) {
			setRows(user.settings.rows);
			setHiddenRows(user.settings.hiddenRows);
		} else {
			setRows(initRows());
			setHiddenRows(initHidden());
		} // eslint-disable-next-line
	}, [user.settings]);
	
	useEffect(() => {
		localStorage.setItem("rows", JSON.stringify(rows));
	}, [rows]);
	
	useEffect(() => {
		localStorage.setItem("hiddenRows", JSON.stringify(hiddenRows));
	}, [hiddenRows]);
	
	const moveRowUp = row => {
		const copy = [...rows];
		const index = copy.indexOf(row);
		const newIndex = index - 1;
		const temp = copy[index];
		copy[index] = copy[newIndex];
		copy[newIndex] = temp;
		setRows(copy);
	};
	
	const moveRowDown = row => {
		const copy = [...rows];
		const index = copy.indexOf(row);
		const newIndex = index + 1;
		const temp = copy[index];
		copy[index] = copy[newIndex];
		copy[newIndex] = temp;
		setRows(copy);
	};
	
	const hideRow = row => {
		setRows(prevRows => prevRows.filter(r => r !== row));
		setHiddenRows(prevRows => [...prevRows, row]);
	};
	
	const showRow = row => {
		setHiddenRows(prevRows => prevRows.filter(r => r !== row));
		setRows(prevRows => [...prevRows, row]);
	};
	
	const value = { rows, hiddenRows, moveRowUp, moveRowDown, hideRow, showRow };
	return (
		<SettingsContext.Provider value={value}>
			{props.children}
		</SettingsContext.Provider>
	);
}

const defaults = {
	rows: [20, 4, 6, 8, 10, 12, 100]
};

const initRows = () => JSON.parse(localStorage.getItem("rows") || "null") || defaults.rows;
const initHidden = () => JSON.parse(localStorage.getItem("hiddenRows") || "null") || [];