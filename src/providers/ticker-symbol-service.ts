import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TickerSymbol {

  public AfterHoursChangeRealtime: string;
  public AnnualizedGain: string;
  public Ask: number;
  public AskRealtime: string;
  public AverageDailyVolume: number;
  public Bid: number;
  public BidRealtime: string;
  public BookValue: number;
  public Change: string;
  public ChangeFromFiftydayMovingAverage: number;
  public ChangeFromTwoHundreddayMovingAverage: number;
  public ChangeFromYearHigh: number;
  public ChangeFromYearLow: number;
  public ChangePercentRealtime: string;
  public ChangeRealtime: string;
  public Change_PercentChange: string;
  public ChangeinPercent: string;
  public Commission: string;
  public Currency: string;
  public DaysHigh: number;
  public DaysLow: number;
  public DaysRange: string;
  public DaysRangeRealtime: string;
  public DaysValueChange: string;
  public DaysValueChangeRealtime: string;
  public DividendPayDate: string;
  public DividendShare: number;
  public DividendYield: number;
  public EBITDA: number;
  public EPSEstimateCurrentYear: number;
  public EPSEstimateNextQuarter: number;
  public EPSEstimateNextYear: number;
  public EarningsShare: number;
  public ErrorIndicationreturnedforsymbolchangedinvalid: string;
  public ExDividendDate: string;
  public FiftydayMovingAverage: number;
  public HighLimit: string;
  public HoldingsGain: string;
  public HoldingsGainPercent: string;
  public HoldingsGainPercentRealtime: string;
  public HoldingsGainRealtime: string;
  public HoldingsValue: string;
  public HoldingsValueRealtime: string;
  public LastTradeDate: string;
  public LastTradePriceOnly: string;
  public LastTradeRealtimeWithTime: string;
  public LastTradeTime: string;
  public LastTradeWithTime: string;
  public LowLimit: string;
  public MarketCapRealtime: string;
  public MarketCapitalization: number;
  public MoreInfo: string;
  public Name: string;
  public Notes: string;
  public OneyrTargetPrice: number;
  public Open: number;
  public OrderBookRealtime: string;
  public PEGRatio: number;
  public PERatio: number;
  public PERatioRealtime: number;
  public PercebtChangeFromYearHigh: number;
  public PercentChange: string;
  public PercentChangeFromFiftydayMovingAverage: string;
  public PercentChangeFromTwoHundreddayMovingAverage: string;
  public PercentChangeFromYearLow: string;
  public PreviousClose: number;
  public PriceBook: number;
  public PriceEPSEstimateCurrentYear: number;
  public PriceEPSEstimateNextYear: number;
  public PricePaid: string;
  public PriceSales: number;
  public SharesOwned: string;
  public ShortRatio: number;
  public StockExchange: string;
  public Symbol: string;
  public TickerTrend: string;
  public TradeDate: string;
  public TwoHundreddayMovingAverage: number;
  public Volume: number;
  public YearHigh: number;
  public YearLow: number;
  public YearRange: string;
  public symbol: string;

  constructor(tickerSymbol: TickerSymbol) {
    // Copy the properties
    Object.keys(tickerSymbol).forEach((key) => {
      this[key] = tickerSymbol[key];
    });
  }
}
