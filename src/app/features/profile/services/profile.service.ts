import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  

private readonly httpClient = inject(HttpClient);
  getUserProfile(): Observable<any> {
  return this.httpClient.get(environment.baseurl + `/users/profile-data`);
}

  getUserPosts(userId: string): Observable<any> {
  return this.httpClient.get(environment.baseurl + `/users/${userId}/posts`);
}
getBookmarks(): Observable<any> {
  return this.httpClient.get(environment.baseurl + `/users/bookmarks`);
}
uploadProfilePhoto(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('photo', file);
  return this.httpClient.put(environment.baseurl + `/users/upload-photo`, formData);
}



}
