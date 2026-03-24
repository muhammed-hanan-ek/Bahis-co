import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexMarkers,
  ApexFill,
} from 'ng-apexcharts';
import { LoaderService } from '../../loader/loader.service';
import { BACService } from '../../Service/bac.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-dashboard',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css',
})
export class ClientDashboardComponent {
  // ---------------- TIME ----------------

  dayName = '';
  day = '';
  month = '';
  year = '';
  time = '';
  ads:any = [];
  workAnalysisData = {
    pending: 0,
    Approved: 0,
    Rejected: 0,
  };
  performedAd:any;

   clientWorksOverview:any[]=[];
  clientAdsOverview:any[]=[];

  constructor(
      private service:BACService,
      private toastr:ToastrService
    ){
  
    }
  ngOnInit() {
    this.load()
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.dayName = days[now.getDay()];
    this.day = now.getDate().toString();
    this.month = months[now.getMonth()];
    this.year = now.getFullYear().toString();

    this.time = now.toLocaleTimeString();
  }


  // ---------------- DONUT CHART ----------------

  chartDetails: ApexChart = {
    type: 'donut',
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false }
  };

  chartSeries: ApexNonAxisChartSeries = [0, 0, 0];

  chartLabels: string[] = ['Pending', 'Approved', 'Rejected'];

  chartColors: string[] = ['#f59e0b', '#10b981', '#ef4444'];

  chartLegend: ApexLegend = {
    position: 'bottom',
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#fbbf24', '#34d399', '#fb7185'],
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 90],
    },
  };

  plotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          value: {
            show: true,
            formatter: (val: string) => val,
          },
          total: {
            show: true,
            label: 'Total Works',
            formatter: (w: any) => {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            },
          },
        },
      },
    },
  };

  dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (val: number, opts: any) => {
      return opts.w.config.series[opts.seriesIndex];
    },
  };
  // ---------------- ADS AREA CHART ----------------

 
  adsSeries: ApexAxisChartSeries = [];

  adsChart: ApexChart = {
    type: 'area',
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false }
  };

  adsXAxis: ApexXAxis = {
    categories: [],
  };

  adsStroke: ApexStroke = {
    curve: 'smooth',
    width: 3,
  };

  adsMarkers: ApexMarkers = {
    size: 4,
  };

  adsTooltip: ApexTooltip = {
    shared: true,
  };

  adsColors: string[] = ['#f59e0b', '#ef4444'];

  adsFill: ApexFill = {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  };


  load(){
    this.service.loadClientDashboard().subscribe({
      next:(res)=>{
        console.log(res);
        
         this.workAnalysisData.pending = res.data[1][0].pending_count;
        this.workAnalysisData.Approved = res.data[1][0].approved_count;
        this.workAnalysisData.Rejected = res.data[1][0].Rejected_count;
        this.chartSeries = [
          this.workAnalysisData.pending,
          this.workAnalysisData.Approved,
          this.workAnalysisData.Rejected,
        ];

        this.performedAd=res.data[2][0]

        this.clientAdsOverview = res.data[0];

        this.adsSeries = [
          {
            name: 'Total Ads Created',
            data: this.clientAdsOverview.map(a => a.CN_COUNT),
          },
          {
            name: 'Total Ad Revenue',
            data: this.clientAdsOverview.map(a => a.CN_AMOUNT),
          },
        ];

        this.adsXAxis = {
          categories: this.clientAdsOverview.map(a => a.title),
        };
        
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('An error occurred while loading Dashboard. Please try again.','Error')
      }
    })
  }
}
