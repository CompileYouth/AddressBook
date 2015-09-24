import ClockPanel from "./panel/ClockPanel.js";

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<ClockPanel />
		);
	}
}