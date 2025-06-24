import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BekkiComponent } from './bekki.component';

describe('BekkiComponent', () => {
  let component: BekkiComponent;
  let fixture: ComponentFixture<BekkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BekkiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BekkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
