import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { SettingsProvider } from "./context/SettingsContext";
import "./index.css";

ReactDom.render(
	<Router>
		<UserProvider>
			<SettingsProvider>
				<App />
			</SettingsProvider>
		</UserProvider>
	</Router>,
	document.getElementById("root")
);