import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './components/start-page/start-page.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ StartPageComponent, UserInputComponent ],
    exports: [
        StartPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class StartPageModule {
}
