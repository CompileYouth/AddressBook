//import MetroLineLayer from "./layer/MetroLineLayer.js";

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = (function (_React$Component) {
	_inherits(Map, _React$Component);

	function Map(props) {
		_classCallCheck(this, Map);

		_get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
		console.log("map");
	}

	_createClass(Map, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._initCenter();
			//this._initLayerGroup();
			this._initMap();
			//this._initLayers();
		}
	}, {
		key: 'locateContact',
		value: function locateContact(contact) {
			var self = this;
			var center = [contact.location.lat, contact.location.lng];
			this.setCenter(center);
			this.setMarker(center);

			setTimeout(function () {
				if (self.map.getZoom() !== 14) {
					self.map.setZoom(14, {
						animate: true
					});
				}
			}, 350);
		}
	}, {
		key: 'locateMe',
		value: function locateMe(location) {
			var self = this;
			var center = [location.lat, location.lng];

			//console.log( this.map.getZoom(), this.map.getBounds());

			//this.map.setZoom( 14 );
			this.setCenter(center);
			this.setMarker(center);

			setTimeout(function () {
				if (self.map.getZoom() !== 14) {
					self.map.setZoom(14, {
						animate: true
					});
				}
			}, 350);
		}
	}, {
		key: 'setCenter',
		value: function setCenter(center) {
			this.map.panTo(center, {
				duration: 0.25,
				animate: true
			});
		}
	}, {
		key: 'setMarker',
		value: function setMarker(marker) {
			this.marker.setLatLng(marker);
			this.marker.closePopup();
		}
	}, {
		key: 'setPopup',
		value: function setPopup(contact) {
			if (contact) {} else {
				//user himself/herself

			}
		}
	}, {
		key: '_initCenter',
		value: function _initCenter() {
			if (navigator.geolocation) {
				//Sometimes server cann't be reached.
				/*this.center = navigator.geolocation.getCurrentPosition( function( position ) {
    	this.center = [ position.coords.latitude, position.coords.longtitude ];
    } );*/
				this.center = [31.978742599999997, 118.75626860000001];
			} else {
				this.center = [31.978742599999997, 118.75626860000001];
			}
		}
	}, {
		key: '_initMap',
		value: function _initMap() {
			this.map = L.map(React.findDOMNode(this), {
				zoomControl: false
			});
			this.map.setView(this.center, 14);

			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.map);

			this.marker = L.marker(this.center).addTo(this.map).bindPopup('There am I.').openPopup();

			//this.layerGroup.addTo(this.map);
		}
	}, {
		key: '_initLayerGroup',
		value: function _initLayerGroup() {
			this.layerGroup = L.layerGroup();
		}
	}, {
		key: '_initLayers',
		value: function _initLayers() {
			var _this = this;

			$.ajax({
				url: "assets/data/metroline-nanjing.json"
			}).done(function (data) {
				var line1_stations = data["1"];
				var latlngs = [];
				line1_stations.forEach(function (singleStation) {
					latlngs.push(L.latLng(singleStation.lat, singleStation.lng));
				});

				L.polyline(latlngs, { color: 'red' }).addTo(_this.layerGroup);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('div', { id: 'ab-map' });
		}
	}]);

	return Map;
})(React.Component);

exports['default'] = Map;
module.exports = exports['default'];