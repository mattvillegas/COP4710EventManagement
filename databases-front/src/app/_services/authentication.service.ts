import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {

    user: any;
    
    private headers = new HttpHeaders().set('Content-Type', 'application/json'); 

    constructor(private http: HttpClient) { }

    loginUser(user){
        return this.http.post('http://localhost:8080/api/users/login', user, {headers:this.headers});
    }

    registerStudent(user){
        return this.http.post('http://localhost:8080/api/users/student-create', user, {headers:this.headers});
    }

    registerSuper(user){
        return this.http.post('http://localhost:8080/api/users/superadmin-create', user, {headers:this.headers});
    }

    registerAdmin(user){
        return this.http.post('http://localhost:8080/api/users/admin-create', user, {headers:this.headers});
    }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    getUsers() {
        return this.http.get('http://localhost:8080/api/students');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}