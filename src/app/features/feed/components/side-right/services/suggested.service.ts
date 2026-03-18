import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestedService {
  private readonly httpclient = inject(HttpClient);
  
getSuggested(page: number = 1): Observable<any> {
  return this.httpclient.get(
    environment.baseurl + `/users/suggestions?page=${page}&limit=50`,
  );
}
followUser(userId: string): Observable<any> {
  return this.httpclient.put(`https://route-posts.routemisr.com/users/${userId}/follow`, {});
}

  
}
