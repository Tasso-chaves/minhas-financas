import { Entrada } from './models/entrada.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  meses = [
    {value: 0, viewValue: 'Janeiro'},
    {value: 1, viewValue: 'Fevereiro'},
    {value: 2, viewValue: 'Março'},
    {value: 3, viewValue: 'Abril'},
    {value: 4, viewValue: 'Maio'},
    {value: 5, viewValue: 'Junho'},
    {value: 6, viewValue: 'Julho'},
    {value: 7, viewValue: 'Agosto'},
    {value: 8, viewValue: 'Setembro'},
    {value: 9, viewValue: 'Outubro'},
    {value: 10, viewValue: 'Novembro'},
    {value: 11, viewValue: 'Dezembro'}
  ]

  entradas: any[] = [];
  saldo = 0;
  despesa = 0;
  receita = 0;

  constructor(private dashboardService: DashboardService){

  }

  ngOnInit(): void {
    this.dashboardService.getEntradas().subscribe(entradas =>{
      this.entradas = entradas;
      this.getReceitas();
      this.getDespesas();
      this.getSaldo();
    });
  }

  getReceitas(){
    this.entradas.forEach((entrada: Entrada) =>{

      if(entrada.tipo == 'receita'){
        this.receita += parseInt(entrada.valor);
      }

    })
  }

  getDespesas(){
    this.entradas.forEach((entrada: Entrada) =>{

      if(entrada.tipo == 'despesas'){
        this.despesa += parseInt(entrada.valor);
      }

    })
  }

  getSaldo(){
    this.saldo = this.receita - this.despesa;
  }
}
