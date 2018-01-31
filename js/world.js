var map = L.map('map', {worldCopyJump: true});
// Add OSM layer
var OpenStreetMap_Mapnik = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);
map.setView([0,0], 3);

function loadJSON(path){
  var obj = new XMLHttpRequest();
  obj.onreadystatechange = function(){
    if (obj.readyState === XMLHttpRequest.DONE){
      if (obj.status === 200){
        load_locations(JSON.parse(obj.responseText));
      } else {
        console.error("There was an error loading locations");
        console.error(obj);
      }
    }
  };

  obj.open("GET", path, true);
  obj.send();
}

function load_locations(data){
  data.forEach( function(city){
    var marker = L.marker([city.lat, city.lng]).addTo(map);
    var html = "<strong>" + city.name + "</strong>";
    marker.bindPopup(html);
  });
}

loadJSON('js/world.json');
