import {DEFAULT_CONFIG} from "./locales";

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
  mduiModal: any,
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

interface Alias {
  regexp: string;
  values: string[];
}

interface Game {
  // 最终结果
  answer: Character;
  // 过程数据
  data: GuessItem[];
  // 提交前的检查
  preSubmitCheck?: () => boolean | undefined;
  // 插入过程数据
  insertItem: (newItem: Character) => GuessItem[];
  // 初始化
  init: () => void;
  // 是否胜利
  isWin: boolean;
  // 判断是否胜利
  judgeWin: (data: GuessItem[]) => boolean;
  // 判断是否游戏结束
  judgeOver: (data: GuessItem[]) => boolean;
  // 是否游戏结束
  isOver: boolean;
  // 是否能新建游戏
  canNewGame?: boolean;
  // 新建游戏
  newGame?: () => void;
  // 是否能放弃游戏
  canGiveUp?: boolean;
  // 放弃游戏
  giveUp?: () => void;
  // 游戏结束
  gameOver: (newData: GuessItem[]) => void;
  // 游戏提示语
  gameTip: (config: typeof DEFAULT_CONFIG) => JSX.Element;
}
