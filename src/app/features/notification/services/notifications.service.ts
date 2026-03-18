import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

    private readonly httpclient = inject(HttpClient);

  getNotifications(): Observable<any> {
    return this.httpclient.get(environment.baseurl + `/notifications?page=1`);
  }
  getUnreadCount(): Observable<any>{
    return this.httpclient.get(environment.baseurl + `/notifications/unread-count`)
  }
  markNotifacationAsRead(notificationId:string):Observable<any>{
    return this.httpclient.patch(environment.baseurl + `/notifications/${notificationId}/read`,null)
  }
  markAllAsRead():Observable<any>{
    return this.httpclient.patch(environment.baseurl+`/notifications/read-all`,null)
  }
  
  
}
