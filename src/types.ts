export interface TransferQuote {
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  fee: number;
  deliveryMethod: 'bank' | 'cash' | 'wallet';
  estimatedTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface TransferStatus {
  trackingCode: string;
  senderName: string;
  recipientName: string;
  amountSent: string;
  amountReceived: string;
  status: 'processing' | 'in_transit' | 'delivered';
  date: string;
  destinationCountry: string;
}
