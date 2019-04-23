/**
 * Vẽ biểu đồ
 */
function buildWordCloud(data) {
    Highcharts.chart('wordcloudContainerHighcharts', {
        chart: {
            backgroundColor: 'transparent',
            height: 210
        },
        series: [
            {
                name: 'Số lượng tin',
                type: 'wordcloud',
                data: data
            }
        ],
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            wordcloud: {
                style: {
                    // Thiết lập lại font để hiển thị tiếng Việt cho đẹp
                    fontFamily: 'serif' // Arial, Helvetica, sans-serif
                }
            }
        }
    });
}

function init() {
  var data = [{"name":"hải quân","weight":26},{"name":"số","weight":21},{"name":"an ninh mạng","weight":13},{"name":"máy bay","weight":12},{"name":"vũ khí","weight":12},{"name":"đảo","weight":11},{"name":"tt","weight":10},{"name":"chính trị","weight":10},{"name":"buôn lậu","weight":9},{"name":"sản phẩm","weight":7},{"name":"sữa","weight":6},{"name":"khánh hoà","weight":6},{"name":"dân tộc","weight":6},{"name":"tư","weight":6},{"name":"tên lửa","weight":6},{"name":"hàng không","weight":5},{"name":"coca","weight":5},{"name":"cola","weight":5},{"name":"cam ranh","weight":5},{"name":"ngân hàng","weight":4}];
  //console.log(JSON.stringify(data));

  // Highcharts sử dụng thuộc tính "name", còn jQCloud2 lại sử dụng thuộc tính "text"
  data.forEach(e => e.text = e.name);

  buildWordCloud(data);
  $('#wordcloudContainerJqcloud2').jQCloud(data);
}

init();
