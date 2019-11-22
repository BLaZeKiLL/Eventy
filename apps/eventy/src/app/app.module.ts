import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatCardModule, MatDividerModule, MatTooltipModule, MatToolbarModule, MatMenuModule, MatTabsModule, MatDialogModule, MatDatepickerModule, MatSnackBarModule, MatNativeDateModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventBoardComponent } from './event-board/event-board.component';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, EventBoardComponent, AddEventComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    NgScrollbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [AddEventComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
