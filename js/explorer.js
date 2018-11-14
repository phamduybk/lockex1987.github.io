function normalizeCategories() {
    var normalized = [];
    var names = [];
    normalized.push({ name: 'other', y: 0 });
    categories.forEach(c => {
        if (c.y >= 10) {
            normalized.push(c);
        } else {
            normalized[0].y += c.y;
            if (names.indexOf(c.name) < 0) {
                names.push(c.name);
            }
        }
    });
    normalized[0].name = names.slice(0, 10).join(', ') + ',...';
    return normalized;
}


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
            data: normalizeCategories() // categories
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

/**
 * Hiển thị 10 thể loại nhiều post nhất.
 */
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
