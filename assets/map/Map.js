export default class Map extends React.Component {
	constructor( props ) {
		super( props );
		console.log( "map" );
	}
	
	componentDidMount() {
		this._initCenter();
		this._initMap();

		/*var map = L.map('ab-map').setView([51.505, -0.09], 13);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker([51.5, -0.09]).addTo(map)
		    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		    .openPopup();*/
	}
	
	_initCenter() {
		if( navigator.geolocation ) {
			//Sometimes server cann't be reached.
			/*this.center = navigator.geolocation.getCurrentPosition( function( position ) {
				this.center = [ position.coords.latitude, position.coords.longtitude ];
			} );*/
			this.center = [ 31.978742599999997, 118.75626860000001 ];
		}
		else {
			this.center = [ 31.978742599999997, 118.75626860000001 ];
		}
	}
	
	_initMap() {
		this.map = L.map(React.findDOMNode(this), {
            zoomControl: false
        });
        this.map.setView( this.center, 14 );

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo( this.map );

		L.marker( this.center ).addTo( this.map )
		    .bindPopup( 'There am I.' )
		    .openPopup();
	}
	
	render() {
		return (
			<div id="ab-map" />
		);
	}
}