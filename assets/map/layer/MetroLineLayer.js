export default class MetroLineLayer extends React.Component {
	constructor( props ) {
		super( props );
		console.log( "MetroLineLayer" );

		this._initLayerGroup();
		this._initMetroPoint();
	}

	componentDidMount() {
		
	}

	_initLayerGroup() {
		this.layerGroup = L.layerGroup();
	}

	_initMetroPoint() {
		$.ajax({
			url: "assets/data/metroline-nanjing.json"
		}).done( (data) => {
			console.log(data["1"]);
			const line1_stations = data["1"];
			console.log(this)
			line1_stations.forEach((singleStation) => {
				let point = L.point(singleStation.lat, singleStation.lng, true);
				this.layerGroup.addLayer(point);
			});
		});
	}

	render() {
		return (
			<div id="metro-line-layer" />
		);
	}
}