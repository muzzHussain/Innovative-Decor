import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { WorkComponent } from "./components/work/work.component";
import { DesignsComponent } from "./components/designs/designs.component";
import { ContactComponent } from "./components/contact/contact.component";
import { WorkInProgress } from "./components/work-in-progress/work-in-progress";

export const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent, title: "Innovative Decor | Home" },
  {
    path: "about",
    component: AboutComponent,
    title: "Innovative Decor | About Us",
  },
  {
    path: "work",
    component: WorkComponent,
    title: "Innovative Decor | Our Work",
  },
  {
    path: "designs",
    component: DesignsComponent,
    title: "Innovative Decor | Designs",
  },
  // {
  //   path: "designs",
  //   component: WorkInProgress,
  //   title: "Innovative Decor | Designs",
  // },
  {
    path: "contact",
    component: ContactComponent,
    title: "Innovative Decor | Contact",
  },
  // { path: 'wip',component:DesignsComponent, title:'Innovative Decor | WIP - Designs' },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];
