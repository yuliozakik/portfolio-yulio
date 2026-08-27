import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  /** The form is `protected`, so reach it the way the template does. */
  const form = () => (component as unknown as { form: import('@angular/forms').FormGroup }).form;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts invalid and empty', () => {
    expect(form().invalid).toBe(true);
  });

  it('rejects a malformed email', () => {
    form().patchValue({ email: 'not-an-email' });
    expect(form().get('email')?.hasError('email')).toBe(true);

    form().patchValue({ email: 'someone@example.com' });
    expect(form().get('email')?.valid).toBe(true);
  });

  it('requires a message of substance', () => {
    form().patchValue({ message: 'too short' });
    expect(form().get('message')?.hasError('minlength')).toBe(true);
  });

  it('becomes valid once every field is filled in properly', () => {
    form().patchValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Frontend role',
      message: 'We are hiring an Angular engineer and your work looks like a strong match.',
    });

    expect(form().valid).toBe(true);
  });
});
