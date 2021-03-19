import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
//nos aseguramos que el response es el de nuetro interface
import { Response } from '../models/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from "@angular/material/dialog";
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  //variable para el resultado de nuestra solicitud
  //variable para el resultado de nuestra solicitud

  public lst: any[]=[];
  public columnas: string[]=['id','nombre','actions'];
  readonly width: string= '300px';

  //el servicio lo vamos a inyectar en el constructor
  constructor(
    private apiCliente:ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ){
  }
  ngOnInit(): void {
    this.getClientes();
  }

    getClientes(){
    this.apiCliente.getClientes().subscribe( response =>{
    this.lst=response.data;

    //si teneoms el metodo observable utilizamos subscribe
   // apiCliente.getClientes().subscribe( response =>{
     // console.log(response);

    });
    
    
   }

openAdd(){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
    width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
        this.getClientes();
    });
  console.log('hola');
}
  
openEdit(cliente: Cliente){
  const dialogRef = this.dialog.open(DialogClienteComponent, {
    width: this.width, 
    data: cliente
    });
    dialogRef.afterClosed().subscribe(result =>{
        this.getClientes();
    });
  
}

delet(cliente: Cliente){
  const dialogRef = this.dialog.open(DialogDeleteComponent, {
    width: this.width
    
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiCliente.delete(cliente.id).subscribe(response =>{
            if(response.exito === 1){
                this.snackBar.open('Cliente eliminado con exito', '',{
                  duration: 2000
                });
                this.getClientes();
              }
          });
        }
        
    });
}
}
