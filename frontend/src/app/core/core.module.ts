import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ ErrorHandlerComponent],
  exports: [ ErrorHandlerComponent]
})
export class CoreModule { }
