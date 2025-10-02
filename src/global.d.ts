// TypeScript definitions for custom elements

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        loading?: 'auto' | 'lazy' | 'eager';
      },
      HTMLElement
    >;
  }
}
