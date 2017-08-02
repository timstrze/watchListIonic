import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { WatchList } from '../providers/watch-list-service';

@Injectable()
export class Account {

  public accountNickname: string;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public address: string;
  public address2: string;
  public city: string;
  public state: string;
  public postalCode: string;
  public email: string;
  public availableCash: number;

  public WatchLists: Array<WatchList>;
  public WatchList: WatchList;

  constructor(account: Account) {
    // Copy the properties
    Object.keys(account).forEach((key) => {
      this[key] = account[key];
    });
    // Empty the watch lists
    this.WatchLists = [];
    // Fill the watch list array with Casted WatchLists
    account.WatchLists.forEach(watchList => {
      this.WatchLists.push(new WatchList(watchList));
    });
    // Set the default watch list from the first one in the array
    this.WatchList = this.WatchLists[0];
  }

  watchListChanged() {
    console.log(this.WatchList.title);
  }
}
