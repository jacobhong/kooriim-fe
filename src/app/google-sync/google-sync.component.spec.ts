import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSyncComponent } from './google-sync.component';

describe('GoogleSyncComponent', () => {
  let component: GoogleSyncComponent;
  let fixture: ComponentFixture<GoogleSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
