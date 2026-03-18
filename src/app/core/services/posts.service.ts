import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpclient = inject(HttpClient);


  getAllPosts(): Observable<any> {
    return this.httpclient.get(environment.baseurl + `/posts/feed?only=following&limit=50`);
  }

  createPost(data: object): Observable<any> {
    return this.httpclient.post(environment.baseurl + `/posts`, data);
  }

  getSinglePost(postId: string): Observable<any> {
    return this.httpclient.get(environment.baseurl + `/posts/${postId}`);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpclient.delete(environment.baseurl + `/posts/${postId}`);
  }

  updatePost(postId: string, formData: FormData): Observable<any> {
    return this.httpclient.put(
      environment.baseurl + `/posts/${postId}`,
      formData
    );
  }
  savePost(postId: string): Observable<any> {
    return this.httpclient.put(environment.baseurl + `/posts/${postId}/bookmark`, {});
  }
  likePost(postId: string): Observable<any> {
    return this.httpclient.put(
      environment.baseurl + `/posts/${postId}/like`,
      {}
    );
  }

  getPostLikes(postId: string): Observable<any> {
  return this.httpclient.get(
    environment.baseurl + `/posts/${postId}/likes?page=1`
  );
}
getCommunityPosts(page: number = 1): Observable<any> {
  return this.httpclient.get(environment.baseurl + `/posts?page=${page}&limit=10`);
}
sharePost(postId: string, body?: string): Observable<any> {
  return this.httpclient.post(environment.baseurl + `/posts/${postId}/share`,  body );
}

}
