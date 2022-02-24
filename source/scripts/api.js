const GET_ONE_CURRENCY_SOURCE = 'http://api.nbp.pl/api/exchangerates/rates/';
const GET_ALL_CURRENCY_SOURCE = 'http://api.nbp.pl/api/exchangerates/tables/';
const BASI_TABLE_CODE = 'c';

// {table} – typ tabeli (A, B, lub C)
// {code} – trzyliterowy kod waluty (standard ISO 4217)

const getOneCurrency = (code, table = BASI_TABLE_CODE) => fetch(`${GET_ONE_CURRENCY_SOURCE}${table}/${code}/?format=json`, {
    Accept: 'application/json'
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
});

const getAllCurrency = (table = BASI_TABLE_CODE) => fetch(`${GET_ALL_CURRENCY_SOURCE}${table}/?format=json`, {
    Accept: 'application/json'
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
});

export { getOneCurrency, getAllCurrency };

