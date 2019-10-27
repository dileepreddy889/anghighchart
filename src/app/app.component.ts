import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  highchartsLine = Highcharts;
  chartOptionsLine = {
    chart: {
      backgroundColor: '#d2cf94',
      type: 'spline'
    },
    title: {
      text: 'Feedback in Line Chart'
    },
    xAxis: {
      categories: ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week']
    },
    yAxis: {
      title: {
        text: 'Ratings'
      }
    },
    series: [{
      name: 'Positive',
      data: [30,  33, 70, 49, 40]
    },
      {
        name: 'Negative',
        data:[ 40, 60, 20, 31, 25]
      },
      {
        name: 'Nuetral',
        data: [ 30, 7, 10, 20, 35]
      }]
  };

  highchartsPie = Highcharts;
  chartOptions1 = {
    chart: {
      backgroundColor: '#d2cf94',
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Feedback in piechart'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',

        dataLabels: {
          enabled: false
        },

        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      name: 'Feedback',
      data: [

        ['Positive', 74],
        ['Nuteral', 18],
        ['Negative', 8]
      ]
    }]

  };
}


