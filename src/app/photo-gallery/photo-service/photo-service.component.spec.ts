import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoServiceComponent } from './photo-service.component';

describe('PhotoServiceComponent', () => {
  let component: PhotoServiceComponent;
  let fixture: ComponentFixture<PhotoServiceComponent>;

  beforeEach(async(() => {
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
