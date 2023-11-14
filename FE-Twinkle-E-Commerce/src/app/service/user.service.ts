import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UpdateUserDTO } from '../dtos/user/update.dto';
import { LoginResponse } from '../responses/user/login.response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsers = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept-Language' : 'vi'
    });
  }

  private apiConfig = {
    headers: this.createHeaders(),
  }
  
  // Gọi api register
  private apiRegister = `${environment.apiBaseUrl}/users/register`;

  

  register(registerDTO: RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  // Gọi api login
  private apiLogin = `${environment.apiBaseUrl}/users/login`;


  login(loginDTO: any): Observable<any>{
    debugger
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }


  // Gọi api update user
  private apiUpdateUser = `${environment.apiBaseUrl}/users/update`;

  updateUser(updateUserDTO: any): Observable<any>{
    debugger
    return this.http.put(this.apiUpdateUser, updateUserDTO, this.apiConfig);
  }


  // Gọi api change password
  private apiChangePassword = `${environment.apiBaseUrl}/users/change-password`;

  changePassword(loginUserDTO: LoginDTO): Observable<any>{
    debugger
    return this.http.post(this.apiChangePassword, loginUserDTO, this.apiConfig);
  }


  saveUserResponseToLocalStorage(userResponse?: LoginResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage():LoginResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user'); 
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);  
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }

  getUsers(keyword:string, phoneNumber: string,
    selectedRole: number,
    page: number, limit: number): Observable<any[]>{
      debugger
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('phone_number', phoneNumber)
    .set('role_id', selectedRole.toString())
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any[]>(`${this.apiUsers}/get-all-users-by-admin`, {params});
}


deleteUsers(selectedIds: number[]): Observable<any>{
  debugger
  const options = {
      body: { ids: selectedIds }
    };
  return this.http.delete(`${environment.apiBaseUrl}/users/`, options);
}
  



}
