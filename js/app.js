var map = L.map('map');

// Add OSM layer
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);

//Check if the lat and lng parameters are set:
params = location.search.substring(1);
if( params.length > 0 && params.indexOf("lat") > -1 ){
  marker_from_url(params);
} else {
  center_map_on_location();
}

var loadedLocation = false;
function center_map_on_location(){
  //Hack for Geolocation in Firefox
  // https://github.com/Leaflet/Leaflet/issues/1070
  var isFirefox = typeof InstallTrigger !== 'undefined';

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
  html = map_sharing_link(e.latlng);
  marker.bindPopup(html).openPopup();
});

function map_sharing_link(latlng){
  var re = /LatLng\((-?[0-9\.]+),\s(-?[0-9\.]+)\)/;
  var coords = re.exec(latlng);
  var lat = coords[1];
  var long = coords[2];
  var page_url =  window.location.protocol + "//" + window.location.host + window.location.pathname;
  var link = page_url + "?lat=" + lat + "&lng=" + long;
  var html = "<a href=" + link + ">URL para compartir</a>";
  return html;
}

function marker_from_url(params){
  var myIcon = L.icon({
    iconUrl: './js/images/marker-icon-green.png',
    iconRetinaUrl: './js/images/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [25, 41],
    popupAnchor: [-3, -76],
    shadowUrl: './js/images/marker-shadow.png',
  });
  lat = /lat=(-?[0-9\.]+)/.exec(params)[1];
  long = /lng=(-?[0-9\.]+)/.exec(params)[1];
  map.setView([lat,long], 15);
  marker = L.marker([lat, long], {icon: myIcon}).addTo(map);
}

marker.on('click', function(){
  map.removeLayer(marker);
});

// Add address search
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap(),
    position: 'topcenter',
    showMarker: true
}).addTo(map);

// Add me to map
var fernando = L.icon({
  iconUrl: './js/images/fernando.png',
  iconRetinaUrl: './js/images/marker-icon-2x-green.png',
  iconSize: [22, 32],
  iconAnchor: [22, 32],
  popupAnchor: [-16, -38],
  shadowUrl: './js/images/marker-shadow.png',
});
var options =  {icon: fernando, title: "Fernando"};
var me = L.marker([-34.90209, -56.17731], options).addTo(map);
me.bindPopup("Tomando una Stout");
