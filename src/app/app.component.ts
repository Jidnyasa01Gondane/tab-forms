import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { IntrestsComponent } from './intrests/intrests.component';
import { SettingsComponent } from './settings/settings.component';
import { UserProfile } from './user-profile';
import { FormDataService } from './form-data.service';
import { tap } from 'rxjs';
import { TabsComponent } from './tabs/tabs.component';
import { JsonPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TabsComponent,
    JsonPipe,
    TitleCasePipe,
    KeyValuePipe,
    MatButtonModule,
  ],
  providers: [FormDataService],
  templateUrl: './app.component.html',
  styles: `
  .form-action{
    display: flex;
    flex-direction: row-reverse;
    justify-content: end;
    padding: 20px;
  }
  `,
})
export class AppComponent {
  tabs = [
    { name: 'Profile', component: ProfileComponent },
    { name: 'Intrests', component: IntrestsComponent },
    { name: 'Settings', component: SettingsComponent },
  ];
  selectedIndex = 0;
  formDataValues!: UserProfile;

  constructor(public formDataService: FormDataService) {
    this.formDataService.activeTabIndex$
      .pipe(tap((value: number) => (this.selectedIndex = value)))
      .subscribe();
    this.formDataService.formData$
      .pipe(tap((value: UserProfile) => (this.formDataValues = value)))
      .subscribe();
  }

  showFormData() {
    this.formDataValues = this.formDataService.formData();
  }
}
