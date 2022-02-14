
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
/*
  var popup = new mapboxgl.Popup({
    offset: 40,
  })
    .setHTML('<h3>Prospect Park</h3>');

  //add a marker for Prospect Park
  var marker = new mapboxgl.Marker()
    .setLngLat(prospectPark)
    .setPopup(popup)
    .addTo(map);

  var pointsOfInterest = [
    {
      lngLat: [-73.960218,40.700292],
      popupHtml:'Cooper Park',
    },
    {
      lngLat: [-73.976698,40.704457],
      popupHtml:'McCarren Park',
    },
    {
      lngLat: [-74.016781,40.675756],
      popupHtml:'Fort Green Park',
    }
  ]

  pointsOfInterest.forEach(function(pointOfInterest){
    var popup = new mapboxgl.Popup({offset: 40})
      .setHTML(`
        <h3>${pointOfInterest.popupHtml}</h3>
        `);


    new mapboxgl.Marker()
      .setLngLat(pointOfInterest.lngLat)
      .setPopup(popup)
      .addTo(map);
  })
*/
//add markers for dog runs
dogRuns.forEach(function(dogRun){
    var popup = new mapboxgl.Popup({offset: 40})
      .setHTML(`
        <h3>${dogRun.name}</h3>
        <p><b>Size (sq ft.):</b> ${dogRun.sqft}<br>
            <b>Surface:</b> ${dogRun.surface}<br>
            <b>Seating:</b> ${dogRun.seating}</p>
        `);

    //
    var color = '#7EB851'

    if (dogRun.sqft < 3000){
      color = '#C7DEB5'
    }

    if (dogRun.sqft > 10000){
      color = '#45672B'
    }




    new mapboxgl.Marker({
      color: color
    })
      .setLngLat([dogRun.longitude, dogRun.latitude])
      .setPopup(popup)
      .addTo(map);

})



})
