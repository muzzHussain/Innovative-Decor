import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot') dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring') ringRef!: ElementRef<HTMLDivElement>;

  private animFrameId!: number;
  private mouseX = -200;
  private mouseY = -200;
  private ringX = -200;
  private ringY = -200;
  private isBrowser: boolean;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    this.initialized = true;
    document.documentElement.classList.add('custom-cursor-active');
    this.loop();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.initialized) return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    const dot = this.dotRef.nativeElement;
    dot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;

    const target = e.target as Element;
    const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
    dot.classList.toggle('hovering', isInteractive);
    this.ringRef.nativeElement.classList.toggle('hovering', isInteractive);
  }

  @HostListener('window:mouseleave')
  onMouseLeave() {
    this.mouseX = -200;
    this.mouseY = -200;
  }

  private loop() {
    this.ringX += (this.mouseX - this.ringX) * 0.12;
    this.ringY += (this.mouseY - this.ringY) * 0.12;
    this.ringRef.nativeElement.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animFrameId);
    document.documentElement.classList.remove('custom-cursor-active');
  }
}