import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Shared Components
import {FileExplorerComponent} from './components/file-explorer/file-explorer.component';
import {FileExplorerModalComponent} from './components/file-explorer-modal/file-explorer-modal.component';
import {SideNavigationComponent} from './components/side-navigation/side-navigation.component';
import {AlertComponent} from './components/alert/alert.component';
// Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PdfMarkerErrorInterceptorService} from '@sharedModule/services/pdf-marker-error-interceptor.service';
import {AssignmentListComponent} from '@sharedModule/components/assignment-list/assignment-list.component';
import {AssignmentService} from '@sharedModule/services/assignment.service';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {YesAndNoConfirmationDialogComponent} from './components/yes-and-no-confirmation-dialog/yes-and-no-confirmation-dialog.component';
import {MarkingCommentModalComponent} from './components/marking-comment-modal/marking-comment-modal.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

const SHARED_MODULES = [
  MatToolbarModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatTooltipModule,
  MatListModule,
  MatSidenavModule,
  MatInputModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatSelectModule,
  MatExpansionModule,
  MatDialogModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  DragDropModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatSnackBarModule
];

const SHARED_COMPONENTS = [FileExplorerComponent, FileExplorerModalComponent, AlertComponent, SideNavigationComponent, SnackBarComponent];

@NgModule({
  declarations: [FileExplorerComponent, FileExplorerModalComponent, AlertComponent, AssignmentListComponent, SideNavigationComponent, YesAndNoConfirmationDialogComponent, MarkingCommentModalComponent, SnackBarComponent ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PdfMarkerErrorInterceptorService, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    AssignmentService
  ],
  exports: [ ...SHARED_MODULES, ...SHARED_COMPONENTS ],
  entryComponents: [ FileExplorerModalComponent, YesAndNoConfirmationDialogComponent, MarkingCommentModalComponent, SnackBarComponent ],
})
export class SharedModule { }
