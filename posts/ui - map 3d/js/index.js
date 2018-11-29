function buildMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FuZHJvbyIsImEiOiJjam95c3oyNXQyZWRvM3BwaDh1M3ZjdGVuIn0.MeVUbAnkD5W4KBVnjDJc5A';

    var thisMap = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        center: [105.784054, 21.017324],
        container: 'map-keangnam'
    });

    function rotateCamera(timestamp) {
        // clamp the rotation between 0 -360 degrees
        // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        thisMap.rotateTo(timestamp / 100 % 360, { duration: 0 });

        // Request the next frame of the animation.
        requestAnimationFrame(rotateCamera);
    }

    function addLayerToMap() {
        // Insert the layer beneath any symbol layer.
        var layers = thisMap.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        thisMap.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]],

                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]],

                'fill-extrusion-opacity': .6
            }
        }, labelLayerId);
    }

    thisMap.on('load', function() {
        // Start the animation.
        rotateCamera(0);

        addLayerToMap();
    });
}

buildMap();