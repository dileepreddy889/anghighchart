import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private hc: HttpClient) { }
  public queryurl: string = "http://localhost:5010/";
  splineCate= [];
  highchartsLine : any;
  chartOptionsLine:any;
  highchartsPie : any;
  chartOptions1:any;

  ngOnInit(): void {
    this.hc.get(this.queryurl + 'GetAllFeedbackFromSTD').subscribe(res=>{
      this.loadSlineChart(res);
    });

    this.hc.get(this.queryurl + 'GetAllFeedbackPie').subscribe(res1=>{
      this.loadPieChart(res1);
    });

  }


  public loadSlineChart(data1){
    console.log(data1);
    var arrStatusPosit=[];
    var arrStatusNeut=[];
    var arrStatusNeg=[];


    data1.filter(data => {
      arrStatusPosit.push(data.Positive);
      arrStatusNeut.push(data.Neutral);
      arrStatusNeg.push(data.Negative);
      this.splineCate.push(data.PostDate);
    })


    this.splineChartLoadData(arrStatusPosit,arrStatusNeut,arrStatusNeg,this.splineCate);

    console.log(arrStatusPosit+"  "+ this.splineCate)

  };

  splineChartLoadData(posiArr,neutArr,negArr,Categ){
    this.highchartsLine = Highcharts;
    this.chartOptionsLine = {
      chart: {
        backgroundColor: '#d2cf94',
        type: "spline"
      },
      title: {
        text: "Feedback Analysis"
      },

      xAxis:{
        categories:Categ
      },
      yAxis: {
        title:{
          text:"Rating Analysis"
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        valueSuffix:" Feedback"
      },
      series: [{
        name: 'Positive',
        data: posiArr,
        color: 'red'
      },
        {
          name: 'Nuteral',
          data: neutArr,
          color: 'blue'
        },
        {
          name: 'Negative',
          data: negArr
        }
      ]
    };
  }

public loadPieChart(pieData){
   var ps=pieData[0].Positive;
    var ps1=pieData[0].Negative;
    var ps2=pieData[0].Neutral;

    this.highchartsPie = Highcharts;
    this.chartOptions1 = {
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

          ['Positive', ps],
          ['Nuteral', ps1],
          ['Negative', ps2]
        ]
      }]

    };

  }


}
