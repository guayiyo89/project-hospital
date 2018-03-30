import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

@Input('ChartLabels') doughnutChartLabels:string[] = [];
@Input('ChartData') doughnutChartData:number[] = [];
@Input('ChartType') doughnutChartType:string = '';
@Input() leyenda:string = '';

  constructor() { }

  ngOnInit() {
  }

}
