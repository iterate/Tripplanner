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
}

function addMapClickListeners() {
  map.on("click", function(e) {
    // alert(e.lngLat);
    // this.addMarker(e.lngLat);
    // addMarker(e);
    addMarker(e.lngLat.lat, e.lngLat.lng);
  });
}

function addMarker(lat, lng) {
  var marker = new mapboxgl.Marker();
  marker.setLngLat([lng, lat]).addTo(map);
  debugger;
  console.log("ADDER MAREKER");
}

// function addMarker(lat, lng) {
//   var myLayer = L.mapbox.featureLayer().addTo(map);

//   var geojson = [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [lat, lng]
//       },
//       properties: {
//         icon: {
//           iconUrl:
//             "https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png",
//           iconSize: [50, 50], // size of the icon
//           iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
//           popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
//           className: "dot"
//         }
//       }
//     }
//   ];
//   myLayer.on("layeradd", function(e) {
//     var marker = e.layer,
//       feature = marker.feature;

//     marker.setIcon(L.icon(feature.properties.icon));
//   });
//   myLayer.setGeoJSON(geojson);
//   map.scrollWheelZoom.disable();
// }

// function addMarker() {
//   var geojson = [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-77.031952, 38.913184]
//       }
//     }
//   ];

//   var myLayer = L.mapbox
//     .featureLayer()
//     .setGeoJSON(geojson)
//     .addTo(map);
//   mapGeo.scrollWheelZoom.disable();
// }
