var mapboxgl;
window.onload = function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmluYXRoOTMiLCJhIjoiY2l1Z3hrNHdwMDA1dTJvdXZ3cHU1MXRtZCJ9.3Fvz0hxUYSPlii4gZ_LkiA";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9"
  });

  //Adding navigation control(zoom in, out, rotate)
  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  map.on("click", function(e) {
    alert(e.lngLat);
    // this.addMarker(e.lngLat);
    addMarker(e);
  });

  function addMarker(e) {
    var marker = new mapboxgl.Marker()
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);
  }
};

// function addMarker(lngLat) {

// }
