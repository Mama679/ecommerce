import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import { URL_SERVICIO } from 'src/app/config/config';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router: Router
    ) { }

  login(email:string, password: string){
    let url = URL_SERVICIO + "user/login";
    return this.http.post(url,{email,password}).pipe(
      map((resp:any) =>{
        if(resp.usuario && resp.usuario.token){
          return this.localStoregeSave(resp.usuario);
        }
        else{
          return resp;
        }
      }),
      catchError((error: any) =>{
        console.log(error);
        return of(error);
      })
    );
  }

  localStoregeSave(usuario: any){
    localStorage.setItem("token",usuario.token);
    localStorage.setItem("user",JSON.stringify(usuario.user));
    return true;
  }

  registro(data:any){
    let url = URL_SERVICIO + "user/register";
    return this.http.post(url,data);
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(["auth/login"]);
  }
}


