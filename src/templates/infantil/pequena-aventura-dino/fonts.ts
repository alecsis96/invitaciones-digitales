import { Fredoka, Nunito_Sans } from 'next/font/google';

const heading = Fredoka({ subsets: ['latin'], display: 'swap', variable: '--dino-heading' });
const body = Nunito_Sans({ subsets: ['latin'], display: 'swap', variable: '--dino-body' });

export const dinoFonts = `${heading.variable} ${body.variable}`;
