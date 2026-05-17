import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

type FilterType = 'all' | 'layout' | 'elevation' | '2d-drawing' | '3d-design';

interface DesignItem {
  id: number;
  type: Exclude<FilterType, 'all'>;
  typeLabel: string;
  project: string;
  projectCategory: string;
  image: string;
  title: string;
  description: string;
  wide?: boolean;
}

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class DesignsComponent {
  activeFilter = signal<FilterType>('all');
  lightboxItem = signal<DesignItem | null>(null);

  readonly filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Designs' },
    { key: 'layout', label: 'Layout' },
    { key: 'elevation', label: 'Elevation View' },
    { key: '2d-drawing', label: '2D Drawing' },
    { key: '3d-design', label: '3D Design' },
  ];

  readonly allDesigns: DesignItem[] = [
    // === Luxury Apartment ===
    {
      id: 1, type: 'layout', typeLabel: 'Layout',
      project: 'Luxury Apartment', projectCategory: 'Residential',
      image: 'assets/designs/apartment-layout.svg',
      title: 'Apartment Floor Plan',
      description: 'Complete spatial arrangement with living room, master bedroom, kitchen, bathroom, walk-in wardrobe, and foyer zones.'
    },
    {
      id: 2, type: 'elevation', typeLabel: 'Elevation View',
      project: 'Luxury Apartment', projectCategory: 'Residential',
      image: 'assets/designs/apartment-elevation.svg',
      title: 'Living Room Wall Elevation',
      description: 'Feature wall elevation detailing the TV alcove, built-in shelving units, material specifications, and ambient lighting plan.',
      wide: true
    },
    {
      id: 3, type: '2d-drawing', typeLabel: '2D Drawing',
      project: 'Luxury Apartment', projectCategory: 'Residential',
      image: 'assets/designs/apartment-2d.svg',
      title: 'Technical Floor Plan',
      description: 'Dimensioned architectural drawing with wall thicknesses, door swing arcs, window positions, and complete room measurements.',
      wide: true
    },
    {
      id: 4, type: '3d-design', typeLabel: '3D Design',
      project: 'Luxury Apartment', projectCategory: 'Residential',
      image: 'assets/designs/apartment-3d.svg',
      title: 'Living Room Visualization',
      description: 'Isometric 3D perspective of the completed living space with L-shape sofa, TV wall unit, floating shelves, and ambient pendant lighting.'
    },

    // === Restaurant & Bar ===
    {
      id: 6, type: 'layout', typeLabel: 'Layout',
      project: 'Restaurant & Bar', projectCategory: 'Commercial',
      image: 'assets/designs/restaurant-layout.svg',
      title: 'Restaurant Floor Plan',
      description: 'Optimized layout with kitchen zone, island dining table, bar counter with stools, storage room, and circulation paths.'
    },
    {
      id: 7, type: 'elevation', typeLabel: 'Elevation View',
      project: 'Restaurant & Bar', projectCategory: 'Commercial',
      image: 'assets/designs/restaurant-elevation.svg',
      title: 'Bar Counter Elevation',
      description: 'Technical elevation of the bar wall featuring back bar shelving with bottles, pendant lighting, decorative tiles, and bar counter profile.',
      wide: true
    },
    {
      id: 8, type: '2d-drawing', typeLabel: '2D Drawing',
      project: 'Restaurant & Bar', projectCategory: 'Commercial',
      image: 'assets/designs/restaurant-2d.svg',
      title: 'Restaurant Technical Plan',
      description: 'Detailed dimensioned plan with kitchen equipment positions, seating zones, service circulation, and precise measurements.',
      wide: true
    },
    {
      id: 9, type: '3d-design', typeLabel: '3D Design',
      project: 'Restaurant & Bar', projectCategory: 'Commercial',
      image: 'assets/designs/restaurant-3d.svg',
      title: 'Interior Visualization',
      description: 'Isometric 3D perspective of the restaurant and bar with back-bar shelving, dining tables, bar stools, and warm pendant lighting.'
    },

    // === Corporate Office ===
    {
      id: 10, type: 'layout', typeLabel: 'Layout',
      project: 'Corporate Office', projectCategory: 'Commercial',
      image: 'assets/designs/office-layout.svg',
      title: 'Office Floor Plan',
      description: 'Open-plan office with collaborative workstations, conference room, manager cabin, breakout zone, and reception area.'
    },
    {
      id: 11, type: 'elevation', typeLabel: 'Elevation View',
      project: 'Corporate Office', projectCategory: 'Commercial',
      image: 'assets/designs/office-elevation.svg',
      title: 'Reception Feature Wall',
      description: 'Statement reception wall with company branding, dark wood feature panels, recessed lighting, and curved reception desk profile.',
      wide: true
    },
    {
      id: 12, type: '2d-drawing', typeLabel: '2D Drawing',
      project: 'Corporate Office', projectCategory: 'Commercial',
      image: 'assets/designs/office-2d.svg',
      title: 'Office Technical Plan',
      description: 'Dimensioned plan with partition walls, workstation grid, conference table, door swings, and zone area measurements.',
      wide: true
    },
    {
      id: 13, type: '3d-design', typeLabel: '3D Design',
      project: 'Corporate Office', projectCategory: 'Commercial',
      image: 'assets/designs/office-3d.svg',
      title: 'Office Visualization',
      description: 'Isometric 3D perspective of the corporate office with conference table, open workstations, branded feature wall, and track lighting.'
    },

    // === Modular Kitchen ===
    {
      id: 14, type: 'layout', typeLabel: 'Layout',
      project: 'Modular Kitchen', projectCategory: 'Residential',
      image: 'assets/designs/kitchen-layout.svg',
      title: 'Kitchen Floor Plan',
      description: 'L-shaped counter with integrated appliances, central island with bar seating, pantry storage, and wine/beverage area.'
    },
    {
      id: 15, type: 'elevation', typeLabel: 'Elevation View',
      project: 'Modular Kitchen', projectCategory: 'Residential',
      image: 'assets/designs/kitchen-elevation.svg',
      title: 'Kitchen Counter Wall Elevation',
      description: 'Elevation showing upper and lower cabinets, granite countertop, ceramic backsplash tiles, chimney hood, and appliance placement.',
      wide: true
    },
    {
      id: 16, type: '2d-drawing', typeLabel: '2D Drawing',
      project: 'Modular Kitchen', projectCategory: 'Residential',
      image: 'assets/designs/kitchen-2d.svg',
      title: 'Kitchen Technical Plan',
      description: 'Detailed kitchen plan with hob, sink, oven, refrigerator positions, island dimensions, bar stool layout, and all measurements.',
      wide: true
    },
    {
      id: 17, type: '3d-design', typeLabel: '3D Design',
      project: 'Modular Kitchen', projectCategory: 'Residential',
      image: 'assets/designs/kitchen-3d.svg',
      title: 'Kitchen 3D Visualization',
      description: 'Isometric 3D perspective of the modular kitchen with L-shaped counter, central island, overhead hood, and pendant lighting.'
    },

    // === Master Bedroom ===
    {
      id: 18, type: 'layout', typeLabel: 'Layout',
      project: 'Master Bedroom', projectCategory: 'Residential',
      image: 'assets/designs/bedroom-layout.svg',
      title: 'Bedroom Suite Plan',
      description: 'Master bedroom with king bed, dressing vanity area, en-suite bathroom with shower, and walk-in wardrobe with shelving.'
    },
    {
      id: 19, type: 'elevation', typeLabel: 'Elevation View',
      project: 'Master Bedroom', projectCategory: 'Residential',
      image: 'assets/designs/bedroom-elevation.svg',
      title: 'Headboard Feature Wall',
      description: 'Fluted dark wood feature wall with upholstered headboard, wall sconce lighting, bedside tables, and crown molding detail.',
      wide: true
    },
    {
      id: 20, type: '2d-drawing', typeLabel: '2D Drawing',
      project: 'Master Bedroom', projectCategory: 'Residential',
      image: 'assets/designs/bedroom-2d.svg',
      title: 'Bedroom Technical Plan',
      description: 'Dimensioned bedroom plan with king bed, bedside tables, TV unit, dressing table, en-suite, walk-in wardrobe, door swings, and window positions.',
      wide: true
    },
    {
      id: 21, type: '3d-design', typeLabel: '3D Design',
      project: 'Master Bedroom', projectCategory: 'Residential',
      image: 'assets/designs/bedroom-3d.svg',
      title: 'Bedroom Visualization',
      description: 'Isometric 3D perspective of the master bedroom suite with upholstered headboard, wardrobe, bedside lamps, and ambient pendant.'
    },
  ];

  filteredDesigns = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allDesigns;
    return this.allDesigns.filter(d => d.type === filter);
  });

  lightboxIndex = computed(() => {
    const item = this.lightboxItem();
    if (!item) return -1;
    return this.filteredDesigns().findIndex(d => d.id === item.id);
  });

  setFilter(type: FilterType) {
    this.activeFilter.set(type);
    this.lightboxItem.set(null);
  }

  openLightbox(item: DesignItem) {
    this.lightboxItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxItem.set(null);
    document.body.style.overflow = '';
  }

  prevInLightbox() {
    const idx = this.lightboxIndex();
    const list = this.filteredDesigns();
    if (idx > 0) this.lightboxItem.set(list[idx - 1]);
  }

  nextInLightbox() {
    const idx = this.lightboxIndex();
    const list = this.filteredDesigns();
    if (idx < list.length - 1) this.lightboxItem.set(list[idx + 1]);
  }

  hasPrev = computed(() => this.lightboxIndex() > 0);
  hasNext = computed(() => {
    const idx = this.lightboxIndex();
    return idx >= 0 && idx < this.filteredDesigns().length - 1;
  });
}
