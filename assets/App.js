import Map from "./map/Map.js";
import ClockPanel from "./panel/ClockPanel.js";
import ContactsPanelContainer from "./panel/ContactsPanelContainer.js";

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}
	
	render() {
		return (
			<div id="ab-app">
				<Map />
				<ClockPanel />
				<ContactsPanelContainer />
			</div>
		);
	}
}