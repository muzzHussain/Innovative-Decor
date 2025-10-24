import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageSliderComponent]
})
export class DesignsComponent {
  designPairs = [
    {
      before: 'https://i.imgur.com/vA9z2T5.png', // A simple 2D floor plan
      after: 'https://picsum.photos/seed/design1/1200/800',
      title: 'Living Room Transformation',
      description: 'From a 2D blueprint to a warm and inviting living space.'
    },
    {
      before: 'https://i.imgur.com/yVqfJ1A.png', // Another 2D layout
      after: 'https://picsum.photos/seed/design2/1200/800',
      title: 'Modern Kitchen Concept',
      description: 'Visualizing a sleek, functional kitchen from the initial plan.'
    },
    {
      before: 'https://i.imgur.com/e2r1o58.png', // 2D office layout
      after: 'https://picsum.photos/seed/design3/1200/800',
      title: 'Corporate Office Redesign',
      description: 'Conceptualizing an open, collaborative office environment.'
    }
  ];
}
