const BG_COLOR = '#394b52';

const TEXT_COLOR = '#e7eaeb';

const LINE_COLORS = [
  '#48b23a',
  '#eab02b',
  '#459bca',
  '#d64561'
];

const GRID_COLOR = '#626262';

const MOCK_DATA = {
  title: 'Fruit Consumption',
  axes: {
    x: {
      title: 'Day',
      values: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      data: [
        {
          name: 'Apples',
          values: [2, 5, 13, 3, 20, 4, 1]
        },
        { 
          name: 'Oranges',
          values: [5, 8, 2, 15, 24, 16, 10]
        },
        {
          name: 'Blueberries',
          values: [6, 12, 6, 9, 2, 21, 15]
        },
        {
          name: 'Strawberries',
          values: [2, 4, 8, 15, 9, 4, 12]
        },
      ]
    },
    y: {
      title: 'Fruit Consumed'  
    }
  }
};

var ctx = 'line--c';
var barChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: MOCK_DATA.axes.x.values,
    datasets: [
      {
        label: MOCK_DATA.axes.x.data[0].name,
        data: MOCK_DATA.axes.x.data[0].values,
        fill: false,
        lineTension: 0,
        borderColor: LINE_COLORS[0],
        backgroundColor: LINE_COLORS[0],
      }, 
      {
        label: MOCK_DATA.axes.x.data[1].name,
        data: MOCK_DATA.axes.x.data[1].values,
        fill: false,
        lineTension: 0,
        borderColor: LINE_COLORS[1],
        backgroundColor: LINE_COLORS[1],
      },
      {
        label: MOCK_DATA.axes.x.data[2].name,
        data: MOCK_DATA.axes.x.data[2].values,
        fill: false,
        lineTension: 0,
        borderColor: LINE_COLORS[2],
        backgroundColor: LINE_COLORS[2],
      }, 
      {
        label: MOCK_DATA.axes.x.data[3].name,
        data: MOCK_DATA.axes.x.data[3].values,
        fill: false,
        lineTension: 0,
        borderColor: LINE_COLORS[3],
        backgroundColor: LINE_COLORS[3],
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: MOCK_DATA.title,
      fontColor: TEXT_COLOR
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: TEXT_COLOR
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: TEXT_COLOR
        },
        gridLines: {
          color: GRID_COLOR
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: TEXT_COLOR
        },
        gridLines: {
          display: false
        }
      }]
    }
  }
});

var myChart = Highcharts.chart('line--h',
  {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: MOCK_DATA.axes.x.values
    },
    yAxis: {
      title: {
        text: 'Fruit Eaten'
      }
    },
    series: [{
      name: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values
    }, {
      name: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values
    }]
  }
);

$('.save').click(() => {
  download(barChart.toBase64Image(), 'chart-name');
});


var ctx = 'bar--c';
var barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: MOCK_DATA.axes.x.values,
    datasets: [{
      label: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values,
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values,
      backgroundColor: "rgba(255,153,0,0.4)"
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: MOCK_DATA.title
    },
    legend: {
      position: 'bottom'
    }
  }
});

var myChart = Highcharts.chart('bar--h',
  {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: MOCK_DATA.axes.x.values
    },
    yAxis: {
      title: {
        text: 'Fruit Eaten'
      }
    },
    series: [{
      name: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values
    }, {
      name: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values
    }]
  }
);

$('.save').click(() => {
  download(barChart.toBase64Image(), 'chart-name');
});


var ctx = 'stacked-bar--c';
var barChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: MOCK_DATA.axes.x.values,
    datasets: [{
      label: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values,
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values,
      backgroundColor: "rgba(255,153,0,0.4)"
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: MOCK_DATA.title
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{ 
        stacked: true, 
        gridLines: { display: false },
        }],
      yAxes: [{ 
        stacked: true, 
      }],
    }, // scales
  }
});

var myChart = Highcharts.chart('stacked-bar--h',
  {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: MOCK_DATA.axes.x.values
    },
    yAxis: {
      title: {
        text: 'Fruit Eaten'
      }
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
      name: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values
    }, {
      name: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values
    }]
  }
);

$('.save').click(() => {
  download(barChart.toBase64Image(), 'chart-name');
});


var ctx = 'pie--c';
var barChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: MOCK_DATA.axes.x.values,
    datasets: [{
      label: MOCK_DATA.axes.x.data[0].name,
      data: MOCK_DATA.axes.x.data[0].values,
      // fill: false,
      // lineTension: 0,
      // borderColor: 'rgba(153,255,51,0.4)',
      backgroundColor: "rgba(153,255,51,0.4)",
    }, {
      label: MOCK_DATA.axes.x.data[1].name,
      data: MOCK_DATA.axes.x.data[1].values,
      // fill: false,
      // lineTension: 0,
      // borderColor: 'rgba(255,153,0,0.4)',
      // backgroundColor: "rgba(255,153,0,0.4)",
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: MOCK_DATA.title
    },
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    legend: {
      position: 'bottom'
    }
  }
});

// var myChart = Highcharts.chart('pie--h',
//   {
//     chart: {
//       type: 'doughnut'
//     },
//     title: {
//       text: 'Fruit Consumption'
//     },
//     xAxis: {
//       categories: MOCK_DATA.axes.x.values
//     },
//     yAxis: {
//       title: {
//         text: 'Fruit Eaten'
//       }
//     },
//     series: [{
//       name: MOCK_DATA.axes.x.data[0].name,
//       data: MOCK_DATA.axes.x.data[0].values
//     }, {
//       name: MOCK_DATA.axes.x.data[1].name,
//       data: MOCK_DATA.axes.x.data[1].values
//     }]
//   }
// );

$('.save').click(() => {
  download(barChart.toBase64Image(), 'chart-name');
});