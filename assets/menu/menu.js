export default class Menu extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );

		this.$setting = this.$element.find( ".setting" );
		this.$locating = this.$element.find( ".locating" );
		this.$searching = this.$element.find( ".searching" );

		this.$setting.append( "<span class='fa fa-cog'></sapn>" );
		this.$locating.append( "<span class='fa fa-location-arrow'></span>" );
		this.$searching.append( "<span class='fa fa-search'></span>" );
	}

	handleSettingClick() {
		this.props.onSettingClick();
	}

	handleLocatingClick() {
		this.props.onLocatingClick();
	}

	handleSearchingClick() {
		this.props.onSearchingClick();
	}

	render() {
		return (
			<div id="ab-menu">
				<div className="setting" onClick={this.handleSettingClick.bind( this )}></div>
				<div className="locating" onClick={this.handleLocatingClick.bind( this )}></div>
				<div className="searching" onClick={this.handleSearchingClick.bind( this )}></div>
			</div>
		);
	}
}