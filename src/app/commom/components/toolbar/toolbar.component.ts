import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  menu: any[] = [
    {descricao: 'Dashboard', rota: 'dashboard'},
    {descricao: 'Categorias', rota: 'categorias'},
    {descricao: 'Entradas', rota: 'entradas'}
  ]
}
