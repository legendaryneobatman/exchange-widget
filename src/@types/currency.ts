export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: string | null;
  buy: boolean;
  sell: boolean;
}
