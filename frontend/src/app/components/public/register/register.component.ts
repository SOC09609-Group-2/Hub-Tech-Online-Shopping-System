import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validationError = [];
  isCustomer = true;
  ngOnInit(): void {
  }
  choiceRole(role) {
    if (role != 'customer') {
      this.isCustomer = false;
    } else {
      this.isCustomer = true;
    }
  }


}
