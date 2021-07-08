import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import {AuthenticationService} from '../../services/login/authentication.service';

@Directive({
  selector: '[appPasswordPattern2]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordPattern2Directive, multi: true }]
})
export class PasswordPattern2Directive implements Validator {

  constructor(private authenticationService: AuthenticationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.authenticationService.patternValidator2()(control);
  }
}
