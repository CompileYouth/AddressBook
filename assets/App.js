import Map from "./map/Map.js";
import ClockPanel from "./panel/ClockPanel.js";
import ContactsPanel from "./panel/ContactsPanel.js";

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}
	
	render() {
		return (
			<div id="ab-app">
				<Map />
				<ClockPanel />
				<ContactsPanel />
			</div>
		);
	}
}