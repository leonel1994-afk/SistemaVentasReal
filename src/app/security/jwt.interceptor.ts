import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiauthService } from "../services/apiauth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private apiauthService: ApiauthService){

    }
//por ser observable pide que se cumpla un contrato
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const usuario = this.apiauthService.usuarioData;
        //si el usuario exite
        if (usuario) {
            //hay sesion y le anexamos a los header con authorization 
            request = request.clone({
                setHeaders: {
                    //en bearer mandamos el token que tendria el usuario
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }
//siempre cuando iniciaemos sesion el reques t se va a clonar y sino se manda tal cual
        return next.handle(request);
    }
}