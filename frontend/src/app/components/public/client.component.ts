import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/login/authentication.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  search(data) {
    const keyword = data.target.value;
    this.router.navigate(['/search', keyword ]);
  }
}
