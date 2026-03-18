import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';

@Component({
  selector: 'app-changelangbtn',
  imports: [],
  templateUrl: './changelangbtn.component.html',
  styleUrl: './changelangbtn.component.css',
})
export class ChangelangbtnComponent {
mytranslate = inject(MyTranslateService)
translate = inject(TranslateService)
  changeLang() {
    let currentLang = localStorage.getItem('lang')
    localStorage.setItem('lang', currentLang === 'en' ? 'ar' : 'en')
    this.translate.use(localStorage.getItem('lang')!)
    this.mytranslate.changeDirection()
  
  }
   
}
