function buildChart() {
    Highcharts.chart('chart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'vertical'
        },
        series: [{
            name: 'Số bài',
            colorByPoint: true,
            data: categories
        }]
    });
}

function filterPosts() {
    var query = document.getElementById('query').value.toLowerCase();
    var filterPosts = [];
    posts.forEach(s => {
        if (s.indexOf(query) >= 0) {
            filterPosts.push(s);
        }
    });
    
    var html = `
        ${filterPosts.map((p) =>
            `
            <div class="item">
                <a class="title" href="posts/${p}/">${highlightText(p, query)}</a>
            </div>
            `
        ).join('')}
        `;
    document.querySelector("#items").innerHTML = html;
}

function filterByCategory(category) {
    document.getElementById('query').value = category + ' -';
    filterPosts();
}

function highlightText(text, query) {
    var pattern = new RegExp("(" + query + ")", "i");
    return text.replace(pattern, "<b>" + query + "</b>");
}

function buildCategories() {
    var html = `
        ${categories.slice(0, 10).map((c) =>
            `
            <div class="cat">
                <a href="javascript:" onclick="filterByCategory('${c.name}')">${c.name} (${c.y})</a>
            </div>
            `
        ).join('')}
        `;

    document.querySelector("#categories").innerHTML = html;
}

filterPosts();
buildChart();
buildCategories();
