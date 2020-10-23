import React, { useContext, useState } from "react";
import SRContext from "../../context/SRContext";
import RollSettings from "../RollSettings";

const RollContext = React.createContext();
export default RollContext;

export function RollProvider(props) {
	const { rollMsg } = useContext(SRContext);
	const [d20, setD20] = useState(new RollSettings(20));
	const [d4, setD4] = useState(new RollSettings(4));
	const [d6, setD6] = useState(new RollSettings(6));
	const [d8, setD8] = useState(new RollSettings(8));
	const [d10, setD10] = useState(new RollSettings(10));
	const [d12, setD12] = useState(new RollSettings(12));
	const [d100, setD100] = useState(new RollSettings(100));
	const [history, setHistory] = useState([]);
	
	const dieMap = new Map([
		[20, [d20, setD20]],
		[4, [d4, setD4]],
		[6, [d6, setD6]],
		[8, [d8, setD8]],
		[10, [d10, setD10]],
		[12, [d12, setD12]],
		[100, [d100, setD100]]
	]);
	
	const roll = (die, settings) => {
		const r = dieMap.get(die)[0];
		for (let prop in settings) {
			r.setProp(prop, settings[prop]);
		}
		const rolled = r.roll();
		rollMsg(rolled.result);
		setHistory(prevHistory => {
			const updated = [rolled, ...prevHistory];
			if (updated.length > 10) {
				updated.pop();
			}
			return updated;
		});
		dieMap.get(die)[1](rolled);
	};
	
	const changeSettings = (die, prop, value) => {
		dieMap.get(die)[1](prevSettings => prevSettings.setProp(prop, value));
	};
	
	const addFeature = (die, feature) => {
		dieMap.get(die)[1](prevSettings => prevSettings.addFeature(feature));
	};
	
	const removeFeature = (die, featureId) => {
		dieMap.get(die)[1](prevSettings => prevSettings.removeFeature(featureId));
	};
	
	const enableFeature = (die, featureId) => {
		dieMap.get(die)[1](prevSettings => prevSettings.EnableFeature(featureId));
	};
	
	const disableFeature = (die, featureId) => {
		dieMap.get(die)[1](prevSettings => prevSettings.disableFeature(featureId));
	};
	
	const value = {d20, d4, d6, d8, d10, d12, d100, history,
		roll, changeSettings, addFeature, removeFeature, enableFeature, disableFeature
	};
	return (
		<RollContext.Provider value={value}>
			{props.children}
		</RollContext.Provider>
	);
}