const GET_DATA_SOURCE = 'http://api.nbp.pl/api/exchangerates/tables/b/';

// http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/


const getOneCurrency = (code, table = 'c') => fetch(`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/?format=json`, {
    Accept: 'application/json'
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
});

export { getOneCurrency };

