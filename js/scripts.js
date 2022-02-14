
$.getJSON('data/dogruns.json',function(dogRuns){
  console.log(dogRuns)

  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbm5sZWUiLCJhIjoiY2t6aG5wZDJqMGlyZDJwcWhta2pldWNlYyJ9.SF7LAInpjGYwkH-_Wo_4dA';

  //long lat for NYC Center
  var nycCenter = [-73.935242, 40.730610]

  var map = new mapboxgl.Map({
    container: 'mapContainer', // HTML container id
    style: 'mapbox://styles/mapbox/light-v9', // style URL
    center: nycCenter, // starting position as [lng, lat]
    zoom: 9
  });

//add popups for dog runs

dogRuns.forEach(function(dogRun){
    var popupHTML = `
    <h3>${dogRun.name}</h3>
    <p><b>Size (sq ft.):</b> ${dogRun.sqft}
    `
    if (dogRun.surface) {
      popupHTML = `
        ${popupHTML} <br/>
        <b>Surface:</b> ${dogRun.surface}
      `
    }

    if (dogRun.seating) {
      popupHTML = `
        ${popupHTML} <br/>
        <b>Seating:</b> ${dogRun.seating}</p>
      `
    }
    var popup = new mapboxgl.Popup({offset: 40})
    .setHTML(popupHTML);

    // Set all markers to medium green
    var color = '#7EB851'
    // Set all markers for small dog runs to light green
    if (dogRun.sqft < 3000){
      color = '#C7DEB5'
    }
    // Set all markers for large dog runs to dark green
    if (dogRun.sqft > 10000){
      color = '#45672B'
    }

//add markers for dog runs
    new mapboxgl.Marker({
      color: color
    })
      .setLngLat([dogRun.longitude, dogRun.latitude])
      .setPopup(popup)
      .addTo(map);

})



})
