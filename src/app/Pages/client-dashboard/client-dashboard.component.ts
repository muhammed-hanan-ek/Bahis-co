import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";

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
  ApexFill
} from "ng-apexcharts";
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-client-dashboard',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  // ---------------- TIME ----------------

  dayName = '';
  day = '';
  month = '';
  year = '';
  time = '';
ads = [
  {
    name: "Instagram Ad",
    fromDate: "01/11/2026",
    toDate: "11/11/2026",
    conversions: 5,
    revenue: 18000,
    spend: 100
  },
  {
    name: "Facebook Campaign",
    fromDate: "03/11/2026",
    toDate: "12/11/2026",
    conversions: 12,
    revenue: 42000,
    spend: 350
  },
  {
    name: "Google Search Ad",
    fromDate: "05/11/2026",
    toDate: "14/11/2026",
    conversions: 8,
    revenue: 25000,
    spend: 200
  },
  {
    name: "YouTube Promotion",
    fromDate: "02/11/2026",
    toDate: "09/11/2026",
    conversions: 3,
    revenue: 12000,
    spend: 150
  },
  {
    name: "LinkedIn Ad",
    fromDate: "04/11/2026",
    toDate: "13/11/2026",
    conversions: 6,
    revenue: 21000,
    spend: 180
  }
];

constructor(private loader:LoaderService){}


  ngOnInit() {
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);

    
  }

  updateTime() {

    const now = new Date();

    const days = [
      'Sunday','Monday','Tuesday','Wednesday',
      'Thursday','Friday','Saturday'
    ];

    const months = [
      'January','February','March','April','May',
      'June','July','August','September','October',
      'November','December'
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
    height: 320
  };

  chartSeries: ApexNonAxisChartSeries = [12, 18, 6];

  chartLabels: string[] = ['Pending', 'Approved', 'Rejected'];

  chartColors: string[] = ['#f59e0b', '#10b981', '#ef4444'];

  chartLegend: ApexLegend = {
    position: 'bottom'
  };

  fill: ApexFill = {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: ["#fbbf24", "#34d399", "#fb7185"],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 90]
    }
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
            }
          },
          total: {
            show: true,
            label: 'Total Works',
            formatter: (w: any) => {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            }
          }
        }
      }
    }
  };

  dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (val: number, opts: any) => {
      return opts.w.config.series[opts.seriesIndex];
    }
  };



  // ---------------- ADS AREA CHART ----------------

  adsSeries: ApexAxisChartSeries = [
    {
      name: "Total Ad Conversions",
      data: [8, 12, 10, 15, 9]
    },
    {
      name: "Total Ad Revenue",
      data: [12000, 18000, 15000, 22000, 13000]
    }
  ];

  adsChart: ApexChart = {
    type: "area",
    height: 300,
    toolbar: {
      show: false
    }
  };

  adsXAxis: ApexXAxis = {
    categories: [
      "Instagram Ad",
      "Facebook Ad",
      "Twitter Ad",
      "Threads Ad",
      "Youtube Ad"
    ]
  };

  adsStroke: ApexStroke = {
    curve: "smooth",
    width: 3
  };

  adsMarkers: ApexMarkers = {
    size: 4
  };

  adsTooltip: ApexTooltip = {
    shared: true
  };

  adsColors: string[] = ["#fbbf24", "#34d399", "#fb7185"];

  adsFill: ApexFill = {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  };

}
