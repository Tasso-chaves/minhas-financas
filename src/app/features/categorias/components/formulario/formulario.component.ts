import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  categoria!: CategoriaModel;
  id: string = '';
  formCategoria!: FormGroup;
  rota: String = '';
  isNovoFormulario: boolean =false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private formBuilder: FormBuilder){
  }
  ngOnInit(): void {

    this.rota = this.activateRouter.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar') {
      this.id = this.activateRouter.snapshot.url[1].path;
      this.buscarCategoriaPeloId();

    }else{
       this.isNovoFormulario = true;
    }

  }

  criarFormulario(){
    this.formCategoria = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  }

  buscarCategoriaPeloId(){
    this.categoriaService
        .getCategoriasPeloId(parseInt(this.id))
        .subscribe((categoria: CategoriaModel) => {
          this.categoria = categoria;
          this.formCategoria.controls['nome'].setValue(categoria.nome);
          this.formCategoria.controls['descricao'].setValue(
            categoria.descricao
          );
        });
  }

  salvarCategoria(){
    if(this.formCategoria.touched && this.formCategoria.dirty){

      const payload: CategoriaModel = {
        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value,
      }

      if(this.isNovoFormulario){
        this.criarCategoria(payload);
      }else{
        payload.id = this.categoria.id;
        this.editarCategoria(payload);
      }

    }
  }

  editarCategoria(payload: CategoriaModel){
    this.categoriaService.alterarCategoria(payload).subscribe(resposta =>{
      this.router.navigate(['categorias']);
   });
  }

  criarCategoria(payload: CategoriaModel){
    this.categoriaService.criarCategoria(payload).subscribe(resposta =>{
      this.router.navigate(['categorias']);
   });
  }
}
