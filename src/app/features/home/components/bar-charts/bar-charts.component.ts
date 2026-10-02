import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as echarts from "echarts";
import {EChartsOption} from 'echarts/types/dist/shared';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-bar-charts',
  imports: [CommonModule],
  templateUrl: './bar-charts.component.html',
  standalone: true,
  styleUrl: './bar-charts.component.scss',
})
export class BarChartsComponent implements OnInit, AfterViewInit {
  @Input() data: any | undefined;
  @ViewChild('parentContainerBarS') parentContainerBarS!: ElementRef;
  @ViewChild('barChartLineS', { static: true }) barChartLineS!: ElementRef;
  myChart: echarts.EChartsType | undefined;
  constructor(private change: ChangeDetectorRef) {}
  dataEmpty = {
    color: ['#393939', '#5f5f5f', '#5f5f5f'],
    labels: ['1', '3', '4'],
    data_competed: [100, 20, 22, 90, 9, 3, 10, 30, 90, 60, 10],
    data_failed: [100, 10, 22, 90, 9, 3, 10, 30, 90, 60, 10],
    data_in_progress: [100, 10, 22, 90, 9, 3, 10, 30, 90, 60, 10],
    data_success: [100, 10, 22, 90, 9, 3, 10, 30, 90, 60, 10],
  };

  dataHardcoded = {
    color: ['#1e90ff', '#595959', '#7dbfff'], // morado, gris, lila
    labels: ['Daniel', 'Pedro', 'Olivia', 'Elsa'],
    data_competed: [600, 1500, 100, 800],
    data_failed: [],
    data_in_progress: [980, 1000, 1200, 1600],
    data_success: [1000, 1500, 1600, 1400],
  };

  noData: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.createChart(this.dataHardcoded);
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
      (data.data_competed.every((val: number) => val === 0) &&
        data.data_failed.every((val: number) => val === 0))
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

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: 'top',
        left: 'center',
        data: ['Successful', 'In progress', 'Completed'],
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
          rotate: 0,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Successful',
          type: 'bar',
          data: data.data_success.slice(0, data.labels.length),
          itemStyle: {
            color: data.color[0] || '#673AB7', // morado
          },
        },
        {
          name: 'In progress',
          type: 'bar',
          data: data.data_in_progress.slice(0, data.labels.length),
          itemStyle: {
            color: data.color[1] || '#333333', // gris oscuro
          },
        },
        {
          name: 'Completed',
          type: 'bar',
          data: data.data_competed.slice(0, data.labels.length),
          itemStyle: {
            color: data.color[2] || '#9C27B0', // lila
          },
        },
      ],
    };

    this.myChart.setOption(option);
  }
}
