/* create the map */
let map;
function create_map(lat, lng) {
    map = L.map('map').setView([lat, lng, country, region], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
    	.bindPopup(`${region}, ${country}`)
    	.openPopup();
   }
