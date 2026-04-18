import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class ContactComponent {
  contactForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    message: ["", [Validators.required, Validators.minLength(10)]],
  });

  submissionStatus = signal<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submissionStatus.set("submitting");
    console.log("Form Submitted:", this.contactForm.value);

    this.http
      .post(
        "https://formsubmit.co/ajax/1e2ac28d7e190fea183cec34d0bd5967",
        this.contactForm.value,
      )
      .subscribe({
        next: (response) => {
          console.log("message response -> ", response);
          this.submissionStatus.set("success");
          this.contactForm.reset();

          setTimeout(() => {
            if (this.submissionStatus() === "success") {
              this.submissionStatus.set("idle");
            }
          }, 5000);
        },
        error: (error) => {
          console.log("message error -> ", error);
          this.submissionStatus.set("error");

          setTimeout(() => {
            if (this.submissionStatus() === "error") {
              this.submissionStatus.set("idle");
            }
          }, 5000);
        },
      });

    // Simulate API call
    // setTimeout(() => {
    //   this.submissionStatus.set("success");
    //   this.contactForm.reset();
    // }, 1500);
  }
}
