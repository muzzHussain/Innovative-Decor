import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = signal(false);
  isDarkMode = signal(false);

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }
  
  navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/designs', label: 'Designs' },
    { path: '/contact', label: 'Contact' },
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
