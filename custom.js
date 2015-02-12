var pos = L.GeoIP.getPosition();
var map = L.map('map').setView([0,0], 15);

// Add OSM layer
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);

// Center on our current location
L.GeoIP.centerMapOnPosition(map);

// Add/remove marker on click
marker = L.marker([0,0], {draggable: true});
map.on('click', function(e){
  marker.setLatLng(e.latlng).addTo(map);
  marker.bindPopup("" + e.latlng).openPopup();
});

marker.on('click', function(){
  map.removeLayer(marker);
});

// Add address search
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap(),
    position: 'topcenter',
    showMarker: true
}).addTo(map);
