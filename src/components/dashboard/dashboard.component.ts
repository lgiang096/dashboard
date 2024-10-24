import { Component, NgZone, AfterViewInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatIconModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }
  private root: am5.Root | undefined;

  selectedYear = 2024;
  years = [2023, 2024];
  messages = [
    {
      title: "Total emissions",
      price: 44000,
      content: "15,200"
    },
    {
      title: "Total emissions",
      price: 44000,
      content: "15,200"
    },
    {
      title: "Total emissions",
      price: 44000,
      content: "15,200"
    }
  ]

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  createChart() {
    let root = am5.Root.new("donutChartDiv");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        innerRadius: am5.percent(50)
      })
    );

    series.data.setAll([
      { category: "Category A", value: 40 },
      { category: "Category B", value: 30 },
      { category: "Category C", value: 20 },
      { category: "Category D", value: 10 }
    ]);
  }
}
