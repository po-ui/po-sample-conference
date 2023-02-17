import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

import { PoStorageService } from '@po-ui/ng-storage';
import { Events } from './services/events.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let poStorageSpy: jasmine.SpyObj<PoStorageService>;
  let statusBarSpy = jasmine.createSpyObj('StatusBar', ['setOverlaysWebView']);

  const platformMock = {
    ready: () => Promise.resolve(),
  };

  const eventsServiceMock = {
    publish: () => {},
    get: () => {
      return { subscribe: () => {} };
    }
  };

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const poStorageSpyObj = jasmine.createSpyObj('PoStorageService', ['remove', 'get']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: Platform, useValue: platformMock },
        { provide: Router, useValue: routerSpyObj },
        { provide: PoStorageService, useValue: poStorageSpyObj },
        { provide: Events, useValue: eventsServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    poStorageSpy = TestBed.inject(PoStorageService) as jasmine.SpyObj<PoStorageService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the app', async () => {
    spyOn(component,<any> 'isLogged');
    component.ngOnInit();
    expect(component['isLogged']).toHaveBeenCalled();
  });

  // TODO: add more tests!
});
