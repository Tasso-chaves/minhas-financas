import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

  @Input() menu!: any[];

  estaLogado: boolean = false;

  constructor(private authService: AuthenticationService){

  }
  ngOnInit(): void {
    this.authService.usuarioLogado().subscribe(
      estaLogado =>{
        this.estaLogado = estaLogado;
      }
    )
  }


}
