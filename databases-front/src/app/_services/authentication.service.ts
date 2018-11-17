import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Publicevent } from '../_services/publicevent';
import { Privateevent } from '../_services/privateevent';
import { Rsoevent } from '../_services/rsoevent';
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    user: any;
    
    private headers = new HttpHeaders().set('Content-Type', 'application/json'); 

    constructor(private http: HttpClient) { }

    // Store user info in local storage
    storeUser(user){
        sessionStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    getEvents(){
        return this.http.get('http://localhost:8080/api/' + this.user + '/get-events', {headers:this.headers});
    }

    getPublicEvents(){
        return this.http.get('http://localhost:8080/api/' + this.user + '/get-pub-events', {headers:this.headers});
    }

    getComments(){
        return this.http.get('http://localhost:8080/api/get-comments', {headers:this.headers});
    }

    deleteComment(time, loc){
        return this.http.post('http://localhost:8080/api/' + this.user + '/delete-comment', {"time": time, "loc": loc}, {headers:this.headers});
    }

    getAllRSOs(){
        return this.http.get('http://localhost:8080/api/list-all-rso', {headers:this.headers});
    }

    getYourRSOs(){
        return this.http.get('http://localhost:8080/api/' + this.user + '/get-my-rso', {headers:this.headers});
    }

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

    createPublicEvent(event: Publicevent){
        return this.http.post('http://localhost:8080/api/' + this.user + '/create-rso-event', event, {headers:this.headers});
    }

    createPrivateEvent(event: Privateevent){
        return this.http.post('http://localhost:8080/api/' + this.user + '/create-rso-event', event, {headers:this.headers});
    }

    createRSOEvent(event: Rsoevent){
        return this.http.post('http://localhost:8080/api/' + this.user + '/create-rso-event', event, {headers:this.headers});
    }

    createRSO(rso){
        return this.http.post('http://localhost:8080/api/' + this.user + '/create-rso', rso, {headers:this.headers});
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