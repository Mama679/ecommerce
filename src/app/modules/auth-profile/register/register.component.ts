import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  name:string = "";
  surname:string = "";
  email:string = "";
  phone:string="";
  password:string="";
  repeat_password:string = "";
  rol:string = 'cliente';

constructor(
  public authService:AuthService,
  public router:Router
){}

  ngOnInit(): void {
    
  }

  registrar(){
    if(!this.name ||!this.surname || !this.email || !this.phone || !this.password || !this.repeat_password)
    {
      alert("Todos los campos son requeridos");
      return;
    }

    if(this.password != this.repeat_password)
    {
      alert("Contraseñas deben ser iguales");
      return;
    }

    let data = {
      name:this.name,
      surname:this.surname,
      email:this.email,
      password:this.password,
      rol:this.rol
    }

    this.authService.registro(data).subscribe((resp:any)=>{
        console.log(resp);
    });

  }

}
