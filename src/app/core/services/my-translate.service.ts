import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {

  changeDirection(){
    if(localStorage.getItem('lang') === 'en'){
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }else{
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }
  
}
