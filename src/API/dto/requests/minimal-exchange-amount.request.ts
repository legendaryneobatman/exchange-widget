export interface MinimalExchangeAmountRequest {
    fromCurrency: string;
    toCurrency: string;
    fromNetwork?: string;
    toNetwork?: string;
    flow?: string
}
