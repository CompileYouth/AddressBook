export default class Map extends React.Component {
	constructor( props ) {
		super( props );
		console.log( "map" );
	}
	
	componentDidMount() {
		this._initCenter();
		this._initMap();
	}

	locateContact( contact ) {
		var self = this;
		var center = [ contact.location.lat, contact.location.lng ];
		this.setCenter( center );
		this.setMarker( center );

		setTimeout( function() {
			if( self.map.getZoom() !== 14 ) {
				self.map.setZoom( 14, {
					animate: true
				} );
			}
		}, 350 );
	}

	locateMe( location ) {
		var self = this;
		var center = [ location.lat, location.lng ];

		console.log( this.map.getZoom(), this.map.getBounds());

		//this.map.setZoom( 14 );
		this.setCenter( center );
		this.setMarker( center );

		setTimeout( function() {
			if( self.map.getZoom() !== 14 ) {
				self.map.setZoom( 14, {
					animate: true
				} );
			}
		}, 350 );

		
	}

	setCenter( center ) {
		this.map.panTo( center, {
			duration: 0.25,
			animate: true
		} );
	}

	setMarker( marker ) {
		this.marker.setLatLng( marker );
        this.marker.closePopup();
	}

	setPopup( contact ) {
		if( contact ) {

		}
		else {
			//user himself/herself

		}
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

		this.marker = L.marker( this.center ).addTo( this.map )
					    .bindPopup( 'There am I.' )
					    .openPopup();
	}
	
	render() {
		return (
			<div id="ab-map" />
		);
	}
}