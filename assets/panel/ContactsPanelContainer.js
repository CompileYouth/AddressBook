import ContactsListPanel from "./ContactsListPanel.js";
import ContactsCollectionPanel from "./ContactsCollectionPanel.js";

export default class ContactsPanelContainer extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div id="ab-contacts">
				<ContactsListPanel />
				<ContactsCollectionPanel />
			</div>
		);
	}
}