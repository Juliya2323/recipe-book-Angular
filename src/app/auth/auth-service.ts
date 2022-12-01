import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  RefreshToken: string;
  expiresin: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe7NuCbFnECQ9Q_rLoljK_mPcl2PWwlzU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError));
      //we dont subscribe here, we do it in the conponent
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDe7NuCbFnECQ9Q_rLoljK_mPcl2PWwlzU',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An anknowm error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'This error already exists';
            break;
          case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist';
            break;
          case 'INVALID_PASSWORD': errorMessage = 'This password is invalid';
            break;
        }
        return throwError(errorMessage);
  }

}
