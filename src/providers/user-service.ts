import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { XHRBackend, BrowserXhr, ResponseOptions, CookieXSRFStrategy, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { Account } from '../providers/account-service';
import { TickerSymbol } from '../providers/ticker-symbol-service';

@Injectable()
export class User {

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

  public Accounts: Array<Account>;
  public Account: Account;

  private http: Http;

  constructor() {
    let browserXhr: BrowserXhr = new BrowserXhr();
    let baseResponseOptions: ResponseOptions = new ResponseOptions();
    let xsrfStrategy: CookieXSRFStrategy = new CookieXSRFStrategy();
    let backend: XHRBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
    let requestOptions: RequestOptions = new RequestOptions();
    this.http = new Http(backend, requestOptions);
  }

  castObjects(obj) {
    // Copy the properties over
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
    // Set the Accounts as an empty array
    this.Accounts = [];
    // Loop over the non classed accounts
    obj.Accounts.forEach(account => {
      // Create new account classes and added them to the array
      this.Accounts.push(new Account(account));
    });
    // Set the default account from the first one in the user accounts
    this.Account = this.Accounts[0];
    // Load the symbol data for the watchlist
    this.Account.WatchList.load()
      .then((fullSymbols: Array<TickerSymbol>) => {
        // Link the symbols so they reference the new data
        this.Account.WatchList.linkSymbols(fullSymbols, this.Account.WatchList.Symbols);
      });
  };

  accountChanged() {
    console.log(this.Account.accountNickname);
  };

  load() {
    // don't have the data yet
    return new Promise(resolve => {
      // Get the user data
      this.http.get('json/user.json')
        .map(res => res.json())
        .subscribe(obj => {
          // Load the data from the api for the watch list symbols
          this.castObjects(obj);
          // Return the User class
          resolve(this);
        });
    });
  };
}
