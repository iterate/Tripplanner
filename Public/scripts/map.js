var mapboxgl;
var map;

window.onload = function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ";

  initMap();
};

function initMap() {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9"
  });

  //Adding navigation control(zoom in, out, rotate)
  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })
  );

  addMapClickListeners();
}

function addMapClickListeners() {
  map.on("click", function(e) {
    addMarker(e.lngLat.lat, e.lngLat.lng);
  });
}

function addMarker(lat, lng) {
  var marker = new mapboxgl.Marker();
  marker.setLngLat([lng, lat]).addTo(map);
}
