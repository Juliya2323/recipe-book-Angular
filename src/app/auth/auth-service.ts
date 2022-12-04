import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  RefreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // user = new Subject<User>(); is this TOKEN???
  // below it's a BehaviorSubject which allows to track each value, null is a starting value;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe7NuCbFnECQ9Q_rLoljK_mPcl2PWwlzU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn);
      }));
      //we dont subscribe here, we do it in the conponent
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDe7NuCbFnECQ9Q_rLoljK_mPcl2PWwlzU',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(responseData => {
       this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn);
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
          email,
          userId,
          token,
          expirationDate
          );
        this.user.next(user);
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
