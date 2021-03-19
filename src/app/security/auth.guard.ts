import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';

@Injectable ({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private apiauthservice: ApiauthService
        
        ){

    }
    canActivate(route: ActivatedRouteSnapshot){
        //voy al observable del apiauthservice
        const usuario = this.apiauthservice.usuarioData;
         //si la sesion existe
        if (usuario) {
            return true; 
        }
        this.router.navigate(['/login']);
        return false;
    }
}