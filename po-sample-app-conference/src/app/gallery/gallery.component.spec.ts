import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoStorageService } from '@po-ui/ng-storage';
import { PoSyncService } from '@po-ui/ng-sync';
import { GalleryComponent } from './gallery.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    const poSyncSpyObj = jasmine.createSpyObj('PoSyncService', ['getModel']);
    const poStorageSpyObj = jasmine.createSpyObj('PoStorageService', ['remove', 'get']);

    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      imports: [],
      providers: [
        { provide: PoSyncService, useValue: poSyncSpyObj },
        { provide: PoStorageService, useValue: poStorageSpyObj },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
