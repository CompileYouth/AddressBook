import Dialog from "./Dialog.js";

export default class SettingDialog extends Dialog {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
	}

	handleAddressBook() {
		console.log( "handle address book" );

		var $ab = $( this.$element.find( "ul .setting-list-ab" ) );
		$ab.toggleClass( "active" );
		
	}

	handlePersonalInfo() {
		console.log( "handle personal info" );

		var $pi = $( this.$element.find( "ul .setting-list-pi" ) );

	}

	handleClock() {
		console.log( "handle clock" );

		var $cl = $( this.$element.find( "ul .setting-list-cl" ) );
	}

	render() {
		return (
			<div id="ab-dialog-setting">
				<header className="ab-dialog-setting-header">设置</header>
				<ul className="ab-dialog-setting-list">
					<li>显示通讯录 <span className="setting-button setting-list-ab active" onClick={ this.handleAddressBook.bind( this ) }><span className="button-circle"></span></span></li>
					<li>显示个人信息 <span className="setting-button setting-list-pi active" onClick={ this.handlePersonalInfo.bind( this ) }><span className="button-circle"></span></span></li>
					<li>显示时钟 <span className="setting-button setting-list-cl" onClick={ this.handleClock.bind( this ) }><span className="button-circle"></span></span></li>
				</ul>
			</div>
		);
	}
}