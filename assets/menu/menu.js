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
		var self = this;
		$.ajax( {
			url: "http://api.map.baidu.com/location/ip?ak=LzXiINHYy8jTOEmgriTG1GEn&coor=bd09ll",
			dataType: "jsonp",
			success: function( data ) {
				//var location = data.content.point;
				//var lat = location.y;
				//var lng = location.x;
				/*self.props.onLocatingClick( {
					lng: lng,
					lat: lat
				} );*/
				self.props.onLocatingClick( {
					lng: 118.75626860000001,
					lat: 31.978742599999997
				} );
			},
			error: function( msg ) {
				self.props.onLocatingClick( {
					lng: 118.77807441,
					lat: 32.05723550
				} );
			}
		} );

		
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