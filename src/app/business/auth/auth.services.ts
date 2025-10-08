import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  tokenUrl = environment.HOST_API + environment.HOST_API_TOKEN;
  getToken(dataUser: any) {
    const userApli = environment.USER_APP;
    const passApli = environment.PASS_APP;
    const data = {
      user: dataUser.usuario,
      password: dataUser.password,
      ipLan: '127.0.0.1',
      ipWan: '127.0.0.1',
      apliId: environment.ID_APP,
    };
    console.log(JSON.stringify(data));
    console.log(userApli + ':' + passApli);
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + window.btoa(userApli + ':' + passApli),
    });
    return this.http.post<any>(this.tokenUrl, data, { headers: head });
  }
}
