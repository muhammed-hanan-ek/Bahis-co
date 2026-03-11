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
  selector: 'app-staff-dashboard',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css',
})
export class StaffDashboardComponent {
  // ---------------- TIME ----------------

  dayName = '';
  day = '';
  month = '';
  year = '';
  time = '';

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

  ngOnInit() {
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
  };

  chartSeries: ApexNonAxisChartSeries = [12, 18, 6];

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
      data: [15, 25, 18, 30, 22],
    },
    {
      name: 'Works Approved',
      data: [10, 20, 14, 25, 18],
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
    categories: [
      'ABC Company',
      'XYZ Pvt Ltd',
      'Green Tech',
      'Delta Corp',
      'Pixel Media',
    ],
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
}
