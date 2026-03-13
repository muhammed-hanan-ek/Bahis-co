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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  // ---------------- TIME ----------------

  dayName = '';
  day = '';
  month = '';
  year = '';
  time = '';
  bestPerformer={
    name:'Muhammed',
    img:'',
    works:10
  }
  staffWorks = [
    {
      name: 'Arjun',
      total: 25,
      pending: 5,
      approved: 18,
      rejected: 2,
    },
    {
      name: 'Rahul',
      total: 30,
      pending: 7,
      approved: 20,
      rejected: 3,
    },
    {
      name: 'Nikhil',
      total: 18,
      pending: 3,
      approved: 13,
      rejected: 2,
    },
    {
      name: 'Faisal',
      total: 22,
      pending: 4,
      approved: 16,
      rejected: 2,
    },
  ];
  clientWorks = [
    {
      name: 'ABC Company',
      total: 25,
      pending: 5,
      approved: 18,
      rejected: 2,
    },
    {
      name: 'Delta Corp',
      total: 30,
      pending: 7,
      approved: 20,
      rejected: 3,
    },
    {
      name: 'Green Tech',
      total: 18,
      pending: 3,
      approved: 13,
      rejected: 2,
    },
    {
      name: 'XYZ Pvt Ltd',
      total: 22,
      pending: 4,
      approved: 16,
      rejected: 2,
    },
  ];
  workAnalysisData={
    pending:10,
    Approved:15,
    Rejected:5
  };
  clientWorksOverview:any[]=[
    {name:'XYZ Pvt Ltd',created:20,approved:5},
    {name:'ABC Company',created:5,approved:1},
  ];
  clientAdsOverview:any[]=[
    {name:'XYZ Pvt Ltd',created:20,revenue:5000},
    {name:'ABC Company',created:5,revenue:6000},
  ];


  ngOnInit() {
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);

    const workscreatedData = this.clientWorksOverview.map(work => work.created);
  const worksapprovedData = this.clientWorksOverview.map(work => work.approved);
  const workscategories = this.clientWorksOverview.map(work => work.name);
  const adsCreated=this.clientAdsOverview.map(ad=>ad.created);
  const adsRevenue=this.clientAdsOverview.map(ad=>ad.revenue);
  const adCategory=this.clientAdsOverview.map(ad=>ad.name)

  this.worksSeries = [
    {
      name: 'Works Created',
      data: workscreatedData
    },
    {
      name: 'Works Approved',
      data: worksapprovedData
    }
  ];

  this.worksXAxis = {
    categories: workscategories
  };

  this.adsSeries = [
    {
      name: 'Total Ads Created',
      data: adsCreated,
    },
    {
      name: 'Total Ad Revenue',
      data: adsRevenue,
    },
  ]

  this.adsXAxis={
    categories:adCategory
  }
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
  };

  chartSeries: ApexNonAxisChartSeries = [this.workAnalysisData.pending,this.workAnalysisData.Approved,this.workAnalysisData.Rejected];

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
      inverseColors: false,
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
            formatter: (val: string) => {
              return val;
            },
          },
          total: {
            show: true,
            label: 'Total Works',
            formatter: (w: any) => {
              return w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0,
              );
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

  // ---------------- WORKS AREA CHART ----------------

  

  worksSeries: ApexAxisChartSeries = [
    {
      name: 'Works Created',
      data: [],
    },
    {
      name: 'Works Approved',
      data: [],
    },
  ];

  worksChart: ApexChart = {
    type: 'area',
    height: 280,
    toolbar: {
      show: false,
    },
  };

  worksXAxis: ApexXAxis = {
    categories: [],
  };

  worksStroke: ApexStroke = {
    curve: 'smooth',
    width: 3,
  };

  worksMarkers: ApexMarkers = {
    size: 4,
  };

  worksTooltip: ApexTooltip = {
    shared: true,
  };

  worksColors: string[] = ['#6366f1', '#22c55e'];

  worksFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  };

  // ---------------- ADS AREA CHART ----------------


  adsSeries: ApexAxisChartSeries = [
    {
      name: 'Total Ads Created',
      data: [],
    },
    {
      name: 'Total Ad Revenue',
      data: [],
    },
  ];

  adsChart: ApexChart = {
    type: 'area',
    height: 320,
    toolbar: {
      show: false,
    },
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
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  };
}
