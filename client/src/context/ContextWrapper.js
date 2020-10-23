import React from "react";
import { SRProvider } from "./SRContext";
import { UserProvider } from "./UserContext";
import { SettingsProvider } from "./SettingsContext";
import { ModalProvider } from "./ModalDisplayContext";

export default function ContextWrapper(props) {
	return (
		<SRProvider>
			<UserProvider>
				<SettingsProvider>
					<ModalProvider>
						{props.children}
					</ModalProvider>
				</SettingsProvider>
			</UserProvider>
		</SRProvider>
	);
}