import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import {AuthenticationService} from '../../services/login/authentication.service';

@Directive({
  selector: '[appPasswordPattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true }]
})
export class PasswordPatternDirective implements Validator {

  constructor(private authenticationService: AuthenticationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.authenticationService.patternValidator()(control);
  }
}
