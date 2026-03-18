import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostCardComponent } from '../../post-card/post-card.component';


@Component({
  selector: 'app-my-posts',
  imports: [CreatePostComponent, PostCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  postList: Post[] = [];
  userId: string = '';

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')! || "")?._id;
    this.getMyPosts();
  }

getMyPosts(): void {
  this.postsService.getAllPosts().subscribe({
    next: (res) => {
      this.postList = res.data.posts.filter(
        (post: Post) => post.user._id === this.userId
      );
    },
    error: (err) => console.log('Error fetching posts', err)
  });
}

  onPostDeleted(postId: string): void {
    this.postList = this.postList.filter(p => p._id !== postId);
  }
  onPostShared(newPost: Post): void {
  this.postList.unshift(newPost);
}
}