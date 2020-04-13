import { TestBed } from '@angular/core/testing';

import { PublicGalleryGuardService } from './public-gallery-guard.service';

describe('PublicGalleryGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicGalleryGuardService = TestBed.get(PublicGalleryGuardService);
    expect(service).toBeTruthy();
  });
});
