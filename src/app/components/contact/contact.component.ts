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
  readonly email = "tahir.hussain@gmail.com";
  readonly phones = [
    { label: "+91 99993 58788", href: "tel:+919999358788" },
    { label: "+91 96506 68464", href: "tel:+919650668464" },
  ];
  readonly directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Tahir+Hussain+Decorator+Khanpur+New+Delhi";
  readonly projectTypes = ["Residential", "Commercial", "Government", "Decor only", "Other"];

  readonly inputClass =
    "mt-2 block w-full px-4 py-3 rounded-xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition";

  contactForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.pattern(/^[+\d][\d\s()-]{6,}$/)]],
    projectType: [""],
    message: ["", [Validators.required, Validators.minLength(10)]],
  });

  submissionStatus = signal<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  showError(control: string): boolean {
    const c = this.contactForm.get(control);
    return !!c && c.invalid && c.touched;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submissionStatus.set("submitting");

    const { name, email, phone, projectType, message } = this.contactForm.value;

    this.http
      .post("https://formsubmit.co/ajax/1e2ac28d7e190fea183cec34d0bd5967", {
        // Human-readable keys become the labels in the enquiry email.
        Name: name,
        Email: email,
        Phone: phone || "—",
        "Project Type": projectType || "—",
        Message: message,
        _replyto: email,
        _subject: "New enquiry from the Innovative Decor website",
        _template: "table",
      })
      .subscribe({
        next: () => {
          this.submissionStatus.set("success");
          this.contactForm.reset({ projectType: "" });
          this.resetStatusLater("success");
        },
        error: () => {
          this.submissionStatus.set("error");
          this.resetStatusLater("error");
        },
      });
  }

  private resetStatusLater(status: "success" | "error") {
    setTimeout(() => {
      if (this.submissionStatus() === status) {
        this.submissionStatus.set("idle");
      }
    }, 6000);
  }
}
