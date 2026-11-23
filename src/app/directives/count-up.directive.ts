import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Animates an element's text from 0 to `appCountUp` the first time it scrolls into view.
 * Usage: <span [appCountUp]="500"></span>
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  appCountUp = input.required<number>();
  /** Animation length in ms. */
  countUpDuration = input(2000);

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit(): void {
    const target = this.appCountUp();
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.render(target);
      return;
    }

    this.render(0);
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.observer?.disconnect();
          this.animate(target);
        }
      },
      { threshold: 0.5 },
    );
    this.observer.observe(this.el);
  }

  private animate(target: number): void {
    const duration = this.countUpDuration();
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      this.render(Math.round(target * eased));
      if (t < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.el.textContent = value.toLocaleString();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }
}
