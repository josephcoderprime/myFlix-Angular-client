import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixofficial.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   *
   * @param http
   * @param router
   */
  constructor(private http: HttpClient, private router: Router) { }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * API call to register new user account
   * @param userDetails
   * @returns
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.userRegistrationHandleError)
    );
  }

  /**
   * Handles errors to register new user account
   * @param error
   * @returns
   */
  private userRegistrationHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    if (error.status === 400) {
      return throwError(`Username ${error.error}. Please login to your account`);
    } else {
      return throwError(`Error registering user, please check all required fields`);
    }
  }

  /**
   * Handles user login HTTP request
   * @param userDetails
   * @returns
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.userLoginHandleError));
  }

  /**
   * Handles errors for user login HTTP request
   * @param error
   * @returns
   */
  private userLoginHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error logging in, please try again!');
  }

  /**
   * API call to fetch all movies in database
   * @returns
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getAllMoviesHandleError)
    );

  }

  /**
   * Handles errors to fetch all movies in database
   * @param error
   * @returns
   */
  private getAllMoviesHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error extracting movie data, please contact the developer.');
  }

  /**
   * Calls API to get user account information
   * @param user
   * @returns
   */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.getUserHandleError));
  }

  /**
   * Handles errors to get user account information
   * @param error
   * @returns
   */
  private getUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error retrieving user account data, please contact the developer.');
  }

  /**
   * API call to add movie to user's list of favorites
   * @param id
   * @returns
   */
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/Movies/${id}`, id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.addFavoriteHandleError)
    );
  }

  /**
   * Handles errors to add movie to user's list of favorites
   * @param error
   * @returns
   */
  private addFavoriteHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error adding movie to favorites list, please contact the developer.');
  }

  /**
   * API call to remove movie from user's list of favorites
   * @param id
   * @returns
   */
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.removeFavoriteHandleError)
    );
  }

  /**
   * Handles errors to remove movie from user's list of favorites
   * @param error
   * @returns
   */
  private removeFavoriteHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error adding movie to favorites list, please contact the developer.');
  }

  /**
   * API call to get movie by title
   * @returns
   */
  getMovieByTitle(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getMovieByTitleHandleError)
    );
  }

  /**
   * Handles errors to get movie by title
   * @param error
   * @returns
   */
  private getMovieByTitleHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error retieving movie synopsis, please contact the developer.');
  }

  /**
   * API call to get director information
   * @returns
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getDirectorHandleError)
    );
  }

  /**
   * Handles errors to get director information
   * @param error
   * @returns
   */
  private getDirectorHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error retieving director info, please contact the developer.');
  }

  /**
   * API call to get genre information
   * @returns
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getGenreHandleError)
    );
  }

  /**
   * Handles errors to get genre information
   * @param error
   * @returns
   */
  private getGenreHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error retieving genre info, please contact the developer.');
  }

  /**
   * API call to edit user account details
   * @param userDetails
   * @returns
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.editUserHandleError)
    );
  }

  /**
   * Handles errors to edit user account details
   * @param error
   * @returns
   */
  private editUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error editing user info, please contact the developer.');
  }

  /**
   * API call to remove user account
   * @returns
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.deleteUserHandleError)
    );
  }

  /**
   * Handles errors to remove user account
   * @param error
   * @returns
   */
  private deleteUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error deleting profile, please contact the developer.');
  }
}




