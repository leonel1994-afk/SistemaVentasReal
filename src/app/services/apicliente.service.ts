import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//nos aseguramos que el response es el de nuetro interface
import { Response } from '../models/response';
import { Cliente } from '../models/cliente';

const httpOption = {
  //mandar los encabezados
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
 

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string ="https://localhost:44302/api/cliente";

  constructor(
    private _http: HttpClient
  ) { }

  getClientes(): Observable<Response>{
      return this._http.get<Response>(this.url);

   }

   add(cliente: Cliente): Observable<Response>{
     return this._http.post<Response>(this.url, cliente, httpOption);
   }

   edit(cliente: Cliente): Observable<Response>{
    return this._http.put<Response>(this.url, cliente, httpOption);
  }

  delete(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
}
