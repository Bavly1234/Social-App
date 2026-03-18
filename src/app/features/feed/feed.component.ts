import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { FeedContentComponent } from './components/feed-content/feed-content.component';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [RouterLink, FeedContentComponent, SideLeftComponent, SideRightComponent, CreatePostComponent, RouterOutlet,NgClass,RouterLinkActive],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
showFriends: boolean = false;

}
