import { AfterContentInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { CategoriaModel } from '../../models/categoria.model';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterContentInit, OnInit{

  ngAfterContentInit(): void {
  }

  displayedColumns: string[] = ['nome', 'descricao', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<CategoriaModel>();
  categorias: CategoriaModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService, private router: Router){
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

  chamarEdicao(categoria: CategoriaModel){
    this.router.navigate(['categorias', 'editar', categoria.id]);
  }
}
