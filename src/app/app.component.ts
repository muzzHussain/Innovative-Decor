import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter, take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  isLoaded=signal(false);
  isLoaderVisible=signal(true);

  private router=inject(Router)
  private platformId=inject(PLATFORM_ID)

  constructor(){
    if(isPlatformBrowser(this.platformId)){
      this.router.events.pipe(
        filter((event):event is NavigationEnd => event instanceof NavigationEnd),
        take(1)
      ).subscribe(()=>{
        setTimeout(()=>{
          this.isLoaded.set(true)

          setTimeout(()=>this.isLoaderVisible.set(false), 500)
        },1200)
      });
    } else {
      this.isLoaded.set(true);
      this.isLoaderVisible.set(false)
    }
  }


}
