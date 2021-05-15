import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlbumCreateModalComponent } from './album-create-modal.component';

describe('AlbumCreateModalComponent', () => {
  let component: AlbumCreateModalComponent;
  let fixture: ComponentFixture<AlbumCreateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
