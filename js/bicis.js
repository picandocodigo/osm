var map = L.map('map');


var OpenStreetMap_Mapnik = L.tileLayer('//{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);

// -34.9149&lng=-56.16202
map.setView([-34.9159, -56.16202], 15);
