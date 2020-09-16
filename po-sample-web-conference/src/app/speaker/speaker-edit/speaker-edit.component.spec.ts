import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerEditComponent } from './speaker-edit.component';

describe('SpeakerEditComponent', () => {
  let component: SpeakerEditComponent;
  let fixture: ComponentFixture<SpeakerEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
