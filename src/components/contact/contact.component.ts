import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submissionStatus.set('submitting');
    console.log('Form Submitted:', this.contactForm.value);

    // Simulate API call
    setTimeout(() => {
      this.submissionStatus.set('success');
      this.contactForm.reset();
    }, 1500);
  }
}
