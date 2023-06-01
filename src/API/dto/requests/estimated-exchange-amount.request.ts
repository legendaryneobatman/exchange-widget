export interface EstimatedExchangeAmountRequest {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    toAmount?: number;
    fromNetwork?: string;
    toNetwork?: string;
    flow?: string;
    type?: string;
    useRateId?: boolean;
    isTopUp?: boolean;
}
