import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActualizarClaveService {

   constructor(private http: HttpClient) { }
   
   urlService= environment.getUserUpdatePass;  
 
   getUpdatePass(usuario: String,usrpass: String,usrpasstemp:String) {
     const headers= new HttpHeaders({
       'Conten-Type': 'application/json'    
     })    
     const data = {
       usr_usuario: usuario,
       usr_pass: usrpass,
       usr_pass_temp: usrpasstemp

     }     
     return this.http.post<any>(this.urlService, data,{headers: headers});
   }
}
