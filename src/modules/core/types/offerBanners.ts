export interface OfferBanner {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
  fromColor?: string;
  toColor?: string;
  delay?: number;
}

export interface CallToAction {
  title: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href?: string;
  };
}
export interface BannerSectionProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  backgroundColor?: string;
  showButtons?: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  showStats?: boolean;
  statsData?: { number: string; label: string }[];
  reverse?: boolean; // swap text/image order
}
