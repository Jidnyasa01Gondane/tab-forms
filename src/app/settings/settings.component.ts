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
import { MatRadioModule } from '@angular/material/radio';
import { tap } from 'rxjs';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnChanges {
  @Input() formData!: UserProfile;
  settingForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private formDataService: FormDataService
  ) {
    this.settingForm = this.formBuilder.group({
      theme: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.settingForm.valueChanges
      .pipe(
        tap((formValues) => {
          this.formDataService.formData.update((value: UserProfile) => {
            return { ...value, settings: { ...formValues } };
          });
          this.formDataService.isFormValueValid.update(
            (valid: boolean) => valid && this.settingForm.valid
          );
          console.log(this.formDataService.formData());
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'].currentValue) {
      this.settingForm.get('theme')?.setValue(this.formData.settings.theme);
    }
  }
}
