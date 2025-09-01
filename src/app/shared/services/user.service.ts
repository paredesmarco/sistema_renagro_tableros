import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  urlService = environment.API_FIND_USER;
  urlServiceToken = environment.API_FIND_PROFILE_BY_TOKEN;

  getUserByCedula(cedula: String, token: String) {
    const headers = new HttpHeaders({
      'Conten-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<any>(this.urlService + cedula, { headers: headers });
  }
  perfilFindByToken(token: String) {
    const headers = new HttpHeaders({
      'Conten-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<any>(this.urlServiceToken, { headers: headers });
  }
  //CARGAR ROLES
  private roleSignal = signal<string>("");

  setRole(role: string) {
    this.roleSignal.set(role);
  }

  getRole() {
    return this.roleSignal;
  }
}
