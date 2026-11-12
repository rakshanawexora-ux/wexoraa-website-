export type ClientStory = {
  company: string;
  spriteIndex: number;
  dark: boolean;
  quote: string | null;
  author: string | null;
  role: string | null;
};
// Client names supplied by the user. Quotes remain empty until real feedback is supplied.
export const clientStories: ClientStory[] = [
  {
    company: "Intercity Riders",
    spriteIndex: 0,
    dark: true,
    quote: null,
    author: null,
    role: null,
  },
  {
    company: "Oneway Drop Taxi",
    spriteIndex: 1,
    dark: true,
    quote: null,
    author: null,
    role: null,
  },
  {
    company: "TaerG Laundry",
    spriteIndex: 2,
    dark: false,
    quote: null,
    author: null,
    role: null,
  },
  {
    company: "Vlasy Unisex Salon",
    spriteIndex: 3,
    dark: false,
    quote: null,
    author: null,
    role: null,
  },
];
