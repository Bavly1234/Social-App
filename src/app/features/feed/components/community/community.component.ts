import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostCardComponent } from '../../post-card/post-card.component';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-community',
  imports: [CreatePostComponent, PostCardComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit {
   private readonly postsService = inject(PostsService);
  postList: Post[] = [];
  userId: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;
  isLoading: boolean = false;

  @ViewChild('loadMoreRef') loadMoreRef!: ElementRef;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')! || '')?._id;
    this.getAllPosts();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && this.hasMore && !this.isLoading) {
        this.getAllPosts();
      }
    });

    observer.observe(this.loadMoreRef.nativeElement);
  }

  getAllPosts(): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;

    this.postsService.getCommunityPosts(this.currentPage).subscribe({
      next: (res) => {
        const newPosts = res.data.posts;
        this.postList = [...this.postList, ...newPosts];

        if (newPosts.length < 10) this.hasMore = false;

        this.currentPage++;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error fetching posts', err);
        this.isLoading = false;
      }
    });
  }

  onPostDeleted(postId: string): void {
    this.postList = this.postList.filter(p => p._id !== postId);
  }

  onPostShared(newPost: Post): void {
    this.postList.unshift(newPost);
  }
}