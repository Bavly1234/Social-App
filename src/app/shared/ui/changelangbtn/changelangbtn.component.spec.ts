import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelangbtnComponent } from './changelangbtn.component';

describe('ChangelangbtnComponent', () => {
  let component: ChangelangbtnComponent;
  let fixture: ComponentFixture<ChangelangbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangelangbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangelangbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
