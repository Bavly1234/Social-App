import { Component, inject, OnInit, ViewChild, ElementRef, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  userName: string = '';
  userPhoto: string = '';

  saveFile?: File;
  imgURL: string | ArrayBuffer | null | undefined;
  content: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');

  postCreated = output<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('socialUser')! || "")?.name;
    this.userPhoto = JSON.parse(localStorage.getItem('socialUser')! || "")?.photo;
  }

  changeImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.saveFile = input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.imgURL = e.target?.result;
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

    if (this.content.value) formData.append('body', this.content.value);
    if (this.privacy.value) formData.append('privacy', this.privacy.value);
    if (this.saveFile) formData.append('image', this.saveFile);

    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.content.reset();
          this.privacy.reset('public');
          this.removeImage();
          this.postCreated.emit();
        }
      },
      error: (err) => console.log('Error creating post', err)
    });
  }


}