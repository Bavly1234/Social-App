import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyTranslateService } from './core/services/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
      private translate = inject(TranslateService);
      private myTranslateService = inject(MyTranslateService);

  ngOnInit(): void {

     this.translate.addLangs(['ar', 'en']);
        this.translate.setFallbackLang('en');
        this.translate.use(localStorage.getItem('lang') || 'en');
        this.myTranslateService.changeDirection();
  }
  protected title = 'socialApp';

}
