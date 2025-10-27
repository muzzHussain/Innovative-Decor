import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {ImageWithLoader} from '../image-with-loader/image-with-loader'

interface Project {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[ImageWithLoader]
})
export class WorkComponent {
  allProjects: Project[] = [
    { id: 1, category: 'Commercial', title: 'Metropolis Corporate Tower', imageUrl: 'assets/images/Metropolis_Corporate_Tower.jpg' },
    { id: 2, category: 'Residential', title: 'Apartments', imageUrl: 'assets/images/Apartments.jpg' },
    { id: 3, category: 'Government', title: 'City Central Library', imageUrl: 'assets/images/City_Central_Library.jpg' },
    { id: 4, category: 'Residential', title: 'Villa Wardrobe', imageUrl: 'assets/images/villa_wardobe.jpg' },
    // { id: 5, category: 'Commercial', title: 'Orion Business Hub', imageUrl: 'assets/images/' },
    { id: 6, category: 'Residential', title: 'Wooden Tent', imageUrl: 'assets/images/wooden_tent_house.jpg' },
    { id: 7, category: 'Government', title: 'AEPC', imageUrl: 'assets/images/AEPC.jpg' },
    { id: 8, category: 'Commercial', title: 'Hero Cycle Showroom', imageUrl: 'assets/images/Hero_cycle_showroom.jpg' },
  ];
  
  categories = ['All', ...new Set(this.allProjects.map(p => p.category))];
  
  activeCategory = signal('All');
  filteredProjects = signal<Project[]>(this.allProjects);
  selectedProject = signal<Project | null>(null);

  filterProjects(category: string) {
    this.activeCategory.set(category);
    if (category === 'All') {
      this.filteredProjects.set(this.allProjects);
    } else {
      this.filteredProjects.set(this.allProjects.filter(p => p.category === category));
    }
  }

  viewProject(project: Project) {
    this.selectedProject.set(project);
  }

  closeModal() {
    this.selectedProject.set(null);
  }
}
