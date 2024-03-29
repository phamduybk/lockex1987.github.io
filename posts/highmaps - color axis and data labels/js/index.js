
$.getJSON('https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/us-population-density.json', function (data) {

  // Make codes uppercase to match the map data
  $.each(data, function () {
    this.code = this.code.toUpperCase();
  });

  // Instantiate the map
  Highcharts.mapChart('container', {
    chart: {
      map: 'countries/us/us-all',
      borderWidth: 1
    },
    title: {
      text: 'US population density (/km²)'
    },
    legend: {
      layout: 'horizontal',
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.85)',
      floating: true,
      verticalAlign: 'top',
      y: 25
    },
    mapNavigation: {
      enabled: true
    },
    colorAxis: {
      min: 1,
      type: 'logarithmic',
      minColor: '#EEEEFF',
      maxColor: '#000022',
      stops: [
        [0, '#EFEFFF'],
        [0.67, '#4444FF'],
        [1, '#000022']
      ]
    },
    series: [
      {
        animation: {
          duration: 1000
        },
        data: data,
        joinBy: ['postal-code', 'code'],
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          format: '{point.code}'
        },
        name: 'Population density',
        tooltip: {
          pointFormat: '{point.code}: {point.value}/km²'
        }
      }
    ]
  });
});