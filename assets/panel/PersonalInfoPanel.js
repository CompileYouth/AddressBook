export default class PersonalInfoPanel extends React.Component {

	constructor( props ) {
		super( props );
	}

	handleQuit() {
		console.log(" handle quit " );
	}

	render() {
		return (
			<div id="ab-personalInfo">
				<div className="info-avatar"></div>
				<div className="info-name">编译青春</div>
				<div className="info-quit" onClick={ this.handleQuit.bind( this ) }><span className="fa fa-power-off"></span></div>
			</div>
		);
	}
}