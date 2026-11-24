import { Component, ChangeDetectionStrategy, computed, signal, HostListener, OnDestroy } from '@angular/core';

/** Columns per breakpoint, matching Tailwind's md (768) and xl (1280). */
function columnCountFor(width: number): number {
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  return 2;
}

interface Project {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
  /** Intrinsic image size — reserves space in the masonry grid before the image loads. */
  width: number;
  height: number;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent implements OnDestroy {
  allProjects: Project[] = [
    { id: 1, category: 'Commercial', title: 'Metropolis Corporate Tower', imageUrl: 'assets/images/Metropolis_Corporate_Tower.jpg', width: 640, height: 630 },
    { id: 2, category: 'Residential', title: 'Apartments', imageUrl: 'assets/images/Apartments.jpg', width: 736, height: 736 },
    { id: 3, category: 'Government', title: 'City Central Library', imageUrl: 'assets/images/City_Central_Library.jpg', width: 736, height: 552 },
    { id: 4, category: 'Residential', title: 'Villa Wardrobe', imageUrl: 'assets/images/villa_wardobe.jpg', width: 474, height: 842 },
    { id: 6, category: 'Residential', title: 'Wooden Tent', imageUrl: 'assets/images/wooden_tent_house.jpg', width: 736, height: 1104 },
    { id: 7, category: 'Government', title: 'AEPC', imageUrl: 'assets/images/AEPC.jpg', width: 735, height: 490 },
    { id: 8, category: 'Commercial', title: 'Hero Cycle Showroom', imageUrl: 'assets/images/Hero_cycle_showroom.jpg', width: 404, height: 316 },
  ];

  categories = ['All', ...new Set(this.allProjects.map(p => p.category))];

  activeCategory = signal('All');
  filteredProjects = computed(() => {
    const category = this.activeCategory();
    return category === 'All' ? this.allProjects : this.allProjects.filter(p => p.category === category);
  });

  /** Index into filteredProjects of the project open in the lightbox, or null. */
  selectedIndex = signal<number | null>(null);
  selectedProject = computed(() => {
    const i = this.selectedIndex();
    return i === null ? null : this.filteredProjects()[i];
  });

  loaded = signal<ReadonlySet<number>>(new Set());

  columnCount = signal(columnCountFor(window.innerWidth));

  /**
   * Pinterest-style masonry: each project goes into the currently shortest column
   * (heights estimated from image aspect ratios), so columns stay balanced and
   * tiles read roughly left-to-right.
   */
  columns = computed(() => {
    const count = this.columnCount();
    const cols: { project: Project; index: number }[][] = Array.from({ length: count }, () => []);
    const heights = new Array<number>(count).fill(0);
    this.filteredProjects().forEach((project, index) => {
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push({ project, index });
      heights[shortest] += project.height / project.width;
    });
    return cols;
  });

  @HostListener('window:resize')
  onResize() {
    this.columnCount.set(columnCountFor(window.innerWidth));
  }

  countFor(category: string): number {
    return category === 'All' ? this.allProjects.length : this.allProjects.filter(p => p.category === category).length;
  }

  filterProjects(category: string) {
    this.activeCategory.set(category);
  }

  onImageLoad(id: number) {
    this.loaded.update(s => new Set(s).add(id));
  }

  viewProject(index: number) {
    this.selectedIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedIndex.set(null);
    document.body.style.overflow = '';
  }

  next() {
    const i = this.selectedIndex();
    if (i !== null) this.selectedIndex.set((i + 1) % this.filteredProjects().length);
  }

  prev() {
    const i = this.selectedIndex();
    const n = this.filteredProjects().length;
    if (i !== null) this.selectedIndex.set((i - 1 + n) % n);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.selectedIndex() === null) return;
    if (event.key === 'Escape') this.closeModal();
    else if (event.key === 'ArrowRight') this.next();
    else if (event.key === 'ArrowLeft') this.prev();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
