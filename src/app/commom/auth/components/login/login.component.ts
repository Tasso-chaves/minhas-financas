import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;
  public authLogin!: Login;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }
    )
  }

  login(){
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.authLogin.email = this.authLogin.email.toLowerCase();

    console.log(this.authLogin);

    this.authenticationService.loginAuth({email: this.authLogin.email, senha: this.authLogin.senha})
    .subscribe((user) =>{
        if(user?.id){
          this.router.navigateByUrl('dashboard');
        }
      },
      (error) =>{
        this._snackBar.open('Ocorreu um erro no login!');
      }
    );

  }

  sair(){
    this.authenticationService.sairAuth();
    this.router.navigate(['auth', 'login']);
  }

}
