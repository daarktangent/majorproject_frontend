import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API=environment.apiURL;

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private httpclient: HttpClient,
    private userAuthService:UserAuthService
    ) { }

  public login(loginData:any){
    return this.httpclient.post(this.PATH_OF_API + "/authenticate",loginData, { headers: this.requestHeader });
  }

  public forUser(){
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {responseType:'text',});
  }

  public forAdmin(){
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {responseType:'text',});
  }

  // public forTA(){
  //   console.log(this.PATH_OF_API+"/forTA");
  //   return this.httpclient.get(this.PATH_OF_API + '/forTA', {responseType:'text',});
  // }

  public createNewUser(userData: any){
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', userData);
  }

   public createNewTa(userData: any){
    return this.httpclient.post(this.PATH_OF_API + '/registerNewTA', userData);
  }

  public roleMatch(allowedRoles :any) :boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles)
    {
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++)
        {
          if(userRoles[i].roleName === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          }
          else{
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}

