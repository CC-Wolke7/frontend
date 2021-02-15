import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOfferComponent } from './edit-offer.component';

describe('EditOfferComponent', () => {
  let component: EditOfferComponent;
  let fixture: ComponentFixture<EditOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOfferComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
