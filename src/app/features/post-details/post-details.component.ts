import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.interface';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CommentPostComponent } from '../feed/components/feed-content/components/comment-post/comment-post.component';

@Component({
  selector: 'app-post-details',
  imports: [FormsModule, NgClass, CommentPostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  postId: string | null = null;
  post!: Post;
  userId: string = '';
  showComments = false;

  // likes modal
  showLikesModal = false;
  likesList: any[] = [];
  likesLoading = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')! || "")?._id;
    this.getPostIdFromRoute();
  }

  getPostIdFromRoute(): void {
    this.activatedRoute.paramMap.subscribe(urlPath => {
      this.postId = urlPath.get('id') || '';
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId: string): void {
    this.postsService.getSinglePost(postId).subscribe({
      next: (res) => {
        this.post = res.data.post;
      },
      error: (err) => console.log('Error fetching post details', err)
    });
  }

  likePost(): void {
    if (this.post.isLikeLoading) return;
    this.post.isLikeLoading = true;

    this.postsService.likePost(this.post._id).subscribe({
      next: (res) => {
        this.post.isLiked = res.data.liked;
        this.post.likesCount = res.data.likesCount;
        this.post.isLikeLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.post.isLikeLoading = false;
      }
    });
  }

  savePost(): void {
    this.postsService.savePost(this.post._id).subscribe({
      next: (res) => {
        this.post.bookmarked = res.data.bookmarked;
      },
      error: (err) => console.log(err)
    });
  }

  openLikesModal(): void {
    this.showLikesModal = true;
    this.likesList = [];
    this.likesLoading = true;

    this.postsService.getPostLikes(this.post._id).subscribe({
      next: (res) => {
        this.likesList = res.data.likes;
        this.likesLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.likesLoading = false;
      }
    });
  }

  closeLikesModal(): void {
    this.showLikesModal = false;
    this.likesList = [];
  }
}