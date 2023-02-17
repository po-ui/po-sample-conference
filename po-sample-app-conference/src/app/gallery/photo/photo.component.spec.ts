import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";


import { PoStorageService } from '@po-ui/ng-storage';
import { PoSyncService } from '@po-ui/ng-sync';
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;


  beforeEach(async () => {
    const poSyncSpyObj = jasmine.createSpyObj('PoSyncService', ['getModel']);
    const poStorageSpyObj = jasmine.createSpyObj('PoStorageService', ['remove', 'get']);

    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: PoSyncService, useValue: poSyncSpyObj },
        { provide: PoStorageService, useValue: poStorageSpyObj }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
