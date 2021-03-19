import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from "../models/response";
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';

const httpOption = {
    //mandar los encabezados
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})

export class ApiauthService{
    url: string ='https://localhost:44302/api/User/login';

    private usuarioSubject: BehaviorSubject<Usuario>;
    public usuario: Observable<Usuario>;

    public get usuarioData(): Usuario{
        return this.usuarioSubject.value;
    }

    constructor( private _http: HttpClient){
        //BehaviorSubject obtiene del localStorage el usuario
        this.usuarioSubject =new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
        this.usuario = this.usuarioSubject.asObservable();
    }

    login(login: Login): Observable<Response> {
        return this._http.post<Response>(this.url, login, httpOption).pipe(
            map(res => {
                //si la sesion es un exito me regresa un 1
                if (res.exito == 1) {
                    //obtengo los datos
                    const usuario: Usuario = res.data;
                    //lo guardo en el localstorage
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    //detecto cuando hay un cambio con next del usuario cuando esta suscrito (logeo y cerrar sesion)
                    this.usuarioSubject.next(usuario);
                }
                return res;
            })
        );
    }

    logout():void {
        
        localStorage.removeItem('usuario');
        this.usuarioSubject.next( null!);
       // this.usuarioSubject =new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
    }
}
