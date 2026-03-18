import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotpasswordComponent } from './features/forgotpassword/forgotpassword.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { FeedContentComponent } from './features/feed/components/feed-content/feed-content.component';
import { MyPostsComponent } from './features/feed/components/my-posts/my-posts.component';
import { SavedComponent } from './features/feed/components/saved/saved.component';
import { CommunityComponent } from './features/feed/components/community/community.component';
import { ChangePasswordComponent } from './features/changepassword/changepassword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },

  {
    path: '', component: AuthLayoutComponent, canActivate: [guestGuard], children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgotpasswordComponent },
    ]
  },

  {
    path: '', component: MainLayoutComponent, canActivate: [authGuard], children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'change', component: ChangePasswordComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'post-details/:id', component: PostDetailsComponent },

      {
  path: 'feed', component: FeedComponent, children: [
    { path: '', component: FeedContentComponent },
    { path: 'my-posts', component: MyPostsComponent },
    { path: 'saved', component: SavedComponent },
    { path: 'community', component: CommunityComponent },
  ]
},
    ]
  },

  { path: '**', component: NotfoundComponent }
];