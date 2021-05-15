import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicGalleryComponent } from './public-gallery.component';

describe('PublicGalleryComponent', () => {
  let component: PublicGalleryComponent;
  let fixture: ComponentFixture<PublicGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
