/***********
 PROCESS CONTROL REPORT
 */

var options = {
    chart: {
        height: 350,
        type: 'area',
        stacked: true,
        events: {
            selection: function(chart, e) {
                console.log(new Date(e.xaxis.min) )
            }
        },

    },
    responsive: [{
        breakpoint: 700,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    colors: ['#008FFB', '#00E396', '#CED4DC'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },

    series: [{
        name: 'South',
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
        })
    },
        {
            name: 'North',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 20
            })
        },

        {
            name: 'Central',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 15
            })
        }
    ],
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 0.6,
            opacityTo: 0.8,
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
}

var chart = new ApexCharts(
    document.querySelector("#process-control-chart"),
    options
);


/*
 // this function will generate output in this format
 // data = [
 [timestamp, 23],
 [timestamp, 33],
 [timestamp, 12]
 ...
 ]
 */
function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}