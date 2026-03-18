// import { Component, inject } from '@angular/core';
// import { SuggestedService } from './services/suggested.service';
// import { Suggest } from './interfaces/suggest.interface';

// @Component({
//   selector: 'app-side-right',
//   imports: [],
//   templateUrl: './side-right.component.html',
//   styleUrl: './side-right.component.css',
// })
// export class SideRightComponent {
//   private readonly suggestService = inject(SuggestedService)
//   suggestList: Suggest[] = [];

//   ngOnInit(): void {
//     this.getSuggests();
//   }

//   getSuggests(): void {
//     this.suggestService.getSuggested().subscribe({
//       next: (res) => {
//         console.log(res);
//         this.suggestList = res.data.suggestions;
//       },
//       error: (err) => {
//         console.log(" Error in get suggestions", err);
//       }
//     })
// }

// }












// import { Component, inject } from '@angular/core';
// import { SuggestedService } from './services/suggested.service';
// import { Suggest } from './interfaces/suggest.interface';

// @Component({
//   selector: 'app-side-right',
//   imports: [],
//   templateUrl: './side-right.component.html',
//   styleUrl: './side-right.component.css',
// })
// export class SideRightComponent {
//   private readonly suggestService = inject(SuggestedService);
//   suggestList: Suggest[] = [];
//   currentPage = 1;
//   isLoading = false;
//   hasMore = true;

//   ngOnInit(): void {
//     this.getSuggests();
//   }

//   getSuggests(): void {
//     if (this.isLoading || !this.hasMore) return;
    
//     this.isLoading = true;
    
//     this.suggestService.getSuggested(this.currentPage).subscribe({
//       next: (res) => {
//         const newSuggestions = res.data.suggestions;
        
//         this.suggestList = [...this.suggestList, ...newSuggestions];
        
//         if (newSuggestions.length < 5) {
//           this.hasMore = false;
//         }
        
//         this.currentPage++;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.log('Error in get suggestions', err);
//         this.isLoading = false;
//       }
//     });
//   }
// }















// import { Component, inject } from '@angular/core';
// import { SuggestedService } from './services/suggested.service';
// import { Suggest } from './interfaces/suggest.interface';
// import { NgClass } from '@angular/common';

// @Component({
//   selector: 'app-side-right',
//   imports: [NgClass],
//   templateUrl: './side-right.component.html',
//   styleUrl: './side-right.component.css',
// })
// export class SideRightComponent {
//   private readonly suggestService = inject(SuggestedService);
//   suggestList: Suggest[] = [];
//   currentPage = 1;
//   isLoading = false;
//   hasMore = true;
//   followingIds = new Set<string>(); 
//   followLoadingIds = new Set<string>();

//   ngOnInit(): void {
//     this.getSuggests();
//   }

//   getSuggests(): void {
//     if (this.isLoading || !this.hasMore) return;

//     this.isLoading = true;

//     this.suggestService.getSuggested(this.currentPage).subscribe({
//       next: (res) => {
//         const newSuggestions = res.data.suggestions;
//         this.suggestList = [...this.suggestList, ...newSuggestions];

//         if (newSuggestions.length < 5) {
//           this.hasMore = false;
//         }

//         this.currentPage++;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.log('Error in get suggestions', err);
//         this.isLoading = false;
//       }
//     });
//   }

//   followUser(userId: string): void {
//     if (this.followLoadingIds.has(userId)) return; 

//     this.followLoadingIds.add(userId);

//     this.suggestService.followUser(userId).subscribe({
//       next: () => {
//         this.followingIds.add(userId); 
//         this.followLoadingIds.delete(userId);

//         setTimeout(() => {
//           this.suggestList = this.suggestList.filter(s => s._id !== userId);
//         }, 800);
//       },
//       error: (err) => {
//         console.log('Error following user', err);
//         this.followLoadingIds.delete(userId);
//       }
//     });
//   }

//   isFollowing(userId: string): boolean {
//     return this.followingIds.has(userId);
//   }

//   isFollowLoading(userId: string): boolean {
//     return this.followLoadingIds.has(userId);
//   }
// }
























import { Component, inject } from '@angular/core';
import { SuggestedService } from './services/suggested.service';
import { Suggest } from './interfaces/suggest.interface';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-right',
  imports: [NgClass,FormsModule],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent {
  private readonly suggestService = inject(SuggestedService);
  suggestList: Suggest[] = [];
  currentPage = 1;
  isLoading = false;
  hasMore = true;


  ngOnInit(): void {
    this.getSuggests();
  }

  getSuggests(): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;

    this.suggestService.getSuggested(this.currentPage).subscribe({
      next: (res) => {
        const newSuggestions = res.data.suggestions;
        this.suggestList = [...this.suggestList, ...newSuggestions];

        if (newSuggestions.length < 5) this.hasMore = false;

        this.currentPage++;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error in get suggestions', err);
        this.isLoading = false;
      }
    });
  }

  followUser(suggest: Suggest): void {
    if (suggest.isFollowLoading) return;

    suggest.isFollowLoading = true; 

    this.suggestService.followUser(suggest._id).subscribe({
      next: () => {
        suggest.isFollowing = true;     
        suggest.isFollowLoading = false;

        setTimeout(() => {
          this.suggestList = this.suggestList.filter(s => s._id !== suggest._id);
        }, 800);
      },
      error: (err) => {
        console.log('Error following user', err);
        suggest.isFollowLoading = false;
      }
    });
  }



searchTerm: string = '';

get filteredList(): Suggest[] {
  if (!this.searchTerm.trim()) return this.suggestList;
  return this.suggestList.filter(s =>
    s.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    s.username?.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
}