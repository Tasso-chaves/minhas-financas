import { AfterContentInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';

export interface CategoriaModel {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterContentInit, OnInit{

  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'nome', 'descricao'];
  dataSource = new MatTableDataSource<CategoriaModel>();
  categorias: CategoriaModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService){

  }
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((categorias: CategoriaModel[]) =>{
      this.categorias = categorias;
      this.dataSource.data = this.categorias;
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

}
