import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  type AbstractControl,
} from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Icon } from '../../shared/components/icon/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  private readonly portfolio = inject(PortfolioService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly profile = this.portfolio.profile;
  protected readonly socialLinks = this.portfolio.socialLinks;

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  /** Set after a successful hand-off to the visitor's mail client. */
  protected readonly sent = signal(false);
  protected readonly submitted = signal(false);

  protected readonly channels = [
    { icon: 'mail', label: 'Email', value: this.profile.email, href: `mailto:${this.profile.email}` },
    {
      icon: 'phone',
      label: 'Phone',
      value: this.profile.phone,
      href: `tel:${this.profile.phone.split(' ').join('')}`,
    },
    { icon: 'map-pin', label: 'Location', value: this.profile.location, href: null },
  ];

  /** True once the control should show its error — touched or after a submit. */
  protected showError(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  protected errorFor(name: string): string {
    const control = this.form.get(name);
    if (!control || control.valid) {
      return '';
    }

    return this.messageFor(name, control);
  }

  protected submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    const body = `${message}\n\n—\n${name}\n${email}`;
    const href = `mailto:${this.profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    if (this.isBrowser) {
      // Hand off to whatever mail client the visitor uses; there is no backend
      // to post to, and this keeps the address out of scrapers' reach.
      globalThis.location.href = href;
    }

    this.sent.set(true);
    this.form.reset();
    this.submitted.set(false);
  }

  private messageFor(name: string, control: AbstractControl): string {
    const errors = control.errors ?? {};

    if (errors['required']) {
      return `${this.labelFor(name)} is required.`;
    }
    if (errors['email']) {
      return 'Enter a valid email address.';
    }
    if (errors['minlength']) {
      const required = errors['minlength'].requiredLength;
      return `${this.labelFor(name)} needs at least ${required} characters.`;
    }

    return 'Please check this field.';
  }

  private labelFor(name: string): string {
    const labels: Record<string, string> = {
      name: 'Your name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    };
    return labels[name] ?? 'This field';
  }
}
