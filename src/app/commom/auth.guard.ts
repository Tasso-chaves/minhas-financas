import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './auth/service/authentication.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const activeRoute = inject(ActivatedRoute);

  return authService.usuarioLogado().pipe(
    tap((estaLogado) =>{
      if(!estaLogado){
        router.navigateByUrl('/auth/login');
        return false;
      }else{
        return true;
      }
    })
  )

  /*
    if(!authService.usuarioLogado()){

      return false;
    }else{
      router.navigate(['auth/login']);
      return true;
    }*/
}
