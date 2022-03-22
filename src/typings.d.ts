declare module '*.json' {
  const value: any;
  export default value;
}

interface Window {
  magic: any,
  moment: any,
  React: any,
  ReactDOM: any,
  mdui: any,
  _hmt: any,
  axios: any,
}

interface Character {
  className: string[];
  name: string;
  en: string;
  race: string;
  rarity: number;
  key: string;
  team: string[];
  painter: string;

  [key: string]: any;
}

interface GuessItem {
  guess: Character,

  [key: string]: any
}
