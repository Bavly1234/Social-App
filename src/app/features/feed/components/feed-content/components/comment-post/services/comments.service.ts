import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComment(postId: string):Observable<any>{
    return this.httpClient.get(environment.baseurl +`/posts/${postId}/comments?page=1&limit=10`);
  }

  createComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseurl + `/posts/${postId}/comments`, data);
  }
}
