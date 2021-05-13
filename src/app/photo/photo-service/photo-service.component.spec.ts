import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhotoServiceComponent } from './photo-service.component';

describe('PhotoServiceComponent', () => {
  let component: PhotoServiceComponent;
  let fixture: ComponentFixture<PhotoServiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
