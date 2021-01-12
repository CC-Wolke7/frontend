import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPreviewPage } from './search-preview.page';

describe('SearchPreviewPage', () => {
  let component: SearchPreviewPage;
  let fixture: ComponentFixture<SearchPreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
