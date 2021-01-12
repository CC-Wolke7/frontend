import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchRequestPage } from './search-request.page';

describe('SearchRequestPage', () => {
  let component: SearchRequestPage;
  let fixture: ComponentFixture<SearchRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
