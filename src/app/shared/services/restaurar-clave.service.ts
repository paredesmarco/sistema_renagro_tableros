import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurarClaveService {

  constructor(private http: HttpClient) { }
  
  urlService= environment.getUserRecoveryPass;  

  getRecoveryPass(usuario: String,token: String) {
    const headers= new HttpHeaders({
      'Conten-Type': 'application/json'    
    })    
    const data = {
      usr_usuario: usuario,
      callback_url: window.location.href
    }    
    return this.http.post<any>(this.urlService, data,{headers: headers});
  }

}
