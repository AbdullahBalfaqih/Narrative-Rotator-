declare module 'viem/accounts' {
  export function generateMnemonic(wordlist: string[], strength?: number): string;
  export function mnemonicToAccount(mnemonic: string, opts?: Record<string, any>): any;
  export const english: string[];
  export const czech: string[];
  export const french: string[];
  export const italian: string[];
  export const japanese: string[];
  export const korean: string[];
  export const portuguese: string[];
  export const simplifiedChinese: string[];
  export const spanish: string[];
  export const traditionalChinese: string[];
}

declare module 'viem/utils' {
  export function toHex(value: any, opts?: Record<string, any>): `0x${string}`;
}

declare module 'viem/chains' {
  interface Chain {
    id: number;
    name: string;
    network: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
    rpcUrls: { default: { http: string[] } };
    [key: string]: any;
  }
  export const mainnet: Chain;
  export const sepolia: Chain;
}
