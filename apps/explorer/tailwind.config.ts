import type { Config } from 'tailwindcss';
import preset from '@salychain/ui/tailwind-preset';

const config: Config = {
  presets: [preset as Config],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@salychain/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
