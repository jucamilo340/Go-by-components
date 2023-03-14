export interface IButton {
  className?: string;
  onClick?: any;
  href?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  text: string;
  children?: string;
}
