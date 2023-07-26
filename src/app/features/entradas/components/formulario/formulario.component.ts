import { EntradaModel } from './../../models/entrada.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/features/categorias/models/categoria.model';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { EntradasService } from '../../service/entradas.service';
import * as dayjs from 'dayjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  tipoEntradas = [
    'receita',
    'despesa'
  ];

  statusPagamento = [
    {value: true, descricao: 'Pago'},
    {value: false, descricao: 'Pendente'}
  ]

  categorias: CategoriaModel[] = [];
  formEntradas!: FormGroup;
  rota: string = '';
  id: string = '';
  entrada!: EntradaModel;
  estaCriando: boolean = false;

  constructor(private readonly categoriaService: CategoriaService,
    private readonly entradasService: EntradasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute){
  }

  ngOnInit(): void {
    this.criarFormuladrio();
    this.buscarCategorias();

    this.rota = this.activeRouter.snapshot.url[0].path;

    if(this.rota === 'editar'){
      this.id = this.activeRouter.snapshot.url[1].path;
      this.buscarEntradaPeloId();
    }else{
      this.estaCriando = true;
    }
  }

  buscarEntradaPeloId(){
    this.entradasService.getEntradasPeloId(+this.id)
    .subscribe((entrada: EntradaModel) => {
      this.entrada = entrada;

      console.log(this.entrada);

      const data = this.entrada.data.split('-');

      this.formEntradas.controls['nome'].setValue(this.entrada.nome);
      this.formEntradas.controls['valor'].setValue(this.entrada.valor);
      this.formEntradas.controls['categoriaId'].setValue(this.entrada.categoriaId);
      this.formEntradas.controls['pago'].setValue(this.entrada.pago);
      this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);
      this.formEntradas.controls['data'].setValue(new Date(+data[2], +data[1], +data[0]));
    });
  }

  buscarCategorias(){
    this.categoriaService.getCategorias().subscribe((categorias: CategoriaModel[]) =>{
      this.categorias = categorias;
    });
  }

  criarFormuladrio(){
    this.formEntradas = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],
      tipo: ['despesa', Validators.required],
      data: [new Date(), Validators.required]
    });
  }

  salvarEntrada(){
    const data = dayjs(this.formEntradas.controls['data'].value).format('DD-MM-YYYY');

    const payloadRequest: EntradaModel = Object.assign('', this.formEntradas.getRawValue());

    payloadRequest.data = data;

    const payload: EntradaModel = {
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor
    }

    if(this.estaCriando){
      this.criarNovaEntrada(payload);
    }else{
      payload.id = this.entrada.id;
      this.editarEntrada(payload);
    }

  }

  criarNovaEntrada(payload: EntradaModel){
    this.entradasService.criarEntrada(payload)
    .subscribe(resposta =>{
      console.log('OK');
      this.redirecionar();
    });
  }
  editarEntrada(payload: EntradaModel){
    this.entradasService.editarEntrada(payload)
    .subscribe(resposta =>{
      console.log('OK');
      this.redirecionar();
    });
  }

  redirecionar(){
    this.router.navigate(['entradas']);
  }
}
