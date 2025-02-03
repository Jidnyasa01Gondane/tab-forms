import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserProfile } from '../user-profile';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() formData!: UserProfile;
  profileForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private formDataService: FormDataService
  ) {
    this.profileForm = this.formBuilder.group({
      name: new FormControl('', [Validators.minLength(2), Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'].currentValue) {
      this.profileForm.patchValue(this.formData);
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit() {
    this.profileForm.valueChanges
      .pipe(
        tap((formValues) => {
          this.formDataService.formData.update((prevValue: UserProfile) => {
            return { ...prevValue, ...formValues };
          });
          this.formDataService.isFormValueValid.update(
            (valid: boolean) => valid && this.profileForm.valid
          );
          console.log(this.formDataService.formData());
        })
      )
      .subscribe();
  }
}
