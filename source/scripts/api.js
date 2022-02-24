const GET_ONE_CURRENCY_SOURCE = 'http://api.nbp.pl/api/exchangerates/rates/';
const GET_ALL_CURRENCY_SOURCE = 'http://api.nbp.pl/api/exchangerates/tables/';
const BASI_TABLE_CODE = 'c';

// API souerce - http://api.nbp.pl/

// {table} – typ tabeli (A, B, lub C)
// {code} – trzyliterowy kod waluty (standard ISO 4217)

// format JSON: nagłówek Accept: application/json lub parameter ?format=json
// format XML: nagłówek Accept: application/xml lub parameter ?format=xml

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

