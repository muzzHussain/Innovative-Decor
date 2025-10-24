import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HomeComponent {
  projects = [
    { src: 'https://picsum.photos/seed/project1/800/600', alt: 'Modern Living Room' },
    { src: 'https://picsum.photos/seed/project2/800/600', alt: 'Corporate Office Space' },
    { src: 'https://picsum.photos/seed/project3/800/600', alt: 'Luxury Apartment Interior' },
    { src: 'https://picsum.photos/seed/project4/800/600', alt: 'Government Building Hall' },
    { src: 'https://picsum.photos/seed/project5/800/600', alt: 'Cozy Dream Home Bedroom' },
    { src: 'https://picsum.photos/seed/project6/800/600', alt: 'Sleek Kitchen Design' },
  ];

  clients = [
    { name: 'Govt. Projects Wing', logo: '🏛️' },
    { name: 'Prestige Group', logo: 'P' },
    { name: 'Sobha Ltd.', logo: 'S' },
    { name: 'Urban Spaces', logo: 'U' },
    { name: 'Future Homes', logo: 'F' },
    { name: 'Corporate Towers Inc.', logo: 'T' },
  ];
}
