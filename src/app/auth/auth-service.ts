import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  RefreshToken: string;
  expiresin: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, ) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe7NuCbFnECQ9Q_rLoljK_mPcl2PWwlzU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(errorResponse => {
        let errorMessage = 'An anknowm error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'This error already exists';
        }
        return throwError(errorMessage);
      }));
      //we dont subscribe here, we do it in the conponent
  }
}
