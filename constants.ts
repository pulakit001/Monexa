import { Theme } from './types';

export const THEMES: Theme[] = [
  { id: 'ink-white', name: 'Paper', bg: 'bg-white', text: 'text-black', border: 'border-black', accent: 'bg-black', chartStroke: '#000000' },
  { id: 'ink-black', name: 'Void', bg: 'bg-black', text: 'text-white', border: 'border-white', accent: 'bg-white', chartStroke: '#ffffff' },
  { id: 'terminal-green', name: 'Matrix', bg: 'bg-black', text: 'text-green-500', border: 'border-green-500', accent: 'bg-green-500', chartStroke: '#22c55e' },
  { id: 'terminal-amber', name: 'Amber', bg: 'bg-stone-900', text: 'text-amber-500', border: 'border-amber-500', accent: 'bg-amber-500', chartStroke: '#f59e0b' },
  { id: 'blueprint', name: 'Blueprint', bg: 'bg-blue-900', text: 'text-blue-100', border: 'border-blue-300', accent: 'bg-blue-300', chartStroke: '#93c5fd' },
  { id: 'grayscale', name: 'Newsprint', bg: 'bg-stone-200', text: 'text-stone-800', border: 'border-stone-600', accent: 'bg-stone-600', chartStroke: '#44403c' },
  { id: 'high-contrast', name: 'Hi-Con', bg: 'bg-yellow-300', text: 'text-black', border: 'border-black', accent: 'bg-black', chartStroke: '#000000' },
  { id: 'red-alert', name: 'Panic', bg: 'bg-red-950', text: 'text-red-500', border: 'border-red-500', accent: 'bg-red-500', chartStroke: '#ef4444' },
  { id: 'solarized-light', name: 'Solar', bg: 'bg-[#fdf6e3]', text: 'text-[#657b83]', border: 'border-[#b58900]', accent: 'bg-[#b58900]', chartStroke: '#b58900' },
  { id: 'solarized-dark', name: 'Eclipse', bg: 'bg-[#002b36]', text: 'text-[#839496]', border: 'border-[#2aa198]', accent: 'bg-[#2aa198]', chartStroke: '#2aa198' },
  { id: 'tokyo-night', name: 'Neon', bg: 'bg-[#1a1b26]', text: 'text-[#7aa2f7]', border: 'border-[#bb9af7]', accent: 'bg-[#bb9af7]', chartStroke: '#7aa2f7' },
  { id: 'gruvbox', name: 'Gruv', bg: 'bg-[#282828]', text: 'text-[#ebdbb2]', border: 'border-[#d79921]', accent: 'bg-[#d79921]', chartStroke: '#ebdbb2' },
  { id: 'synthwave', name: 'Synth', bg: 'bg-[#2b213a]', text: 'text-[#ff71ce]', border: 'border-[#01cdfe]', accent: 'bg-[#05ffa1]', chartStroke: '#ff71ce' },
  { id: 'monokai', name: 'Code', bg: 'bg-[#272822]', text: 'text-[#f8f8f2]', border: 'border-[#a6e22e]', accent: 'bg-[#f92672]', chartStroke: '#66d9ef' },
  { id: 'nord', name: 'Arctic', bg: 'bg-[#2e3440]', text: 'text-[#eceff4]', border: 'border-[#88c0d0]', accent: 'bg-[#81a1c1]', chartStroke: '#88c0d0' },
  { id: 'dracula', name: 'Vamp', bg: 'bg-[#282a36]', text: 'text-[#f8f8f2]', border: 'border-[#bd93f9]', accent: 'bg-[#ff79c6]', chartStroke: '#bd93f9' },
  { id: 'slate', name: 'Slate', bg: 'bg-slate-800', text: 'text-slate-200', border: 'border-slate-500', accent: 'bg-slate-400', chartStroke: '#94a3b8' },
  { id: 'purple-rain', name: 'Royal', bg: 'bg-purple-950', text: 'text-purple-200', border: 'border-purple-400', accent: 'bg-purple-400', chartStroke: '#c084fc' },
  { id: 'forest', name: 'Ranger', bg: 'bg-green-950', text: 'text-green-100', border: 'border-green-600', accent: 'bg-green-500', chartStroke: '#4ade80' },
  { id: 'ghost', name: 'Ghost', bg: 'bg-gray-100', text: 'text-gray-300', border: 'border-gray-300', accent: 'bg-gray-400', chartStroke: '#d1d5db' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' }
].sort((a, b) => a.code.localeCompare(b.code));

export const formatCurrency = (amount: number, currencyCode: string = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
  } catch (e) {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
};