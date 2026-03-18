import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostCardComponent } from '../../post-card/post-card.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-saved',
  imports: [CreatePostComponent, PostCardComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
})
export class SavedComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  postList: Post[] = [];
  userId: string = '';

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')! || "")?._id;
    this.getSavedPosts();
  }

getSavedPosts(): void {
  const feed$ = this.postsService.getAllPosts();
  const community$ = this.postsService.getCommunityPosts();
//! i use forkJoin(FROM AI I DONT KNOW IT BEFORE) because there is no api endpoint for getting saved posts, so i need to get all posts from both feed and community and then filter them by bookmarked === true
  forkJoin([feed$, community$]).subscribe({
    next: ([feedRes, communityRes]) => {
      const allPosts = [...feedRes.data.posts, ...communityRes.data.posts];

      const unique = allPosts.filter(
        (post, index, self) => index === self.findIndex(p => p._id === post._id)
      );

      this.postList = unique.filter((post: any) => post.bookmarked === true);
    },
    error: (err) => console.log(err)
  });
}
  onPostDeleted(postId: string): void {
    this.postList = this.postList.filter(p => p._id !== postId);
  }
}