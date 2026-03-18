import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ProfileService } from './services/profile.service';
import { RouterLink } from "@angular/router";
import { PostCardComponent } from "../feed/post-card/post-card.component";
import { Post } from '../../core/models/post.interface';
import { profile } from './interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, NgClass, RouterLink, PostCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(ProfileService);

  user!: profile;
  userId: string = '';
  activeTab: 'posts' | 'saved' = 'posts';
  postList: Post[] = [];
  savedList: Post[] = [];

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser') || '{}')?._id;
    this.getUserProfile();
    this.getUserPosts();
    this.getBookmarks();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (res) => this.user = res.data.user,
      error: (err) => console.log(err)
    });
  }

  getUserPosts(): void {
    this.userService.getUserPosts(this.userId).subscribe({
      next: (res) => this.postList = res.data.posts,
      error: (err) => console.log(err)
    });
  }

  getBookmarks(): void {
    this.userService.getBookmarks().subscribe({
      next: (res) => {
        this.savedList = (res.data.bookmarks as any[]).map(post => ({
          ...post,
          image: post.image || '',
          body: post.body || '',
          isLiked: false,
          isLikeLoading: false,
          bookmarked: true,
        }));
      },
      error: (err) => console.log(err)
    });
  }

  onPostDeleted(postId: string): void {
    this.postList = this.postList.filter(p => p._id !== postId);
  }

  onPostUpdated(updatedPost: Post): void {
    const index = this.postList.findIndex(p => p._id === updatedPost._id);
    if (index !== -1) this.postList[index] = updatedPost;
  }



onPhotoChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  this.userService.uploadProfilePhoto(file).subscribe({
    next: (res) => {
      this.user.photo = res.data.photo;
    },
    error: (err) => console.log(err)
  });
}
}