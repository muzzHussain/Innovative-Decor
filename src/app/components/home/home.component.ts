import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageWithLoader } from '../image-with-loader/image-with-loader'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ImageWithLoader],
})
export class HomeComponent implements OnInit, OnDestroy {
  projects = [
    { src: 'assets/images/Modern_living_room.jpg', alt: 'Modern Living Room' },
    { src: 'assets/images/Corporate_Office_Space.jpg', alt: 'Corporate Office Space' },
    { src: 'assets/images/Luxury_Apartment_Interior.jpg', alt: 'Luxury Apartment Interior' },
    { src: 'assets/images/Government_Building_Hall.jpg', alt: 'Government Building Hall' },
    { src: 'assets/images/Cozy_Dream_Home_Bedroom.jpg', alt: 'Cozy Dream Home Bedroom' },
    { src: 'assets/images/Sleek_kitchen_design.jpg', alt: 'Sleek Kitchen Design' },
  ];
  // projects = [
  //   { src: 'https://picsum.photos/seed/project1/800/600', alt: 'Modern Living Room' },
  //   { src: 'https://picsum.photos/seed/project2/800/600', alt: 'Corporate Office Space' },
  //   { src: 'https://picsum.photos/seed/project3/800/600', alt: 'Luxury Apartment Interior' },
  //   { src: 'https://picsum.photos/seed/project4/800/600', alt: 'Government Building Hall' },
  //   { src: 'https://picsum.photos/seed/project5/800/600', alt: 'Cozy Dream Home Bedroom' },
  //   { src: 'https://picsum.photos/seed/project6/800/600', alt: 'Sleek Kitchen Design' },
  // ];

  clients = [
    // { name: 'Apperal Export Promotion Council', logo: 'assets/clients/AEPC.jpg' },
    // { name: `D'Decor`, logo: 'assets/clients/DDecor.jpg' },
    // {name: 'DCA Architect', logo:'assets/clients/DCA-Architect.jpg'},
    { name: `D'Decor`, logo: 'DD' },
    { name: 'Apperal Export Promotion Council', logo: 'AE' },
    { name: 'DCA Architect', logo: 'DC' },
    { name: 'Apperal Training & Desing Centre', logo: 'AT' },
    { name: 'Hero Cycle', logo: 'HC' },
  ];

   testimonials = [
    {
      quote: "I have waited my entire life for a design tool like this - nearly my entire life. With Innovative Decor, less is truly more. Period.",
      name: "Vermillion D. White",
      title: "CEO, planetX.ai",
      avatar: "assets/images/men-avatar.jpg"//"https://picsum.photos/seed/avatar1/200/200"
    },
    {
      quote: "Their attention to detail and commitment to quality is unparalleled. They transformed our office into a modern masterpiece.",
      name: "Fraya",
      title: "COO, Future Homes",
      avatar: "assets/images/women-avatar1.jpg"//"https://picsum.photos/seed/avatar2/200/200"
    },
    {
      quote: "Innovative Decor exceeded all our expectations. The team was professional, creative, and delivered a stunning residential project.",
      name: "John Smith",
      title: "Private Homeowner",
      avatar: "assets/images/men-avatar.jpg"//"https://picsum.photos/seed/avatar3/200/200"
    },
    {
      quote: "Their attention to detail and commitment to quality is unparalleled. They transformed our office into a modern masterpiece.",
      name: "Clara",
      title: "COO, Future Homes",
      avatar: "assets/images/women-avatar.png"//https://picsum.photos/seed/avatar2/200/200"
    }
  ];

  doubledClients = [...this.clients, ...this.clients];

  currentTestimonialIndex = signal(0);
  private intervalId?: number;

  ngOnInit() {
    this.startTestimonialSlider();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startTestimonialSlider() {
    this.intervalId = window.setInterval(() => {
      this.currentTestimonialIndex.update(i => (i + 1) % this.testimonials.length);
    }, 2500); // Change every 2.5 seconds
  }

  selectTestimonial(index: number) {
    this.currentTestimonialIndex.set(index);
    clearInterval(this.intervalId);
    this.startTestimonialSlider();
  }

  nextTestimonial() {
    this.currentTestimonialIndex.update(i => (i + 1) % this.testimonials.length);
    clearInterval(this.intervalId);
    this.startTestimonialSlider();
  }

  prevTestimonial() {
    this.currentTestimonialIndex.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
    clearInterval(this.intervalId);
    this.startTestimonialSlider();
  }
}
