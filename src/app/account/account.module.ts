import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from "./account-routing.module";
import { ComponentsModule } from "../shared/components.module";
import { DataTablesModule } from "angular-datatables";
import { PipesModule } from "../shared/pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { EditNotificationComponent } from "./notifications/notification/edit-notification.component";
import { NewNotificationComponent } from './notifications/notification/new-notification.component';
import { NotificationsComponent } from "./notifications/notifications.component";
import { AccountComponent } from "./account.component";
import { UiSettingsComponent } from './settings/ui-settings/ui-settings.component';
import { AccountSettingsComponent } from "./settings/acc-settings/acc-settings.component";


import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    NewNotificationComponent,
    AccountSettingsComponent,
    NotificationsComponent,
    UiSettingsComponent,
    AccountComponent,
    EditNotificationComponent
  ],
  imports: [
    AccountRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule,
    ComponentsModule,
    RouterModule,
    CommonModule,
    PipesModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class AccountModule { }
