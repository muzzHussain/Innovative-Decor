import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ImageWithLoader } from '../image-with-loader/image-with-loader'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[ImageWithLoader]
})
export class AboutComponent {
  services = [
    { 
      icon: '📐',
      title: '2D & 3D Design',
      description: 'We bring your ideas to life with detailed 2D plans and stunning, photorealistic 3D visualizations, ensuring every detail is perfect before construction begins.'
    },
    { 
      icon: '🏗️',
      title: 'Full Construction Work',
      description: 'From groundbreaking to final touches, we manage the entire construction process for offices, apartments, and custom homes with unmatched quality and efficiency.'
    },
    { 
      icon: '🛋️',
      title: 'Complete Home & Office Decor',
      description: 'Our interior design experts curate bespoke decor solutions, selecting furniture, lighting, and finishes to create harmonious and functional spaces.'
    },
    {
      icon: '🏛️',
      title: 'Government & Private Projects',
      description: 'With decades of experience, we have a proven track record of successfully delivering large-scale government and high-end private sector projects on time and within budget.'
    }
  ];
}
