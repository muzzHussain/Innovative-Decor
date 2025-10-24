import { Component, ChangeDetectionStrategy, input, signal, ElementRef, viewChild, effect } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent {
  beforeImage = input.required<string>();
  afterImage = input.required<string>();

  sliderContainer = viewChild<ElementRef<HTMLDivElement>>('sliderContainer');
  
  position = signal(50);
  isDragging = signal(false);

  constructor() {
    effect(() => {
      const container = this.sliderContainer();
      if (container) {
        // Initial setup if needed
      }
    });
  }

  startDrag() {
    this.isDragging.set(true);
  }

  stopDrag() {
    this.isDragging.set(false);
  }
  
  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging()) return;

    const container = this.sliderContainer()?.nativeElement;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const positionX = x - rect.left;
    const percentage = Math.max(0, Math.min(100, (positionX / rect.width) * 100));

    this.position.set(percentage);
  }
}
