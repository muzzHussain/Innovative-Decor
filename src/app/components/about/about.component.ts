import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CountUpDirective],
})
export class AboutComponent {
  stats = [
    { value: 35, label: 'Years of Excellence' },
    { value: 500, label: 'Projects Delivered' },
    { value: 50, label: 'Happy Clients' },
  ];

  services = [
    {
      title: '2D & 3D Design',
      description: 'We bring your ideas to life with detailed 2D plans and stunning, photorealistic 3D visualizations, ensuring every detail is perfect before construction begins.'
    },
    {
      title: 'Full Construction Work',
      description: 'From groundbreaking to final touches, we manage the entire construction process for offices, apartments, and custom homes with unmatched quality and efficiency.'
    },
    {
      title: 'Complete Home & Office Decor',
      description: 'Our interior design experts curate bespoke decor solutions, selecting furniture, lighting, and finishes to create harmonious and functional spaces.'
    },
    {
      title: 'Government & Private Projects',
      description: 'With decades of experience, we have a proven track record of successfully delivering large-scale government and high-end private sector projects on time and within budget.'
    }
  ];

  steps = [
    { title: 'Consult', description: 'We listen first — understanding your goals, budget and how the space needs to work.' },
    { title: 'Design', description: '2D plans and 3D visualizations let you see and refine every detail before work begins.' },
    { title: 'Build', description: 'Our teams execute on site with tight project management and uncompromising quality.' },
    { title: 'Deliver', description: 'Final finishes, decor and a thorough walkthrough before we hand over the keys.' },
  ];
}
