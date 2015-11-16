export default class Map extends React.Component {
	constructor( props ) {
		super( props );
		console.log( "map" );
	}
	
	componentDidMount() {
		this._initCenter();
		this._initMap();
		this.test();
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

		//console.log( this.map.getZoom(), this.map.getBounds());

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

		/*this.marker = L.marker( this.center ).addTo( this.map )
					    .bindPopup( 'There am I.' )
					    .openPopup();*/
	}

	test() {
		/*var start = L.latLng( 31.978742599999997,  118.75626860000001 );
		var end = L.latLng( 31.998742599999997,  118.78626860000001 );*/

		/*var polyline = L.polyline(
						[start, end] , 
						{
							//color: 'red'//,
							gradient: {
						        vector: [['0%', '50%'], ['100%', '50%']],
						        stops: [{
						            offset: '0%',
						            style: {
						                color: '#ffffff',
						                opacity: 1
						            }
						        }, {
						            offset: '50%',
						            style: {
						                color: '#ff0000',
						                opacity: 1
						            }
						        }]
						    }
						}
						).addTo(this.map);*/

		//this.map.fitBounds(polyline.getBounds());
		/*var arcline = L.Polyline.Arc([31.978742599999997, 118.75626860000001], [39.998742599999997, 128.72626860000001], {
			vertices: 20,
			offset: 0.001
		}).addTo(this.map);*/

		//console.log( arcline.getLatLngs());

		/*var polyline = L.Polyline.Arc([31.978742599999997, 118.75626860000001], [31.998742599999997, 118.78626860000001], {
		    color: "red",
		    vertices: 1000,
		    offset: 10,
		    weight: 5
		}).addTo(this.map);*/

		/*var polyline = L.Polyline.Arc([31.978742599999997, 118.75626860000001], [31.998742599999997, 118.78626860000001], {
			vertices: 200
		}).addTo(this.map);

		//this.map.fitBounds(polyline.getBounds());

		L.Polyline.Arc([31.978742599999997, 118.75626860000001], [67.50000, 170.03333], {
		    color: "red",
		    vertices: 2000
		}).addTo(this.map);*/

			/*var pathOne = L.curve(['M',[31.978742599999997, 118.75626860000001],'T',[31.988742599999997, 118.76626860000001],
						   'T',[31.998742599999997, 118.78626860000001]]).addTo(this.map);*/


		var polyline = L.curve(['M',[31.978742599999997, 118.75626860000001],'T',[31.988742599999997, 118.74626860000001],
					   'T',[31.998742599999997, 118.72626860000001]],
					   {
					   	weight: 5,
					   	fill:false,
					   	opacity: 1,
					   	stroke: "url(#gradient)"
					   }
					   ).addTo(this.map);

		//$( polyline._path ).addClass( "ab-path" );

		$( "svg" ).append( '<defs><linearGradient id="gradient"><stop offset="20%" stop-color="#39F" /><stop offset="90%" stop-color="#F3F" /></linearGradient></defs>' );

		//console.log(polyline);
	}
	
	render() {
		return (
			<div id="ab-map" />
		);
	}


}