import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { DesignsComponent } from './components/designs/designs.component';
import { ContactComponent } from './components/contact/contact.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'Innovative Decor | Home' },
  { path: 'about', component: AboutComponent, title: 'Innovative Decor | About Us' },
  { path: 'work', component: WorkComponent, title: 'Innovative Decor | Our Work' },
  { path: 'designs', component: DesignsComponent, title: 'Innovative Decor | Designs' },
  { path: 'contact', component: ContactComponent, title: 'Innovative Decor | Contact' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
