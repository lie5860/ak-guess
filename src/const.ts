export const DAILY_MODE = 'DAILY_MODE'
export const PARADOX_MODE = 'PARADOX_MODE'
export const RANDOM_MODE = 'RANDOM_MODE'
export const modeI18nKeyDict: { [key: string]: string } = {
  [DAILY_MODE]: 'dailyMode',
  [PARADOX_MODE]: 'paradoxMode',
  [RANDOM_MODE]: 'randomMode',
}
export const reportKeyDict: { [key: string]: string } = {
  [DAILY_MODE]: 'daily',
  [PARADOX_MODE]: 'paradox',
  [RANDOM_MODE]: 'random',
}
export const MAIN_KEY = 'name'
export const COLUMNS = [
  {label: '稀有度', i18nKey: 'rarity', key: 'rarity', type: 'number'},
  {label: '阵营', i18nKey: 'camp', key: 'team', type: 'array'},
  {label: '职业', i18nKey: 'className', key: 'className', type: 'array'},
  {label: '种族', i18nKey: 'race', key: 'race', type: 'array'},
  {label: '画师', i18nKey: 'painter', key: 'painter', type: 'string'}
]
export const TYPES = [
  ...COLUMNS,
  {label: '干员', i18nKey: 'chartsName', key: 'guess', type: 'guess'}
]
export const VAL_DICT: { [key: string]: string } = {
  'correct': '🟩',
  'wrong': '🟥',
  'wrongpos': '🟨',
  'up': '🔼',
  'down': '🔽',
}
export const NOT_NAME_VAL_DICT: { [key: string]: string } = {
  'correct': '🟩',
  'wrong': '🟥',
  'wrongpos': '🟨',
  'up': '🟦',
  'down': '🟦',
}
export const DEFAULT_TRY_TIMES = 8;

export const CONTRIBUTORS = [
  {
    icon: 'code',
    title: 'Developers',
    userList: [
      {
        name: 'lie',
        homeUrl: 'https://github.com/lie5860',
        avatar: '//avatars.githubusercontent.com/u/30894657'
      },
      {
        name: 'YOYO',
        homeUrl: 'https://github.com/lindsayee',
        avatar: '//avatars.githubusercontent.com/u/4250090',
        tip: 'LOVE WHISLASH'
      },
      {
        name: 'Rain',
        homeUrl: 'https://github.com/yukanana',
        avatar: '//avatars.githubusercontent.com/u/10300433',
        tip: 'QA'
      },
    ]
  },
  {
    icon: 'g_translate',
    title: 'Translators',
    userList: [
      {
        name: '圈',
        homeUrl: 'https://twitter.com/mirukudonatu',
        avatar: '//akguess.saki.cc/images/translator_mirukudonatu.jpg',
        tip: 'JPN'
      },
      {
        name: 'Petris',
        homeUrl: 'https://twitter.com/PetrisWhite',
        avatar: '//akguess.saki.cc/images/translator_petris.jpg',
        tip: 'ENG'
      },
      {
        name: 'shana1224',
        homeUrl: 'https://twitter.com/hasaki1224',
        avatar: '//akguess.saki.cc/images/translator_shana1224.jpg',
        tip: 'JPN'
      },
      {
        name: 'Tamamo Tomato',
        homeUrl: 'https://twitter.com/Tamamo35638628',
        avatar: '//akguess.saki.cc/images/translator_tamato.jpg',
        tip: 'ENG'
      },
      {
        name: 'lucaslucaslucaslu',
        avatar: '//akguess.saki.cc/images/translator_lucaslucaslucaslu.jpg',
        tip: 'ENG'
      },
    ]
  }
]

// Storage keys (language-aware wrappers may prepend/append language codes)
export const STORAGE = {
  LANG: '__lang',
  FIRST_OPEN: 'firstOpen',
  FIRST_OPEN_PARADOX: 'firstOpenParadox',
  RANDOM_DATA: 'r-randomData',
  RANDOM_ANSWER_KEY: 'r-randomAnswerKey',
  GIVE_UP: 'giveUp',
  PARADOX_DATA: 'paradoxData',
  DAILY_DATA: 'dailyData',
  DAY_DATA_SUFFIX: 'dayData',
  CLOSE_PWA: 'close-pwa',
  UUID: 'UUID'
} as const;

// Moment timezone and date formats
export const TZ_ASIA_SHANGHAI = 'Asia/Shanghai';
export const DATE_FMT = 'YYYY-MM-DD';
export const DATE_TIME_FMT = 'YYYY-MM-DD HH:mm:ss';

// Result value strings
export const RESULT = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  WRONG_POS: 'wrongpos',
  UP: 'up',
  DOWN: 'down'
} as const;

// XState/Event names
export const EVENTS = {
  INIT: 'INIT',
  SUBMIT_GUESS: 'SUBMIT_GUESS',
  NEW_GAME: 'NEW_GAME',
  GIVE_UP: 'GIVE_UP',
  GAME_OVER: 'GAME_OVER',
  RETRY: 'RETRY'
} as const;

// API endpoints
export const API_BASE = '//akapi.saki.cc';
export const API_REPORT_URL = 'https://akapi.saki.cc/report.php';
export const API_ERROR_REPORT_URL = 'https://akapi.saki.cc/error_report.php';

// Report result types
export const REPORT_RESULT = {
  INIT: 'init',
  WIN: 'win',
  LOSE: 'lose',
  GIVE_UP: 'giveUp'
} as const;

// Paradox stored field names
export const PARADOX_FIELDS = {
  GIVE_UP: 'giveUp',
  DATA: 'data',
  REST_LIST: 'restList'
} as const;
