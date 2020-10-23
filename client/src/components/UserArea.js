import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function UserArea() {
	const { user } = useContext(UserContext);
	
	return (
		<div id="user-area" role="region" role-description="user area">
			Hi, {user.displayName || user.username}
		</div>
	);
}