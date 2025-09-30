import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsistrationComponent } from './regsistration.component';

describe('RegsistrationComponent', () => {
  let component: RegsistrationComponent;
  let fixture: ComponentFixture<RegsistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegsistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegsistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
