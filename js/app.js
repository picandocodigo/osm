var map = L.map('map');

// Add OSM layer
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);

//Hack for Geolocation in Firefox
// https://github.com/Leaflet/Leaflet/issues/1070
var isFirefox = typeof InstallTrigger !== 'undefined';
var loadedLocation = false;

if( isFirefox ){
  navigator.geolocation.getCurrentPosition(firefox_success, firefox_error);
  setTimeout(function(){
    if( !loadedLocation ){
      use_geoip_plugin();
    }
  }, 3000);
} else {
  // Center on current location
  map.locate({setView: true});

  //If we can't find our current location, try the plugin:
  map.on('locationerror', function(){
    use_geoip_plugin();
  });
}

function firefox_success(position){
  loadedLocation = true;
  map.setView(
    [position.coords.latitude, position.coords.longitude],
    15
  );
}

function firefox_error(error){
  use_geoip_plugin();
}

function use_geoip_plugin(){
  console.log("Location not found, trying GeoIP");
  L.GeoIP.centerMapOnPosition(map, 15);
}

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
