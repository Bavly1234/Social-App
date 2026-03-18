import { Component, inject } from '@angular/core';
import { SuggestedService } from '../side-right/services/suggested.service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-side-left',
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css',
})
export class SideLeftComponent {

}
