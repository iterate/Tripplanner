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

  addMapClickListeners();
  addGeocoder();
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

function addGeocoder() {
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(geocoder);

  // After the map style has loaded on the page, add a source layer and default
  // styling for a single point.
  map.on("load", function() {
    // Listen for the `geocoder.input` event that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on("result", function(ev) {
      debugger;
      addMarker(
        ev.result.geometry.coordinates[1],
        ev.result.geometry.coordinates[0]
      );
    });
  });
}
