import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";
import "./index.css";

ReactDom.render(
	<Router>
		<ContextWrapper>
			<App />
		</ContextWrapper>
	</Router>,
	document.getElementById("root")
);