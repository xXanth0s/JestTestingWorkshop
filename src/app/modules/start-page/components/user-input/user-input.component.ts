import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-input',
    templateUrl: './user-input.component.html',
    styleUrls: [ './user-input.component.scss' ]
})
export class UserInputComponent {

    @Output()
    public formSubmitted = new EventEmitter<{ email: string, name: string }>();

    public readonly form = new FormGroup({
        email: new FormControl('', { validators: [ Validators.required, Validators.email ] }),
        name: new FormControl('', { validators: [ Validators.required ] })
    });

    public submitForm(): void {
        this.formSubmitted.emit(this.form.value);
    }
}
