document.addEventListener('DOMContentLoaded', function() {
    var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    });

    var customMapboxLayer = L.tileLayer('https://api.mapbox.com/styles/v1/joshuaobi1/cltncbycj019t01pt5z3ybypl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9zaHVhb2JpMSIsImEiOiJjbHRuOWhpMHQwMXdiMmtwZnFucW5mbHhrIn0.8_iSZWbbFiMpTY0WZNvTsg', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoiam9zaHVhb2JpMSIsImEiOiJjbHRuOWhpMHQwMXdiMmtwZnFucW5mbHhrIn0.8_iSZWbbFiMpTY0WZNvTsg'
    });

    var map = L.map('mapid', {
        layers: [baseLayer]
    }).setView([51.0447, -114.0719], 12);

    var baseMaps = {
        "Original Map": baseLayer
    };

    var overlayMaps = {
        "My Mapbox Map Layer": customMapboxLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);
    var markers = L.markerClusterGroup();

    $('#date-range').daterangepicker({
        locale: { format: 'YYYY-MM-DD' },
        autoApply: true,
    });

    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        var dates = $('#date-range').val().split(' - ');
        var start = dates[0];
        var end = dates[1];
        var url = `https://data.calgary.ca/resource/c2es-76ed.geojson?$where=issueddate between '${start}' and '${end}'`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                markers.clearLayers();
                L.geoJSON(data, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(`
                            <strong>Date Issued:</strong> ${feature.properties.issueddate}<br>
                            <strong>Work Class Group:</strong> ${feature.properties.workclassgroup}<br>
                            <strong>Contractor Name:</strong> ${feature.properties.contractorname || 'N/A'}<br>
                            <strong>Community Name:</strong> ${feature.properties.communityname}<br>
                            <strong>Original Address:</strong> ${feature.properties.originaladdress}<br>
                        `);
                    }
                }).addTo(markers);
                map.addLayer(markers);
            }).catch(error => console.error('Error fetching data:', error));
    });
});
