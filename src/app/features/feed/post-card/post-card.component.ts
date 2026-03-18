import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommentPostComponent } from '../components/feed-content/components/comment-post/comment-post.component';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from '../../../core/models/post.interface';

@Component({
  selector: 'app-post-card',
  imports: [FormsModule, RouterLink, NgClass, CommentPostComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  private readonly postsService = inject(PostsService);

  @Input() post!: Post;       
  @Input() userId!: string;   

  @Output() postDeleted = new EventEmitter<string>();  
  @Output() postUpdated = new EventEmitter<Post>();    
@Output() postShared = new EventEmitter<Post>();

  showLikesModal = false;
  likesList: any[] = [];
  likesLoading = false;

  openEdit(post: Post): void {
    post.isEditing = true;
    post.editContent = post.body;
  }

  cancelEdit(post: Post): void {
    post.isEditing = false;
    post.editContent = '';
  }

  saveEdit(post: Post): void {
    if (!post.editContent?.trim()) return;
    const formData = new FormData();
    formData.append('body', post.editContent);

    this.postsService.updatePost(post._id, formData).subscribe({
      next: (res) => {
        if (res.success) {
          post.body = post.editContent!;
          post.isEditing = false;
          post.editContent = '';
        }
      },
      error: (err) => console.log('Error updating post', err)
    });
  }

savePost(post: Post): void {
  this.postsService.savePost(post._id).subscribe({
    next: (res) => {
      post.isSaved = res.data.bookmarked;
      post.bookmarked = res.data.bookmarked;
    },
    error: (err) => console.log(err)
  });
}

  likePost(post: Post): void {
    if (post.isLikeLoading) return;
    post.isLikeLoading = true;

    this.postsService.likePost(post._id).subscribe({
      next: (res) => {
        post.isLiked = res.data.liked;
        post.likesCount = res.data.likesCount;
        post.isLikeLoading = false;
      },
      error: (err) => {
        console.log(err);
        post.isLikeLoading = false;
      }
    });
  }

  deletePostItem(postId: string): void {
    this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        if (res.success) {
          this.postDeleted.emit(postId); 
        }
      },
      error: (err) => console.log('Error deleting post', err)
    });
  }

  openLikesModal(postId: string): void {
    this.showLikesModal = true;
    this.likesList = [];
    this.likesLoading = true;

    this.postsService.getPostLikes(postId).subscribe({
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


  isShareLoading: boolean = false;

showShareModal: boolean = false;
shareBody: string = '';

openShareModal(event: Event): void {
  event.preventDefault();
  this.showShareModal = true;
  this.shareBody = '';
}

closeShareModal(): void {
  this.showShareModal = false;
  this.shareBody = '';
}

sharePost(): void {
  this.isShareLoading = true;
  this.postsService.sharePost(this.post._id, this.shareBody).subscribe({
next: (res) => {
  this.isShareLoading = false;
  const body = this.shareBody?.trim() || ' ';
  this.post.sharesCount++;
  this.postShared.emit(res.data.post);
  this.closeShareModal();
},
    error: (err) => {
      this.isShareLoading = false;
      console.log(err);
    }
  });
}
}