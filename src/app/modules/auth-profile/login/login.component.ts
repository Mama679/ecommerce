import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email:string ="";
    password:string ="";

    constructor(
      public router: Router,
      public authService: AuthService
      ){

    }

    ngOnInit(): void {
      if(this.authService.user){
        this.router.navigate(['/']);
      }
    }

    login(){
      if(!this.email){
        alert("ingrese email");
        return;
      }

      if(!this.password){
        alert("Ingrese contraseña.");
        return
      }

      this.authService.login(this.email,this.password).subscribe((resp:any)=>{
        if(!resp.error && resp)
        {
          this.router.navigate(['/']);
        }
        else{
          alert(resp.error.mensaje);
        }
      });
    }
}
