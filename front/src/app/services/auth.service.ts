import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private http: HttpClient) { }
  public login(user){
    return this.http.post('http://172.16.8.172:3000/api/login', user);
  }
  public contact(user){
    return this.http.get('http://172.16.8.172:3000/api/contact', this.headers);
  }
  
}
