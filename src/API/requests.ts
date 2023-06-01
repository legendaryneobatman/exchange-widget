
import {EstimatedExchangeAmountRequest} from "@/API/dto/requests/estimated-exchange-amount.request";
import {MinimalExchangeAmountRequest} from "@/API/dto/requests/minimal-exchange-amount.request";
import {EstimatedExchangeAmountResponse} from "@/API/dto/response/estimated-exchange-amount.response";
import {ListOfAvailableCurrenciesResponse} from "@/API/dto/response/list-of-available-currencies.reponse";
import {MinimalExchangeAmountResponse} from "@/API/dto/response/minimal-exchange-amount.response";

const networkError = (ticker: string) => ({
  error: "not_valid_params",
  message: `Please specify network for currency ${ticker}`,
});

const baseURL = "https://api.changenow.io/v2/exchange/";
const init = {
  method: "GET",
  headers: {
    "x-changenow-api-key":
      "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
  },
};


const fetchData = function <T>(
  entity: string,
  params?: object,
): Promise<T> {
  const searchParams = new URLSearchParams({ ...{ flow: 'standard' }, ...params });

  return new Promise((resolve, reject) => {
    fetch(`${baseURL}${entity}?${searchParams}`, init)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};

export const fetchCurrencyList = () => {
  return fetchData<ListOfAvailableCurrenciesResponse>("currencies");
};

// TODO
export const fetchMinimalExchangeAmount = (params: MinimalExchangeAmountRequest) => {
  return fetchData<MinimalExchangeAmountResponse>(
    "min-amount",
      params
  );
};
export const fetchEstimatedExchangeAmount = (params: EstimatedExchangeAmountRequest) => {
  return fetchData<EstimatedExchangeAmountResponse>(
    "estimated-amount",
      params
  );
};
