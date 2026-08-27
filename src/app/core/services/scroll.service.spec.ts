import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

/**
 * jsdom has no layout engine, so the geometric part of `measure()` (which
 * section owns the reading line) cannot be asserted here — every rect is zero.
 * These tests cover the contract around it: safe setup/teardown, and the
 * explicit navigation path that does not depend on measurement.
 */
describe('ScrollService', () => {
  let service: ScrollService;

  const addSection = (id: string) => {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
    return el;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  afterEach(() => {
    service.disconnect();
    document.querySelectorAll('section[id]').forEach((el) => el.remove());
  });

  it('starts at the top with no progress', () => {
    expect(service.activeSection()).toBe('top');
    expect(service.progress()).toBe(0);
    expect(service.scrolled()).toBe(false);
  });

  it('observes without throwing when sections are missing', () => {
    expect(() => service.observe(['nope', 'also-nope'])).not.toThrow();
  });

  it('is safe to observe repeatedly and to disconnect twice', () => {
    addSection('alpha');
    expect(() => {
      service.observe(['alpha']);
      service.observe(['alpha']);
      service.disconnect();
      service.disconnect();
    }).not.toThrow();
  });

  it('marks a section active when navigated to explicitly', () => {
    addSection('beta');
    service.observe(['beta']);

    service.scrollTo('beta');

    expect(service.activeSection()).toBe('beta');
  });

  it('ignores navigation to a section that is not present', () => {
    service.observe(['gamma']);
    service.scrollTo('missing-section');

    expect(service.activeSection()).toBe('top');
  });

  it('makes the scrolled-to section focusable for keyboard users', () => {
    const el = addSection('delta');
    service.observe(['delta']);

    service.scrollTo('delta');

    expect(el.getAttribute('tabindex')).toBe('-1');
  });

  it('returns to the first section on scrollToTop', () => {
    addSection('epsilon');
    addSection('zeta');
    service.observe(['epsilon', 'zeta']);
    service.scrollTo('zeta');

    service.scrollToTop();

    expect(service.activeSection()).toBe('epsilon');
  });
});
