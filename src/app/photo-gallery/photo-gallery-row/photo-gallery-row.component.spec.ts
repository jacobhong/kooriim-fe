import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryRowComponent } from './photo-gallery-row.component';

describe('PhotoGalleryRowComponent', () => {
  let component: PhotoGalleryRowComponent;
  let fixture: ComponentFixture<PhotoGalleryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGalleryRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
