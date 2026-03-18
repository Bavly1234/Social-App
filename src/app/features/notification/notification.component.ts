import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { Notification } from './interfaces/notification.interface';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [NgClass, DatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {

  private readonly notificationsService = inject(NotificationsService);
  notifications: Notification[] = [];
  unread!: number

  ngOnInit() {
    this.getNotifications();
    this.getUnread();
  }

  getNotifications() {

    this.notificationsService.getNotifications().subscribe({
      next: (res) => {
        this.notifications = res.data.notifications;
        console.log(res.data.notifications);

      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    })
  }
  getUnread() {
    this.notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        console.log("Nuber of ynread:::", res);
        this.unread = res.data.unreadCount

      }, error: (err) => {
        console.log("not found count");

      }
    })
  }
  markAsRead(notif: Notification) {
    if (notif.isRead) return;

    this.notificationsService.markNotifacationAsRead(notif._id).subscribe({
      next: () => {
        this.notifications = this.notifications.map(n =>
          n._id === notif._id ? { ...n, isRead: true } : n
        );
        this.unread--;
      },
      error: (err) => console.error(err)
    });
  }
  activeFilter: 'all' | 'unread' = 'all';

  get filteredNotifications() {
    if (this.activeFilter === 'unread') {
      return this.notifications.filter(n => !n.isRead);
    }
    return this.notifications;
  }

  markAll() {
    this.notificationsService.markAllAsRead().subscribe({
      next: (res) => {
        this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
        this.unread = 0;
        console.log("All is read done", res);
        
      },
      error: (err) => console.error(err)
    });
  }
}
