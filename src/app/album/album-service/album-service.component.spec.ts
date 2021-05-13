import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlbumServiceComponent } from './album-service.component';

describe('AlbumServiceComponent', () => {
  let component: AlbumServiceComponent;
  let fixture: ComponentFixture<AlbumServiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
