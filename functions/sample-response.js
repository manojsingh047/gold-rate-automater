//CurrencyAPI
// https://metals-api.com/api/convert?access_key=<<ACCESS_KEY>>&from=USD&to=INR&amount=1
const metalsApiCurrencyRes = {
  success: true,
  query: {
    from: "USD",
    to: "INR",
    amount: "1",
  },
  info: {
    timestamp: 1598293200,
    rate: 74.18066151276,
  },
  historical: false,
  date: "2020-08-24",
  result: 74.18066151276,
  unit: "per ounce",
};

//GoldAPI
//"https://metals-api.com/api/latest?access_key=<<ACCESS_KEY>>&base=INR&symbols=XAU"
const metalsApiGoldRes = {
  success: true,
  timestamp: 1598292180,
  date: "2020-08-24",
  base: "INR",
  rates: {
    XAU: 143115.93219513196,
  },
  unit: "per ounce",
};

// https://www.goldapi.io/dashboard
const goldApiGoldRes = {
  timestamp: 1598379690,
  metal: "XAU",
  currency: "INR",
  exchange: "IDC",
  symbol: "FX_IDC:XAUINR",
  prev_close_price: 142838.9,
  open_price: 143189.4,
  low_price: 142134.1,
  high_price: 144111.1,
  open_time: 1598306400,
  price: 142323.1,
  ch: -515.8,
  chp: -0.36,
  ask: 142333.1,
  bid: 142323.1,
};
