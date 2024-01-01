import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  login_deatils:any
  login:any
  constructor(
    private route : Router
  ) {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    if(!this.login){
      // this.route.navigate(['/']);
      localStorage.clear()
    }
  }
}
