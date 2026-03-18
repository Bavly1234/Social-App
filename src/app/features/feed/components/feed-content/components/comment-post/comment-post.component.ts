import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comments.interface';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-post',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  commentsList: Comment[] = []

userPhoto: string = '';

  @Input() postId: string = "";
  userId: string = "";
  saveFile?: File
  imgURL: string | ArrayBuffer | null | undefined
  content: FormControl = new FormControl('');
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    console.log('postId:', this.postId);
    this.getCommentPost();
    this.userPhoto = JSON.parse(localStorage.getItem('socialUser')! || "")?.photo;

  }


  getCommentPost(): void {
    console.log('postId:', this.postId);

    this.commentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        console.log("response", res);
        this.commentsList = res.data.comments;
      },
      error: (err) => {
        console.log("Error", err);
      }
    });
  }


  changeImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      this.saveFile = input.files[0]

      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.imgURL = e.target?.result
      };

    }
  }



  removeImage(): void {
    this.imgURL = null;
    this.saveFile = undefined;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }


    submitForm(e: Event): void {
      e.preventDefault();
      const formData = new FormData();

      if (this.content.value) {
        formData.append('content', this.content.value);
      }

      if (this.saveFile) {
        formData.append('image', this.saveFile!);
      }

      this.commentsService.createComment(this.postId, formData).subscribe({
        next: (res) => {
          console.log("response in creating comment", res);
          if (res.success) {
            this.content.reset();
            this.removeImage();
            this.getCommentPost();
          }
        },
        error: (err) => {
          console.log("Error in creating comment", err);
        }
      })
    }

  }


