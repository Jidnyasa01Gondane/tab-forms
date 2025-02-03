import { NgComponentOutlet, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfile } from '../user-profile';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  imports: [NgFor, NgComponentOutlet, MatTabsModule],
})
export class TabsComponent implements OnInit {
  @Input({ required: true }) tabs: { name: string; component: any }[] = [];
  @Output() tabChanged = new EventEmitter<UserProfile>();

  formDataValue: UserProfile;
  constructor(private formDataSerive: FormDataService) {
    this.formDataValue = this.formDataSerive.formData();
  }

  ngOnInit() {}

  changeSelection(event: number) {
    this.formDataSerive.activeTabIndex.set(event);
    this.tabChanged.emit(this.formDataSerive.formData());
  }
}
