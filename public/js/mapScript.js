// Initialize and add the map
let map;

async function initMap() {
  // The location of GTU
  const position = { lat: 23.1059, lng: 72.5937 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at home
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: position,
    mapId: "DEMO",
  });

  // The marker, positioned at GTU
  // new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "Gujarat Technological University" 
  // });

  fetch('/getUserData')
    .then(response => response.json())
    .then(data => {
      const userData = data;
      console.log(userData);
      const redZoneCity = "Jamnagar";
      // Iterate over each user in the data
      for (let userId in userData) {
        if (userData.hasOwnProperty(userId)) {
          const user = userData[userId];
          const userPosition = {
            lat: parseFloat(user.location.latitude),
            lng: parseFloat(user.location.longitude)
          };

          // Create a marker for each user
          const marker = new AdvancedMarkerElement({
            map: map,
            position: userPosition,
            title: user.Name,
           
          });
          const infoWindow = new google.maps.InfoWindow({
            content: user.Name
          });
          
        }
      }
    });
}

initMap();