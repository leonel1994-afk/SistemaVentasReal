import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';
import { ApiclienteService } from './services/apicliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario?: Usuario;

  constructor(public apiauthService: ApiauthService,
               private router: Router
    
    ){
      //nos sucribirmos a la part obserbable del usuario
      //se genera en cambio cuando me logeo y deslogeo gracias subscribe
      this.apiauthService.usuario.subscribe(res =>{
        this.usuario = res;
        console.log('cambio el objeto' + res);

      });

  }

  logout(){
    this.apiauthService.logout();
    this.router.navigate(['/login']);
   ;
  }
}
