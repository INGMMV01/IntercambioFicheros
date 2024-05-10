import { CommonModule, DatePipe } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoButtonsModule } from '@morphe/material/buttons';
import { MatMenuModule } from '@angular/material/menu';
import { MoComponentsModule } from '@morphe/material/components';
import { MoDirectivesModule } from '@morphe/material/directives';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CargandoComponent } from './cargando/cargando.component';
import { ErrorDialogComponent } from './errores/error-dialog/error-dialog.component';
import { MyErrorHandlerService } from './errores/my-error-handler.service';
import { InputCodeResolverComponent } from './input-code-resolver/input-code-resolver.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ValidacionSnackbarComponent } from './validacion-snackbar/validacion-snackbar.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatTableModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MoComponentsModule,
        MoButtonsModule,
        MatMenuModule,
        MoDirectivesModule,
        MatChipsModule,
        MatExpansionModule,
        MatToolbarModule
    ],
    declarations: [
        CargandoComponent,
        ErrorDialogComponent,
        InputCodeResolverComponent,
        ValidacionSnackbarComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatTableModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MoComponentsModule,
        MoButtonsModule,
        MatMenuModule,
        MoDirectivesModule,
        CargandoComponent,
        MatChipsModule,
        MatToolbarModule,
        MatExpansionModule,
        InputCodeResolverComponent,
        ValidacionSnackbarComponent
    ],
    entryComponents: [
        ErrorDialogComponent,
    ],
    providers: [
        DatePipe,
        {
            provide: ErrorHandler,
            useClass: MyErrorHandlerService
        }]
})
export class SharedModule { }
