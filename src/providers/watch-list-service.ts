import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {TickerSymbol} from "./ticker-symbol-service";

import {Http} from "@angular/http";
import {XHRBackend, BrowserXhr, ResponseOptions, CookieXSRFStrategy, RequestOptions} from '@angular/http';

@Injectable()
export class WatchList {

  public Symbols: Array<TickerSymbol>;
  public Symbol: TickerSymbol;
  public title: string;

  private http: Http;

  constructor(watchList: WatchList) {

    let browserXhr: BrowserXhr = new BrowserXhr();
    let baseResponseOptions: ResponseOptions = new ResponseOptions();
    let xsrfStrategy: CookieXSRFStrategy = new CookieXSRFStrategy();
    let backend: XHRBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
    let requestOptions: RequestOptions = new RequestOptions();
    this.http = new Http(backend, requestOptions);

    // Copy the properties over
    Object.keys(watchList).forEach((key) => {
      this[key] = watchList[key];
    });

    // Set the default account from the first one in the user accounts
    this.Symbols = [];

    watchList.Symbols.forEach(symbol => {
      this.Symbols.push(new TickerSymbol(symbol));
    });

    this.Symbol = this.Symbols[0];

  }

  load() {
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (" ' + this.Symbols.map(function (item) {
          return item.symbol.toLowerCase();
        }) + '")&env=store:%2F%2Fdatatables.org%2Falltableswithkeys&format=json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          const response: Array<TickerSymbol> = (data && data.query && data.query.results && data.query.results.quote) ? data.query.results.quote : [];
          // Return the array of Symbols
          resolve(response);
        });
    });
  }

  linkSymbols(fullSymbols: Array<TickerSymbol>, wlSymbols: Array<TickerSymbol>) {
    // Loop through the User.WatchList
    wlSymbols.forEach(function (watchListSymbol) {
      // Loops through the SymbolList
      fullSymbols.forEach(function (smbl) {
        // Check if Symbols match
        if (smbl.symbol.toLowerCase() === watchListSymbol.symbol.toLowerCase()) {
          // Link the Symbol in the User.WatchList to the SymbolList
          Object.keys(smbl).forEach((key) => {
            watchListSymbol[key] = smbl[key];
          });
        }
      });
    });
  }
}
