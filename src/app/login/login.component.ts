import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from "../services/apiauth.service";
//para los formularios reactivos FormGroup tiene un formcontrol 
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl:  './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm = this.formBuilder.group({
    email: ['', Validators.required], 
    password: ['', Validators.required]
  });
    //email: new FormControl(''),
    //password: new FormControl('')
  //});

  constructor(public apiauthService: ApiauthService,
    private router: Router,
    private formBuilder: FormBuilder
  
    ){
      
     // if (this.apiauthService.usuarioData) {
       // this.router.navigate(['/']);
     // }
}
  ngOnInit() {
  }

  login():void{
    //trae los elementos del formcontrol
    this.apiauthService.login(this.loginForm.value).subscribe(response => {
        console.log(this.loginForm.value);
        if(response.exito == 1){
          this.router.navigate(['/']);
        }
    });
}
}
