import React, {useState} from "react";
import "./SRContext.css";

const SRContext = React.createContext();
export default SRContext;

export function SRProvider(props) {
	const [msg, setMsg] = useState("");
	
	const rollMsg = result => {
		setMsg(`${result.total}, ${result.resultString}`);
	};
	
	const value = { rollMsg };
	return (
		<SRContext.Provider value={value}>
			{props.children}
			<SRLog msg={msg} />
		</SRContext.Provider>
	);
}

const SRLog = React.memo(({msg}) => {
	return (
		<div id="sr-log" role="log" aria-live="polite" aria-atomic={true} aria-relevant="text">
			{msg}
		</div>
	);
});