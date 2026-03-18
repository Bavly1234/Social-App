import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
private readonly httpClient = inject(HttpClient);
 changePassword(password: string, newPassword: string): Observable<any> {
  return this.httpClient.patch(environment.baseurl + `/users/change-password`, { password, newPassword });
} 
}
