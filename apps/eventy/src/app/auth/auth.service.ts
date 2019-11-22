import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: IUser

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>('/api/auth/login', {email: email, password: password})
      .pipe(
        map((response) => {
          if (response.message) return false;
          else {
            this.user = response;
            return true;
          }
        })
      );
  }

  public signup(email: string, password: string): Observable<boolean> {
    return this.http.post<any>('/api/auth/signup', {email: email, password: password})
      .pipe(
        map((response) => {
          if (response.message) return false;
          else {
            this.user = response;
            return true;
          }
        })
      );
  }

  public logout() {
    this.user = undefined;
    this.router.navigate(['/']);
  }

  public get User() {
    return this.user;
  }

  public get AuthStatus(): boolean {
    return this.user !== undefined;
  }

}