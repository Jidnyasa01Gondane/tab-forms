import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserProfile } from '../user-profile';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { tap } from 'rxjs';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-intrests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    TitleCasePipe,
    CommonModule,
  ],
  templateUrl: './intrests.component.html',
  styleUrls: ['./intrests.component.css'],
})
export class IntrestsComponent implements OnChanges, OnInit {
  @Input() formData!: UserProfile;
  intresets = ['coding', 'cooking', 'reading', 'dancing', 'travelling'];
  intrestsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private formDataService: FormDataService
  ) {
    this.intrestsForm = this.formBuilder.group({});
    this.intresets.forEach((intrest) => {
      this.intrestsForm.addControl(intrest, this.formBuilder.control(false));
    });
  }
  ngOnInit(): void {
    this.intrestsForm.valueChanges
      .pipe(
        tap((formValues) => {
          const intresets: string[] = [];
          const entries = Object.entries(formValues);
          entries.forEach(([key, value]) => {
            const isPresent = intresets.includes(key);
            if (!isPresent && value) {
              intresets.push(key);
            }
          });
          this.formDataService.formData.update((value: UserProfile) => {
            return { ...value, intresets: [...intresets] };
          });
          this.formDataService.isFormValueValid.update(
            (valid: boolean) => valid && this.intrestsForm.valid
          );
          console.log(this.formDataService.formData());
        })
      )
      .subscribe();
  }

  get formKeys() {
    return Object.keys(this.intrestsForm.controls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'].currentValue && this.formData.intresets.length) {
      this.formData.intresets.forEach((intrest: string) => {
        if (this.intrestsForm.get(intrest)) {
          this.intrestsForm.get(intrest)?.setValue(true);
        } else {
          this.intrestsForm.addControl(
            intrest,
            this.formBuilder.control(false)
          );
        }
      });
    }
  }
}
