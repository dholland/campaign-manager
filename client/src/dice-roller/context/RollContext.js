import React, { useState } from "react";
import RollSettings from "../RollSettings";

const RollContext = React.createContext();
export default RollContext;

export function RollProvider(props) {
	const [d20, setD20] = useState(new RollSettings(20));
	const [d4, setD4] = useState(new RollSettings(4));
	const [d6, setD6] = useState(new RollSettings(6));
	const [d8, setD8] = useState(new RollSettings(8));
	const [d10, setD10] = useState(new RollSettings(10));
	const [d12, setD12] = useState(new RollSettings(12));
	const [d100, setD100] = useState(new RollSettings(100));
	const [history, setHistory] = useState([]);
	
	const dieMap = new Map([
		[20, setD20],
		[4, setD4],
		[6, setD6],
		[8, setD8],
		[10, setD10],
		[12, setD12],
		[100, setD100]
	]);
	
	const roll = (die, settings) => {
		dieMap.get(die)(prevSettings => {
			for (let prop in settings) {
				prevSettings.setProp(prop, settings[prop]);
			}
			let rolled = prevSettings.roll();
			setHistory(prevHistory => {
				const h = [rolled, ...prevHistory];
				if (h.length > 10) {
					h.pop();
				}
				return h;
			});
			return rolled;
		});
	};
	
	const changeSettings = (die, prop, value) => {
		dieMap.get(die)(prevSettings => prevSettings.setProp(prop, value));
	};
	
	const addFeature = (die, feature) => {
		dieMap.get(die)(prevSettings => prevSettings.addFeature(feature));
	};
	
	const removeFeature = (die, featureId) => {
		dieMap.get(die)(prevSettings => prevSettings.removeFeature(featureId));
	};
	
	const enableFeature = (die, featureId) => {
		dieMap.get(die)(prevSettings => prevSettings.EnableFeature(featureId));
	};
	
	const disableFeature = (die, featureId) => {
		dieMap.get(die)(prevSettings => prevSettings.disableFeature(featureId));
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