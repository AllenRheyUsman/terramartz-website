export interface OfferBanner {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
  fromColor?: string;
  toColor?: string;
  delay?: number;
}
