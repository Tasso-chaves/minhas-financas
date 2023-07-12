import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EntradaModel } from '../../models/entrada.model';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { EntradasService } from '../../service/entradas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  ngAfterContentInit(): void {
  }

  displayedColumns: string[] = ['nome', 'pago','data', 'valor','tipo', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<EntradaModel>();
  entradas: EntradaModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private entradasService: EntradasService, private router: Router){
  }

  ngOnInit(): void {
    this.buscarEntradas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarEntradas(){
    this.entradasService.getEntradas().subscribe((entradas: EntradaModel[]) =>{
      this.entradas = entradas;
      this.dataSource.data = this.entradas;
    });
  }

  chamarEdicao(entrada: EntradaModel){
    this.router.navigate(['entradas', 'editar', entrada.id]);
  }

  excluir(id: number){
    this.entradasService.excluirEntrada(id).subscribe((resposta =>{
      this.buscarEntradas();
    }))
  }

  novaEntrada(){
    this.router.navigate(['entradas', 'nova']);
  }
}
