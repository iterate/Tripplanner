var mapboxgl;
var map;
var markers = [];

window.onload = function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2pqaWlscDRsM3Q2aDNrcGxsaHQ1dG02NCJ9.7hwR--67HQrjo9MDxJ8HJQ";

  initMap();
};

function initMap() {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v9"
  });

  //Adding navigation control(zoom in, out, rotate)
  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  addMapClickListeners();
  addGeocoder();
}

function addMapClickListeners() {
  map.on("click", function(e) {
    var marker = addMarker(e.lngLat.lat, e.lngLat.lng);

    var popup = addPopup(e.lngLat);
    marker.setPopup(popup, "Hallo, du er kul");
  });
}

function addMarker(lat, lng) {
  var marker = new mapboxgl.Marker();
  marker.setLngLat([lng, lat]).addTo(map);
  markers.push(marker);

  marker.on("click", function(e) {
    console.log("Du har klikket...");
    console.log(e);
  });
  return marker;
}

function markerClick(e) {
  console.log("Du har klikket...");
  console.log(e);
}

function addPopup(lngLat, popupTxt) {
  var markerHeight = 50,
    markerRadius = 10,
    linearOffset = 25;
  var popupOffsets = {
    top: [0, 0],
    "top-left": [0, 0],
    "top-right": [0, 0],
    bottom: [0, -markerHeight],
    "bottom-left": [
      linearOffset,
      (markerHeight - markerRadius + linearOffset) * -1
    ],
    "bottom-right": [
      -linearOffset,
      (markerHeight - markerRadius + linearOffset) * -1
    ],
    left: [markerRadius, (markerHeight - markerRadius) * -1],
    right: [-markerRadius, (markerHeight - markerRadius) * -1]
  };
  var popup = new mapboxgl.Popup({
    offset: popupOffsets,
    className: "my-class"
  })
    .setLngLat(lngLat)
    .setHTML("<h3>Jeg er en popup</h3>")
    .addTo(map);
  return popup;
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
      addMarker(
        ev.result.geometry.coordinates[1],
        ev.result.geometry.coordinates[0]
      );
    });
  });
}
