import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

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
})
export class WorkComponent {
  allProjects: Project[] = [
    { id: 1, category: 'Commercial', title: 'Metropolis Corporate Tower', imageUrl: 'https://picsum.photos/seed/work1/800/600' },
    { id: 2, category: 'Residential', title: 'The Grandeur Apartments', imageUrl: 'https://picsum.photos/seed/work2/800/600' },
    { id: 3, category: 'Government', title: 'City Central Library', imageUrl: 'https://picsum.photos/seed/work3/800/600' },
    { id: 4, category: 'Residential', title: 'Oakwood Villa', imageUrl: 'https://picsum.photos/seed/work4/800/600' },
    { id: 5, category: 'Commercial', title: 'Orion Business Hub', imageUrl: 'https://picsum.photos/seed/work5/800/600' },
    { id: 6, category: 'Residential', title: 'Lakeside Dream Home', imageUrl: 'https://picsum.photos/seed/work6/800/600' },
    { id: 7, category: 'Government', title: 'National Science Museum', imageUrl: 'https://picsum.photos/seed/work7/800/600' },
    { id: 8, category: 'Commercial', title: 'Starlight Retail Center', imageUrl: 'https://picsum.photos/seed/work8/800/600' },
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
