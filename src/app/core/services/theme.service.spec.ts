import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('resolves to one of the two supported themes', () => {
    expect(['dark', 'light']).toContain(service.theme());
  });

  it('flips between themes on toggle', () => {
    const first = service.theme();
    service.toggle();
    expect(service.theme()).not.toBe(first);

    service.toggle();
    expect(service.theme()).toBe(first);
  });

  it('reflects the active theme onto the document element', () => {
    service.set('light');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    service.set('dark');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
