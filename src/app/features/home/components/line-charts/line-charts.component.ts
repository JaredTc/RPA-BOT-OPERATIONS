import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts/types/dist/shared';

@Component({
  selector: 'app-line-charts',
  imports: [CommonModule],
  templateUrl: './line-charts.component.html',
  standalone: true,
  styleUrl: './line-charts.component.scss',
})
export class LineChartsComponent implements OnInit, AfterViewInit {
  @ViewChild('parentContainerBarS') parentContainerBarS!: ElementRef;
  @ViewChild('barChartLineS', { static: true }) barChartLineS!: ElementRef;
  myChart: echarts.EChartsType | undefined;
  constructor(private change: ChangeDetectorRef) {}
  dataEmpty = {
    color: ['#393939', '#5f5f5f'],
    labels: [],
    data_competed: [0, 0, 2, 5, 8, 6, 90, 6, 22, 99, 0],
    data_failed: [100, 0, 22, 90, 9, 3, 10, 30, 90, 60, 10],
  };
  noData: boolean = false;
  loading: boolean = false;

  dataHardcore = {
    color: ['#1e90ff', '#393939'], // morado y gris
    labels: [
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
    ],
    data_transactions: [1000, 1100, 1500, 1600, 1800, 2100, 1900, 2000, 2500, 2700, 2800, 2600],
    data_minutes_saved: [950, 1000, 1500, 1400, 1700, 1800, 2200, 2500, 2400, 2800, 2700, 3000],
  };
  ngOnInit(): void {
    this.createChart(this.dataHardcore);
  }

  ngAfterViewInit() {
    const observer = new ResizeObserver(() => {
      this.myChart?.resize();
      this.change.detectChanges();
    });
    observer.observe(this.barChartLineS.nativeElement);
  }

  createChart(data: any) {
    if (
      !data ||
      !data.labels ||
      data.labels.length === 0 ||
      (data.data_transactions.every((val: number) => val === 0) &&
        data.data_minutes_saved.every((val: number) => val === 0))
    ) {
      this.noData = true;
      this.loading = true;
      this.initChart(this.dataEmpty);
    } else {
      this.noData = false;
      this.loading = false;
      this.initChart(data);
    }
  }

  initChart(data: any) {
    const chartElement = this.barChartLineS.nativeElement;
    const chart = echarts.getInstanceByDom(chartElement);
    if (chart) {
      chart.dispose();
    }
    this.myChart = echarts.init(chartElement);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: 'top',
        left: 'center',
        data: ['Transactions', 'Minutes Saved'],
      },
      grid: {
        top: '15%',
        left: '4%',
        right: '4%',
        bottom: '4%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.labels,
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Transactions',
          type: 'line',
          smooth: true,
          data: data.data_transactions,
          itemStyle: {
            color: data.color[0],
          },
          symbol: 'circle',
          symbolSize: 6,
        },
        {
          name: 'Minutes Saved',
          type: 'line',
          smooth: true,
          data: data.data_minutes_saved,
          itemStyle: {
            color: data.color[1],
          },
          symbol: 'circle',
          symbolSize: 6,
        },
      ],
    };

    this.myChart.setOption(option);
  }
}
