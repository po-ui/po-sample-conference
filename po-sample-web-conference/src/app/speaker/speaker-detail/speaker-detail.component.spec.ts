import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerDetailComponent } from './speaker-detail.component';

describe('SpeakerDetailComponent', () => {
  let component: SpeakerDetailComponent;
  let fixture: ComponentFixture<SpeakerDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
