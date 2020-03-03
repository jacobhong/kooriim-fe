import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollingComponent } from './infinite-scroll.component';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollingComponent;
  let fixture: ComponentFixture<InfiniteScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
