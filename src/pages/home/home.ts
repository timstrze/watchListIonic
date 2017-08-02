import { Component } from '@angular/core';
import { User } from '../../providers/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [User]
})
export class HomePage {

  public User: User = new User();

  constructor() {
    // Load the User data
    this.User.load();
  }

  getItems(ev: any) {

  };

}
