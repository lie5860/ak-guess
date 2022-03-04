(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reactHello = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "* {\r\n    box-sizing: border-box;\r\n}\r\nbody{\r\n    font-family: \"SansRegular\";\r\n    font-size: 1rem;\r\n    text-align: center;\r\n    color:white;\r\n    margin: 0;\r\n    /*cursor: url(\"./images/cursor.png\")  3 3, default;*/\r\n}\r\n.ak-tab{\r\n    height: 50px;\r\n    display: flex;\r\n    padding: 10px;\r\n}\r\n.ak-tab-item{\r\n    line-height: 2;\r\n    padding-right:10px;\r\n\r\n}\r\n.ak-tab-item::after{\r\n    content:'';\r\n    display: block;\r\n    width: 100%;\r\n    height: 0;\r\n    border-bottom: 2px solid #ffffff;\r\n    border-bottom-color: #ffffff;\r\n}\r\n.ak-tab-item.active::after{\r\n    border-bottom-color: #22bbff;\r\n}\r\n.main-container {\r\n    position: static;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100vw;\r\n    height: 100vh;\r\n    transition: transform 0.6s;\r\n    background-color: rgba(0, 0, 0, 0.88);\r\n    background-image: url(\"../images/bg.jpg\");\r\n    background-size: cover;\r\n    background-position: center bottom;\r\n    overflow: auto;\r\n    -webkit-overflow-scrolling: touch;\r\n}\r\n/*.main-container::before{*/\r\n/*    content: \" \";*/\r\n/*    display: block;*/\r\n/*    position: absolute;*/\r\n/*    top: 0;*/\r\n/*    width: 100%;*/\r\n/*    height: 100%;*/\r\n/*    background-image: url('./images/amy.png');*/\r\n/*    background-repeat: no-repeat;*/\r\n/*    background-position: 0 center;*/\r\n/*    background-size: auto 100%;*/\r\n/*    opacity: 0.1;*/\r\n/*    visibility: visible;*/\r\n/*    transition: opacity 1s 0.6s, null;*/\r\n/*}*/\r\na {\r\n    color: palevioletred;\r\n    cursor: pointer;\r\n}\r\n\r\n.togglec {\r\n    font-size: 19px;\r\n    border-style: solid;\r\n    border-width: 0px;\r\n    color: #fff;\r\n    background-color: #333333;\r\n    padding: 8px;\r\n    margin: 10px;\r\n    font-weight: normal;\r\n    display: inline-block;\r\n    text-decoration: none;\r\n    border-color: #383838;\r\n    border-radius: 10px;\r\n}\r\n.togglec:hover{\r\n    color: #22bbff;\r\n}\r\n.guesses {\r\n    width: 600px;\r\n    margin: 20px auto;\r\n}\r\n\r\n.hint {\r\n    font-weight: bold;\r\n}\r\n\r\n.guess {\r\n    color: palevioletred;\r\n    font-size: 15px;\r\n    -webkit-text-decoration-line: underline;\r\n            text-decoration-line: underline;\r\n}\r\n\r\n.emoji {\r\n    font-size: 50px;\r\n    width:90%;\r\n    height:70px;\r\n    max-width: 65px;\r\n    margin: 0 auto;\r\n    background-size: 100%;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n}\r\n\r\n.row {\r\n    text-align: center;\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: flex-start;\r\n    flex-wrap: wrap;\r\n    flex: 1;\r\n}\r\n\r\n.column {\r\n    display: flex;\r\n    flex-direction: column;\r\n    flex-basis: 100%;\r\n    flex: 1;\r\n    margin-top: auto;\r\n    margin-bottom: auto;\r\n}\r\n\r\n/*the container must be positioned relative:*/\r\n.autocomplete {\r\n    position: relative;\r\n    display: inline-block;\r\n    width: 300px;\r\n}\r\n\r\nimg {\r\n    -o-object-fit: scale-down;\r\n       object-fit: scale-down;\r\n    height: auto;\r\n}\r\n.input-form{\r\n    height: 46px;\r\n    vertical-align: middle;\r\n}\r\n.input-form input {\r\n    vertical-align: middle;\r\n    border: none;\r\n    border-right: 1px solid #000;\r\n    background-color: #f1f1f1;\r\n    padding: 10px;\r\n    font-size: 22px;\r\n    line-height: 1;\r\n}\r\n.guess_input {\r\n    height: 100%;\r\n    color: #000 !important;\r\n    background-color: rgba(255, 255, 255, 1) !important;\r\n}\r\n\r\n.input-form input[type=text] {\r\n    background-color: #f1f1f1;\r\n}\r\n\r\n.autocomplete-items {\r\n    position: absolute;\r\n    border: 1px solid #d4d4d4;\r\n    color: rgb(54, 0, 0);\r\n    border-bottom: none;\r\n    border-top: none;\r\n    z-index: 99;\r\n    /*position the autocomplete items to be the same width as the container:*/\r\n    top: 100%;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n\r\n.autocomplete-items div {\r\n    padding: 10px;\r\n    background-color: #fff;\r\n    border-bottom: 1px solid #d4d4d4;\r\n}\r\n\r\n/*when hovering an item:*/\r\n.autocomplete-items div:hover {\r\n    background-color: #e9e9e9;\r\n}\r\n\r\n/*when navigating through the items using the arrow keys:*/\r\n.autocomplete-active {\r\n    background-color: DodgerBlue !important;\r\n    color: #ffffff;\r\n}\r\n#guess{\r\n    width: 100%;\r\n}\r\n.tooltip {\r\n    color: palevioletred;\r\n    position: relative;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n\r\n.tooltip .tooltiptext, .global-tooltiptext {\r\n    visibility: hidden;\r\n    width: 200px;\r\n    background-color: black;\r\n    border: 3px solid #fff;\r\n    color: #e2e2e2;\r\n    text-align: center;\r\n    border-radius: 6px;\r\n    padding: 15px;\r\n    position: fixed;\r\n    z-index: 1;\r\n    top: 50%;\r\n    left: 50%;\r\n    margin-left: -10px;\r\n    opacity: 0;\r\n    transition: opacity 0.5s;\r\n    transform: translateX(-50%) translateY(-50%);\r\n}\r\n\r\n.tooltip:hover .tooltiptext, .global-tooltiptext {\r\n    visibility: visible;\r\n    opacity: 1;\r\n}\r\n\r\n.title {\r\n    font-weight: bold;\r\n}\r\n\r\n.answer, .input-form, .share-body {\r\n    margin: 20px;\r\n}\r\n\r\n@media screen and (max-width: 450px) {\r\n    body {\r\n        font-size: 16px;\r\n    }\r\n    .guesses{\r\n        width: 100%;\r\n    }\r\n    .autocomplete {\r\n        width: 200px;\r\n    }\r\n}\r\n\r\n.correct {\r\n    background-image: url(\"../images/correct.png\");\r\n}\r\n\r\n\r\n.down {\r\n    background-image: url(\"../images/down.png\");\r\n}\r\n\r\n.up {\r\n    background-image: url(\"../images/up.png\");\r\n}\r\n\r\n.wrong {\r\n    background-image: url(\"../images/wrong.png\");\r\n}\r\n\r\n.wrongpos {\r\n    background-image: url(\"../images/wrongpos.png\");\r\n}\r\n\r\n:root {\r\n    /*    --sl-color-primary-50: 255 248 248;*/\r\n    /*    --sl-color-primary-100: 255 231 231;*/\r\n    /*    --sl-color-primary-200: 254 212 212;*/\r\n    /*    --sl-color-primary-300: 254 191 191;*/\r\n    /*    --sl-color-primary-400: 253 161 161;*/\r\n    /*    --sl-color-primary-500: 252 118 118;*/\r\n    --sl-color-primary-600: 251 50 50;\r\n    /*    --sl-color-primary-700: 208 39 39;*/\r\n    /*    --sl-color-primary-800: 173 32 32;*/\r\n    /*    --sl-color-primary-900: 124 23 23;*/\r\n    /*    --sl-color-primary-950: 78 15 15;*/\r\n\r\n}\r\n.share-icon{\r\n    width: 20px;\r\n    height: 20px;\r\n    stroke: #b4b9c2;\r\n    display: inline-block;\r\n    margin: 3px;\r\n}\r\n.share-icon{\r\n    vertical-align: top;\r\n    line-height: 26px;\r\n}\r\n.share-icon svg line {\r\n    fill: #b4b9c2;\r\n    stroke: #b4b9c2;\r\n    transition: stroke 0.3s;\r\n}\r\n.share-icon svg circle {\r\n    stroke: #b4b9c2;\r\n    fill: #b4b9c2;\r\n    transition: fill 0.3s;\r\n}\r\n";
  styleInject(css_248z);

  var alias = [
  	{
  		regexp: ".*羊.*",
  		values: [
  			"艾雅法拉",
  			"卡涅利安",
  			"蜜蜡"
  		]
  	},
  	{
  		regexp: "(.*姑.*)",
  		values: [
  			"鞭刃"
  		]
  	},
  	{
  		regexp: "42",
  		values: [
  			"史尔特尔"
  		]
  	},
  	{
  		regexp: "76",
  		values: [
  			"琴柳"
  		]
  	},
  	{
  		regexp: "粉毛",
  		values: [
  			"澄闪"
  		]
  	},
  	{
  		regexp: "(.*龙.*)",
  		values: [
  			"伊芙利特"
  		]
  	},
  	{
  		regexp: "(.*爹.*)|(.*赛.*)",
  		values: [
  			"塞雷娅"
  		]
  	},
  	{
  		regexp: "(.*杰.*)",
  		values: [
  			"安洁莉娜"
  		]
  	},
  	{
  		regexp: "(.*爷.*)",
  		values: [
  			"赫拉格"
  		]
  	},
  	{
  		regexp: "(.*狗.*)",
  		values: [
  			"刻俄柏",
  			"嵯峨"
  		]
  	},
  	{
  		regexp: "小僧",
  		values: [
  			"嵯峨"
  		]
  	},
  	{
  		regexp: "FF0",
  		values: [
  			"华法琳"
  		]
  	},
  	{
  		regexp: ".*RUA.*",
  		values: [
  			"白雪"
  		]
  	},
  	{
  		regexp: "海猫",
  		values: [
  			"安哲拉"
  		]
  	},
  	{
  		regexp: "ZC",
  		values: [
  			"乌有"
  		]
  	},
  	{
  		regexp: "光",
  		values: [
  			"铃兰"
  		]
  	}
  ];

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/

    inp.addEventListener("input", function (e) {
      var _a;

      var a,
          i,
          val = this.value;
      /*close any already open lists of autocompleted values*/

      closeAllLists();

      if (!val) {
        return false;
      }

      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/

      this.parentNode.appendChild(a);
      /*for each item in the array...*/

      var inputVal = val.toUpperCase();
      var dealModal = [];
      alias.forEach(function (v) {
        new RegExp(v.regexp).exec(inputVal) && dealModal.push.apply(dealModal, _toConsumableArray(v.values));
      });
      console.log(dealModal, 'dealModal');
      var nameMatchItems = [];
      var aliasMatchItems = [];

      for (i = 0; i < arr.length; i++) {
        var b = void 0;
        /*create a DIV element for each matching element:*/

        b = document.createElement("DIV");
        /*make the matching letters bold:*/

        b.innerHTML = arr[i];
        /*insert a input field that will hold the current array item's value:*/

        var value = arr[i].replace("'", "&#39;");
        b.innerHTML += "<input type='hidden' value='" + value + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/

        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/

          closeAllLists();
        });

        if (arr[i].indexOf(inputVal) !== -1) {
          nameMatchItems.push(b);
        } else if (dealModal.some(function (v) {
          return arr[i].toUpperCase().indexOf(v) !== -1;
        })) {
          aliasMatchItems.push(b);
        }
      }

      (_a = a).append.apply(_a, nameMatchItems.concat(aliasMatchItems)); // [...nameMatchItems,...aliasMatchItems].forEach(v=>a.appendChild(v));

    });
    /*execute a function presses a key on the keyboard:*/

    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");

      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/

        addActive(x);
      } else if (e.keyCode == 38) {
        //up

        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/

        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();

        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/

      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/

      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");

      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/


    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  var dealData = [
  	{
  		className: [
  			"术师",
  			"驭械术师"
  		],
  		name: "澄闪",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "Namie"
  	},
  	{
  		className: [
  			"辅助",
  			"护佑者"
  		],
  		name: "夏栎",
  		team: [
  			"罗德岛"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "YUJI"
  	},
  	{
  		className: [
  			"辅助",
  			"召唤师"
  		],
  		name: "令",
  		team: [
  			"炎",
  			"岁"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"特种",
  			"行商"
  		],
  		name: "老鲤",
  		team: [
  			"鲤氏侦探事务所",
  			"炎",
  			"龙门"
  		],
  		race: "龙",
  		rarity: 5,
  		painter: "KuroBlood"
  	},
  	{
  		className: [
  			"先锋",
  			"战术家"
  		],
  		name: "夜半",
  		team: [
  			"雷姆必拓"
  		],
  		race: "萨弗拉",
  		rarity: 4,
  		painter: "温泉瓜"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "寒芒克洛丝",
  		team: [
  			"罗德岛"
  		],
  		race: "卡特斯",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"辅助",
  			"护佑者"
  		],
  		name: "九色鹿",
  		team: [
  			"炎"
  		],
  		race: "埃拉菲亚",
  		rarity: 4,
  		painter: "IRIS_呓"
  	},
  	{
  		className: [
  			"重装",
  			"驭法铁卫"
  		],
  		name: "暮落",
  		team: [
  			"维多利亚"
  		],
  		race: "斐迪亚",
  		rarity: 4,
  		painter: "Cenm0"
  	},
  	{
  		className: [
  			"辅助",
  			"削弱者"
  		],
  		name: "灵知",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"重装",
  			"决战者"
  		],
  		name: "极光",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "乌萨斯",
  		rarity: 4,
  		painter: "LAL!ROLE"
  	},
  	{
  		className: [
  			"术师",
  			"驭械术师"
  		],
  		name: "耶拉",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "未公开",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "耀骑士临光",
  		team: [
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 5,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "焰尾",
  		team: [
  			"红松骑士团",
  			"卡西米尔"
  		],
  		race: "札拉克",
  		rarity: 5,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"术师",
  			"轰击术师"
  		],
  		name: "蚀清",
  		team: [
  			"哥伦比亚"
  		],
  		race: "斐迪亚",
  		rarity: 4,
  		painter: "Jacknife"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "野鬃",
  		team: [
  			"红松骑士团",
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"医疗",
  			"行医"
  		],
  		name: "蜜莓",
  		team: [
  			"雷姆必拓"
  		],
  		race: "札拉克",
  		rarity: 4,
  		painter: "Liyu黎"
  	},
  	{
  		className: [
  			"术师",
  			"链术师"
  		],
  		name: "布丁",
  		team: [
  			"哥伦比亚"
  		],
  		race: "阿戈尔",
  		rarity: 3,
  		painter: "折射镜"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "正义骑士号",
  		team: [
  			"红松骑士团",
  			"卡西米尔"
  		],
  		race: "",
  		rarity: 0,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"狙击",
  			"神射手"
  		],
  		name: "远牙",
  		team: [
  			"红松骑士团",
  			"卡西米尔"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"重装",
  			"要塞"
  		],
  		name: "灰毫",
  		team: [
  			"红松骑士团",
  			"卡西米尔"
  		],
  		race: "札拉克",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"先锋",
  			"执旗手"
  		],
  		name: "琴柳",
  		team: [
  			"维多利亚"
  		],
  		race: "瓦伊凡",
  		rarity: 5,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"医疗",
  			"行医"
  		],
  		name: "桑葚",
  		team: [
  			"炎"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "Jacknife"
  	},
  	{
  		className: [
  			"辅助",
  			"工匠"
  		],
  		name: "罗比菈塔",
  		team: [
  			"哥伦比亚"
  		],
  		race: "阿纳缇",
  		rarity: 3,
  		painter: "IRIS_呓"
  	},
  	{
  		className: [
  			"狙击",
  			"散射手"
  		],
  		name: "假日威龙陈",
  		team: [
  			"罗德岛"
  		],
  		race: "龙",
  		rarity: 5,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"特种",
  			"伏击客"
  		],
  		name: "水月",
  		team: [
  			"东"
  		],
  		race: "阿戈尔",
  		rarity: 5,
  		painter: "Namie"
  	},
  	{
  		className: [
  			"近卫",
  			"收割者"
  		],
  		name: "羽毛笔",
  		team: [
  			"玻利瓦尔"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "LAL!ROLE"
  	},
  	{
  		className: [
  			"近卫",
  			"解放者"
  		],
  		name: "龙舌兰",
  		team: [
  			"玻利瓦尔"
  		],
  		race: "佩洛",
  		rarity: 4,
  		painter: "一千"
  	},
  	{
  		className: [
  			"近卫",
  			"教官"
  		],
  		name: "帕拉斯",
  		team: [
  			"米诺斯"
  		],
  		race: "丰蹄",
  		rarity: 5,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"术师",
  			"阵法术师"
  		],
  		name: "卡涅利安",
  		team: [
  			"莱塔尼亚"
  		],
  		race: "卡普里尼",
  		rarity: 5,
  		painter: "カワグチ"
  	},
  	{
  		className: [
  			"特种",
  			"伏击客"
  		],
  		name: "绮良",
  		team: [
  			"东"
  		],
  		race: "阿戈尔",
  		rarity: 4,
  		painter: "我妻洛酱"
  	},
  	{
  		className: [
  			"特种",
  			"傀儡师"
  		],
  		name: "贝娜",
  		team: [
  			"维多利亚"
  		],
  		race: "卡普里尼",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"术师",
  			"秘术师"
  		],
  		name: "深靛",
  		team: [
  			"伊比利亚"
  		],
  		race: "斐迪亚",
  		rarity: 3,
  		painter: "织布机loom"
  	},
  	{
  		className: [
  			"辅助",
  			"吟游者"
  		],
  		name: "浊心斯卡蒂",
  		team: [
  			"阿戈尔"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "alchemaniac"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "凯尔希",
  		team: [
  			"罗德岛"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"特种",
  			"钩索师"
  		],
  		name: "歌蕾蒂娅",
  		team: [
  			"深海猎人",
  			"阿戈尔"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "Chuzenji"
  	},
  	{
  		className: [
  			"近卫",
  			"武者"
  		],
  		name: "赤冬",
  		team: [
  			"东"
  		],
  		race: "阿戈尔",
  		rarity: 4,
  		painter: "熊太"
  	},
  	{
  		className: [
  			"术师",
  			"链术师"
  		],
  		name: "异客",
  		team: [
  			"萨尔贡"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"狙击",
  			"攻城手"
  		],
  		name: "熔泉",
  		team: [
  			"维多利亚"
  		],
  		race: "瓦伊凡",
  		rarity: 4,
  		painter: "山×2"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "暴雨",
  		team: [
  			"罗德岛"
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "灰烬",
  		team: [
  			"彩虹小队",
  			""
  		],
  		race: "未知",
  		rarity: 5,
  		painter: "Ubisoft"
  	},
  	{
  		className: [
  			"特种",
  			"陷阱师"
  		],
  		name: "霜华",
  		team: [
  			"彩虹小队",
  			""
  		],
  		race: "未知",
  		rarity: 4,
  		painter: "Ubisoft"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "闪击",
  		team: [
  			"彩虹小队",
  			""
  		],
  		race: "未知",
  		rarity: 4,
  		painter: "Ubisoft"
  	},
  	{
  		className: [
  			"近卫",
  			"剑豪"
  		],
  		name: "战车",
  		team: [
  			"彩虹小队",
  			""
  		],
  		race: "未知",
  		rarity: 4,
  		painter: "Ubisoft"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "夕",
  		team: [
  			"炎",
  			"岁"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "嵯峨",
  		team: [
  			"东"
  		],
  		race: "佩洛",
  		rarity: 5,
  		painter: "多元菌"
  	},
  	{
  		className: [
  			"特种",
  			"行商"
  		],
  		name: "乌有",
  		team: [
  			"炎"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "炎狱炎熔",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "图耶",
  		team: [
  			"萨尔贡"
  		],
  		race: "丰蹄",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "空弦",
  		team: [
  			"拉特兰"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "alchemaniac"
  	},
  	{
  		className: [
  			"术师",
  			"秘术师"
  		],
  		name: "爱丽丝",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"先锋",
  			"战术家"
  		],
  		name: "豆苗",
  		team: [
  			"哥伦比亚"
  		],
  		race: "瑞柏巴",
  		rarity: 3,
  		painter: "一千"
  	},
  	{
  		className: [
  			"近卫",
  			"斗士"
  		],
  		name: "山",
  		team: [
  			"哥伦比亚"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "WincalBlanke"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "卡夫卡",
  		team: [
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"特种",
  			"陷阱师"
  		],
  		name: "罗宾",
  		team: [
  			"哥伦比亚"
  		],
  		race: "阿纳缇",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"狙击",
  			"散射手"
  		],
  		name: "松果",
  		team: [
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 3,
  		painter: "TrNyteal"
  	},
  	{
  		className: [
  			"近卫",
  			"术战者"
  		],
  		name: "阿米娅(近卫)",
  		team: [
  			"罗德岛"
  		],
  		race: "卡特斯/奇美拉",
  		rarity: 4,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"狙击",
  			"投掷手"
  		],
  		name: "迷迭香",
  		team: [
  			"罗德岛",
  			"精英干员"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"重装",
  			"不屈者"
  		],
  		name: "泥岩",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"医疗",
  			"疗养师"
  		],
  		name: "絮雨",
  		team: [
  			"伊比利亚"
  		],
  		race: "阿戈尔",
  		rarity: 4,
  		painter: "Chuzenji"
  	},
  	{
  		className: [
  			"近卫",
  			"斗士"
  		],
  		name: "杰克",
  		team: [
  			"哥伦比亚"
  		],
  		race: "佩洛",
  		rarity: 3,
  		painter: "Nagu"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "瑕光",
  		team: [
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 5,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"狙击",
  			"散射手"
  		],
  		name: "奥斯塔",
  		team: [
  			"贾维团伙",
  			"叙拉古"
  		],
  		race: "鲁珀",
  		rarity: 4,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"近卫",
  			"教官"
  		],
  		name: "鞭刃",
  		team: [
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "泡泡",
  		team: [
  			"萨尔贡"
  		],
  		race: "塞拉托",
  		rarity: 3,
  		painter: "Cenm0"
  	},
  	{
  		className: [
  			"近卫",
  			"术战者"
  		],
  		name: "史尔特尔",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "Ask"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "四月",
  		team: [
  			"雷姆必拓"
  		],
  		race: "卡特斯",
  		rarity: 4,
  		painter: "れおえん"
  	},
  	{
  		className: [
  			"术师",
  			"阵法术师"
  		],
  		name: "薄绿",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "ヌードル"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "芳汀",
  		team: [
  			"拉特兰"
  		],
  		race: "萨科塔",
  		rarity: 3,
  		painter: "umo_yszx"
  	},
  	{
  		className: [
  			"重装",
  			"决战者"
  		],
  		name: "森蚺",
  		team: [
  			"萨尔贡"
  		],
  		race: "斐迪亚",
  		rarity: 5,
  		painter: "Liduke"
  	},
  	{
  		className: [
  			"近卫",
  			"斗士"
  		],
  		name: "燧石",
  		team: [
  			"萨尔贡"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "特米米",
  		team: [
  			"萨尔贡"
  		],
  		race: "阿达克利斯",
  		rarity: 4,
  		painter: "Chuzenji"
  	},
  	{
  		className: [
  			"狙击",
  			"重射手"
  		],
  		name: "酸糖",
  		team: [
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 3,
  		painter: "Lanzi"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "棘刺",
  		team: [
  			"伊比利亚"
  		],
  		race: "阿戈尔",
  		rarity: 5,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"狙击",
  			"神射手"
  		],
  		name: "安哲拉",
  		team: [
  			"深海猎人",
  			"阿戈尔"
  		],
  		race: "阿戈尔",
  		rarity: 4,
  		painter: "LLC"
  	},
  	{
  		className: [
  			"特种",
  			"行商"
  		],
  		name: "孑",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "乌萨斯",
  		rarity: 3,
  		painter: "阿鬼"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "贾维",
  		team: [
  			"贾维团伙",
  			"叙拉古"
  		],
  		race: "沃尔珀",
  		rarity: 4,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"术师",
  			"阵法术师"
  		],
  		name: "蜜蜡",
  		team: [
  			"萨尔贡"
  		],
  		race: "卡普里尼",
  		rarity: 4,
  		painter: "カワグチ"
  	},
  	{
  		className: [
  			"辅助",
  			"召唤师"
  		],
  		name: "稀音",
  		team: [
  			"萨尔贡"
  		],
  		race: "皮洛萨",
  		rarity: 4,
  		painter: "アシマ"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "铃兰",
  		team: [
  			"叙拉古"
  		],
  		race: "沃尔珀",
  		rarity: 5,
  		painter: "将"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "断崖",
  		team: [
  			"雷姆必拓"
  		],
  		race: "卡特斯",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "亚叶",
  		team: [
  			"罗德岛"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"术师",
  			"驭械术师"
  		],
  		name: "卡达",
  		team: [
  			"罗德岛"
  		],
  		race: "札拉克",
  		rarity: 3,
  		painter: "れおえん"
  	},
  	{
  		className: [
  			"狙击",
  			"攻城手"
  		],
  		name: "早露",
  		team: [
  			"乌萨斯学生自治团",
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 5,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "莱恩哈特",
  		team: [
  			"雷姆必拓"
  		],
  		race: "卡特斯",
  		rarity: 4,
  		painter: "野崎つばた"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "苦艾",
  		team: [
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "波登可",
  		team: [
  			"罗德岛"
  		],
  		race: "佩洛",
  		rarity: 3,
  		painter: "アシマ"
  	},
  	{
  		className: [
  			"辅助",
  			"护佑者"
  		],
  		name: "月禾",
  		team: [
  			"东"
  		],
  		race: "埃拉菲亚",
  		rarity: 4,
  		painter: "上埜"
  	},
  	{
  		className: [
  			"重装",
  			"驭法铁卫"
  		],
  		name: "石棉",
  		team: [
  			"雷姆必拓"
  		],
  		race: "萨弗拉",
  		rarity: 4,
  		painter: "TEAM EXPNDR"
  	},
  	{
  		className: [
  			"狙击",
  			"炮手"
  		],
  		name: "W",
  		team: [
  			"巴别塔",
  			""
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "Liduke"
  	},
  	{
  		className: [
  			"特种",
  			"推击手"
  		],
  		name: "温蒂",
  		team: [
  			"罗德岛"
  		],
  		race: "阿戈尔",
  		rarity: 5,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"先锋",
  			"执旗手"
  		],
  		name: "极境",
  		team: [
  			"罗德岛"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "THRM-EX",
  		team: [
  			"罗德岛"
  		],
  		race: "",
  		rarity: 0,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "傀影",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"辅助",
  			"削弱者"
  		],
  		name: "巫恋",
  		team: [
  			"叙拉古"
  		],
  		race: "沃尔珀",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"近卫",
  			"术战者"
  		],
  		name: "铸铁",
  		team: [
  			"米诺斯"
  		],
  		race: "丰蹄",
  		rarity: 4,
  		painter: "将"
  	},
  	{
  		className: [
  			"近卫",
  			"剑豪"
  		],
  		name: "刻刀",
  		team: [
  			"哥伦比亚"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "断罪者",
  		team: [
  			"米诺斯"
  		],
  		race: "未知（疑似黎博利）",
  		rarity: 3,
  		painter: "TOMATO"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "风笛",
  		team: [
  			"维多利亚"
  		],
  		race: "瓦伊凡",
  		rarity: 5,
  		painter: "u介"
  	},
  	{
  		className: [
  			"狙击",
  			"炮手"
  		],
  		name: "慑砂",
  		team: [
  			"萨尔贡"
  		],
  		race: "瓦伊凡",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"近卫",
  			"剑豪"
  		],
  		name: "柏喙",
  		team: [
  			"萨米"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "RAYVON"
  	},
  	{
  		className: [
  			"近卫",
  			"武者"
  		],
  		name: "宴",
  		team: [
  			"东"
  		],
  		race: "不明",
  		rarity: 3,
  		painter: "釜飯轟々丸"
  	},
  	{
  		className: [
  			"医疗",
  			"疗养师"
  		],
  		name: "清流",
  		team: [
  			"炎"
  		],
  		race: "阿戈尔",
  		rarity: 3,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "刻俄柏",
  		team: [
  			"罗德岛"
  		],
  		race: "佩洛",
  		rarity: 5,
  		painter: "LM7"
  	},
  	{
  		className: [
  			"术师",
  			"链术师"
  		],
  		name: "惊蛰",
  		team: [
  			"炎"
  		],
  		race: "麒麟",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "年",
  		team: [
  			"炎",
  			"岁"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"特种",
  			"怪杰"
  		],
  		name: "阿",
  		team: [
  			"鲤氏侦探事务所",
  			"炎",
  			"龙门"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "KuroBlood"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "吽",
  		team: [
  			"鲤氏侦探事务所",
  			"炎",
  			"龙门"
  		],
  		race: "佩洛",
  		rarity: 4,
  		painter: "KuroBlood"
  	},
  	{
  		className: [
  			"特种",
  			"钩索师"
  		],
  		name: "雪雉",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "煌",
  		team: [
  			"罗德岛",
  			"精英干员"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "灰喉",
  		team: [
  			"罗德岛"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"狙击",
  			"神射手"
  		],
  		name: "安比尔",
  		team: [
  			"拉特兰"
  		],
  		race: "萨科塔",
  		rarity: 3,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "布洛卡",
  		team: [
  			"贾维团伙",
  			"叙拉古"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "苇草",
  		team: [
  			"维多利亚"
  		],
  		race: "德拉克",
  		rarity: 4,
  		painter: "STAR影法师"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "莫斯提马",
  		team: [
  			"拉特兰"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "槐琥",
  		team: [
  			"鲤氏侦探事务所",
  			"炎",
  			"龙门"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "KuroBlood"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "拜松",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "丰蹄",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "梅",
  		team: [
  			"维多利亚"
  		],
  		race: "黎博利",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"医疗",
  			"群愈师"
  		],
  		name: "微风",
  		team: [
  			"维多利亚"
  		],
  		race: "沃尔珀",
  		rarity: 4,
  		painter: "藻"
  	},
  	{
  		className: [
  			"特种",
  			"伏击客"
  		],
  		name: "伊桑",
  		team: [
  			"罗德岛"
  		],
  		race: "萨弗拉",
  		rarity: 3,
  		painter: "阿鬼"
  	},
  	{
  		className: [
  			"辅助",
  			"召唤师"
  		],
  		name: "麦哲伦",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"狙击",
  			"散射手"
  		],
  		name: "送葬人",
  		team: [
  			"拉特兰"
  		],
  		race: "萨科塔",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "炎客",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 4,
  		painter: "虎三"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "红云",
  		team: [
  			"叙拉古"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "KENTllaall"
  	},
  	{
  		className: [
  			"重装",
  			"驭法铁卫"
  		],
  		name: "坚雷",
  		team: [
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"近卫",
  			"武者"
  		],
  		name: "赫拉格",
  		team: [
  			"乌萨斯"
  		],
  		race: "黎博利",
  		rarity: 5,
  		painter: "Liduke"
  	},
  	{
  		className: [
  			"近卫",
  			"术战者"
  		],
  		name: "星极",
  		team: [
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "YUJI"
  	},
  	{
  		className: [
  			"先锋",
  			"执旗手"
  		],
  		name: "桃金娘",
  		team: [
  			"罗德岛"
  		],
  		race: "杜林",
  		rarity: 3,
  		painter: "咩煲"
  	},
  	{
  		className: [
  			"狙击",
  			"重射手"
  		],
  		name: "黑",
  		team: [
  			"汐斯塔",
  			"哥伦比亚"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "Liduke"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "格劳克斯",
  		team: [
  			"伊比利亚"
  		],
  		race: "未公开",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"医疗",
  			"疗养师"
  		],
  		name: "锡兰",
  		team: [
  			"汐斯塔",
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "苏苏洛",
  		team: [
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "将"
  	},
  	{
  		className: [
  			"近卫",
  			"剑豪"
  		],
  		name: "陈",
  		team: [
  			"龙门近卫局",
  			"炎",
  			"龙门"
  		],
  		race: "龙",
  		rarity: 5,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"近卫",
  			"教官"
  		],
  		name: "诗怀雅",
  		team: [
  			"龙门近卫局",
  			"炎",
  			"龙门"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "格雷伊",
  		team: [
  			"玻利瓦尔"
  		],
  		race: "佩洛",
  		rarity: 3,
  		painter: "我妻洛酱"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "斑点",
  		team: [
  			"行动预备组A6",
  			"罗德岛"
  		],
  		race: "瑞柏巴",
  		rarity: 2,
  		painter: "阿鬼"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "泡普卡",
  		team: [
  			"行动预备组A6",
  			"罗德岛"
  		],
  		race: "卡特斯",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "斯卡蒂",
  		team: [
  			"深海猎人",
  			"阿戈尔"
  		],
  		race: "未公开",
  		rarity: 5,
  		painter: "alchemaniac"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "格拉尼",
  		team: [
  			"维多利亚"
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "alchemaniac"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "夜魔",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "Lpip"
  	},
  	{
  		className: [
  			"近卫",
  			"斗士"
  		],
  		name: "猎蜂",
  		team: [
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 3,
  		painter: "toast"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "月见夜",
  		team: [
  			"行动预备组A6",
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 2,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"狙击",
  			"炮手"
  		],
  		name: "空爆",
  		team: [
  			"行动预备组A6",
  			"罗德岛"
  		],
  		race: "库兰塔",
  		rarity: 2,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "暴行",
  		team: [
  			"雷姆必拓"
  		],
  		race: "卡特斯",
  		rarity: 4,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "银灰",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "菲林",
  		rarity: 5,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "塞雷娅",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "瓦伊凡",
  		rarity: 5,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "星熊",
  		team: [
  			"龙门近卫局",
  			"炎",
  			"龙门"
  		],
  		race: "鬼",
  		rarity: 5,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"医疗",
  			"群愈师"
  		],
  		name: "夜莺",
  		team: [
  			"使徒",
  			""
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "闪灵",
  		team: [
  			"使徒",
  			""
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "安洁莉娜",
  		team: [
  			"叙拉古"
  		],
  		race: "沃尔珀",
  		rarity: 5,
  		painter: "LM7"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "艾雅法拉",
  		team: [
  			"莱塔尼亚"
  		],
  		race: "卡普里尼",
  		rarity: 5,
  		painter: "Anmi"
  	},
  	{
  		className: [
  			"术师",
  			"轰击术师"
  		],
  		name: "伊芙利特",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "萨卡兹",
  		rarity: 5,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "推进之王",
  		team: [
  			"格拉斯哥帮",
  			"维多利亚"
  		],
  		race: "阿斯兰",
  		rarity: 5,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "能天使",
  		team: [
  			"企鹅物流",
  			"炎",
  			"龙门"
  		],
  		race: "萨科塔",
  		rarity: 5,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"特种",
  			"推击手"
  		],
  		name: "食铁兽",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "乌萨斯",
  		rarity: 4,
  		painter: "RAN"
  	},
  	{
  		className: [
  			"特种",
  			"伏击客"
  		],
  		name: "狮蝎",
  		team: [
  			"萨尔贡"
  		],
  		race: "曼提柯",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"辅助",
  			"吟游者"
  		],
  		name: "空",
  		team: [
  			"企鹅物流",
  			"炎",
  			"龙门"
  		],
  		race: "因经纪公司要求不公开",
  		rarity: 4,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "真理",
  		team: [
  			"乌萨斯学生自治团",
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"辅助",
  			"削弱者"
  		],
  		name: "初雪",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"特种",
  			"钩索师"
  		],
  		name: "崖心",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"狙击",
  			"神射手"
  		],
  		name: "守林人",
  		team: [
  			"罗德岛"
  		],
  		race: "埃拉菲亚",
  		rarity: 4,
  		painter: "aZLing4"
  	},
  	{
  		className: [
  			"狙击",
  			"重射手"
  		],
  		name: "普罗旺斯",
  		team: [
  			"叙拉古"
  		],
  		race: "鲁珀",
  		rarity: 4,
  		painter: "渣念"
  	},
  	{
  		className: [
  			"重装",
  			"不屈者"
  		],
  		name: "火神",
  		team: [
  			"米诺斯"
  		],
  		race: "丰蹄",
  		rarity: 4,
  		painter: "neco"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "可颂",
  		team: [
  			"企鹅物流",
  			"炎",
  			"龙门"
  		],
  		race: "丰蹄",
  		rarity: 4,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "雷蛇",
  		team: [
  			"黑钢国际",
  			"哥伦比亚"
  		],
  		race: "瓦伊凡",
  		rarity: 4,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "红",
  		team: [
  			"S.W.E.E.P",
  			"罗德岛"
  		],
  		race: "鲁珀",
  		rarity: 4,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "临光",
  		team: [
  			"使徒",
  			""
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "华法琳",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 4,
  		painter: "时辰"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "赫默",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "NoriZC"
  	},
  	{
  		className: [
  			"辅助",
  			"召唤师"
  		],
  		name: "梅尔",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "阿纳缇",
  		rarity: 4,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "天火",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "阿米娅",
  		team: [
  			"罗德岛"
  		],
  		race: "卡特斯/奇美拉",
  		rarity: 4,
  		painter: "唯@W"
  	},
  	{
  		className: [
  			"狙击",
  			"炮手"
  		],
  		name: "陨星",
  		team: [
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 4,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "白金",
  		team: [
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "蓝毒",
  		team: [
  			"伊比利亚"
  		],
  		race: "安努拉",
  		rarity: 4,
  		painter: "LLC"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "幽灵鲨",
  		team: [
  			"深海猎人",
  			"阿戈尔"
  		],
  		race: "未公开",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "拉普兰德",
  		team: [
  			"叙拉古"
  		],
  		race: "鲁珀",
  		rarity: 4,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"近卫",
  			"斗士"
  		],
  		name: "因陀罗",
  		team: [
  			"格拉斯哥帮",
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 4,
  		painter: "Infukun"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "芙兰卡",
  		team: [
  			"黑钢国际",
  			"哥伦比亚"
  		],
  		race: "沃尔珀",
  		rarity: 4,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "德克萨斯",
  		team: [
  			"企鹅物流",
  			"炎",
  			"龙门"
  		],
  		race: "鲁珀",
  		rarity: 4,
  		painter: "幻象黑兔"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "凛冬",
  		team: [
  			"乌萨斯学生自治团",
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 4,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"医疗",
  			"群愈师"
  		],
  		name: "白面鸮",
  		team: [
  			"莱茵生命",
  			"哥伦比亚"
  		],
  		race: "黎博利",
  		rarity: 4,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"特种",
  			"推击手"
  		],
  		name: "阿消",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "札拉克",
  		rarity: 3,
  		painter: "阿鬼"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "地灵",
  		team: [
  			"莱塔尼亚"
  		],
  		race: "卡普里尼",
  		rarity: 3,
  		painter: "HUG"
  	},
  	{
  		className: [
  			"辅助",
  			"召唤师"
  		],
  		name: "深海色",
  		team: [
  			"阿戈尔"
  		],
  		race: "未公开",
  		rarity: 3,
  		painter: "REALMBW"
  	},
  	{
  		className: [
  			"重装",
  			"守护者"
  		],
  		name: "古米",
  		team: [
  			"乌萨斯学生自治团",
  			"乌萨斯"
  		],
  		race: "乌萨斯",
  		rarity: 3,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "蛇屠箱",
  		team: [
  			"哥伦比亚"
  		],
  		race: "匹特拉姆",
  		rarity: 3,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "角峰",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "丰蹄",
  		rarity: 3,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"医疗",
  			"群愈师"
  		],
  		name: "调香师",
  		team: [
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "Lanzi"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "嘉维尔",
  		team: [
  			"罗德岛"
  		],
  		race: "阿达克利斯",
  		rarity: 3,
  		painter: "LLC"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "末药",
  		team: [
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"特种",
  			"钩索师"
  		],
  		name: "暗索",
  		team: [
  			"炎",
  			"龙门"
  		],
  		race: "卡特斯",
  		rarity: 3,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"特种",
  			"处决者"
  		],
  		name: "砾",
  		team: [
  			"卡西米尔"
  		],
  		race: "札拉克",
  		rarity: 3,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"近卫",
  			"术战者"
  		],
  		name: "慕斯",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 3,
  		painter: "Iritoa"
  	},
  	{
  		className: [
  			"近卫",
  			"强攻手"
  		],
  		name: "艾丝黛尔",
  		team: [
  			"萨尔贡"
  		],
  		race: "阿达克利斯",
  		rarity: 3,
  		painter: "鸭"
  	},
  	{
  		className: [
  			"近卫",
  			"领主"
  		],
  		name: "霜叶",
  		team: [
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "缠丸",
  		team: [
  			"东"
  		],
  		race: "鬼",
  		rarity: 3,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"近卫",
  			"教官"
  		],
  		name: "杜宾",
  		team: [
  			"罗德岛"
  		],
  		race: "佩洛",
  		rarity: 3,
  		painter: "LLC"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "红豆",
  		team: [
  			"哥伦比亚"
  		],
  		race: "萨卡兹",
  		rarity: 3,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "清道夫",
  		team: [
  			"S.W.E.E.P",
  			"罗德岛"
  		],
  		race: "札拉克",
  		rarity: 3,
  		painter: "戏言咸咸"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "讯使",
  		team: [
  			"喀兰贸易",
  			"谢拉格"
  		],
  		race: "依特拉",
  		rarity: 3,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"狙击",
  			"炮手"
  		],
  		name: "白雪",
  		team: [
  			"东"
  		],
  		race: "阿纳缇",
  		rarity: 3,
  		painter: "阿鬼"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "流星",
  		team: [
  			"卡西米尔"
  		],
  		race: "库兰塔",
  		rarity: 3,
  		painter: "HUG"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "杰西卡",
  		team: [
  			"黑钢国际",
  			"哥伦比亚"
  		],
  		race: "菲林",
  		rarity: 3,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "远山",
  		team: [
  			"萨米"
  		],
  		race: "埃拉菲亚",
  		rarity: 3,
  		painter: "谜肘"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "夜烟",
  		team: [
  			"维多利亚"
  		],
  		race: "菲林",
  		rarity: 3,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"辅助",
  			"凝滞师"
  		],
  		name: "梓兰",
  		team: [
  			"行动预备组A6",
  			"罗德岛"
  		],
  		race: "黎博利",
  		rarity: 2,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "史都华德",
  		team: [
  			"行动预备组A4",
  			"罗德岛"
  		],
  		race: "沃尔珀",
  		rarity: 2,
  		painter: "一立里子"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "安赛尔",
  		team: [
  			"行动预备组A4",
  			"罗德岛"
  		],
  		race: "卡特斯",
  		rarity: 2,
  		painter: "一立里子"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "芙蓉",
  		team: [
  			"行动预备组A1",
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "炎熔",
  		team: [
  			"行动预备组A1",
  			"罗德岛"
  		],
  		race: "萨卡兹",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "安德切尔",
  		team: [
  			"行动预备组A4",
  			"罗德岛"
  		],
  		race: "萨科塔",
  		rarity: 2,
  		painter: "一立里子"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "克洛丝",
  		team: [
  			"行动预备组A1",
  			"罗德岛"
  		],
  		race: "卡特斯",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "米格鲁",
  		team: [
  			"行动预备组A1",
  			"罗德岛"
  		],
  		race: "佩洛",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "卡缇",
  		team: [
  			"行动预备组A4",
  			"罗德岛"
  		],
  		race: "佩洛",
  		rarity: 2,
  		painter: "一立里子"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "玫兰莎",
  		team: [
  			"行动预备组A4",
  			"罗德岛"
  		],
  		race: "菲林",
  		rarity: 2,
  		painter: "一立里子"
  	},
  	{
  		className: [
  			"先锋",
  			"冲锋手"
  		],
  		name: "翎羽",
  		team: [
  			"拉特兰"
  		],
  		race: "黎博利",
  		rarity: 2,
  		painter: "deel"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "香草",
  		team: [
  			"黑钢国际",
  			"哥伦比亚"
  		],
  		race: "瓦伊凡",
  		rarity: 2,
  		painter: "m9nokuro"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "芬",
  		team: [
  			"行动预备组A1",
  			"罗德岛"
  		],
  		race: "库兰塔",
  		rarity: 2,
  		painter: "下野宏铭"
  	},
  	{
  		className: [
  			"术师",
  			"扩散术师"
  		],
  		name: "12F",
  		team: [
  			"罗德岛"
  		],
  		race: "萨弗拉",
  		rarity: 1,
  		painter: "海猫络合物"
  	},
  	{
  		className: [
  			"术师",
  			"中坚术师"
  		],
  		name: "杜林",
  		team: [
  			"行动组A4",
  			"罗德岛"
  		],
  		race: "杜林",
  		rarity: 1,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"狙击",
  			"速射手"
  		],
  		name: "巡林者",
  		team: [
  			"行动组A4",
  			"罗德岛"
  		],
  		race: "萨弗拉",
  		rarity: 1,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"重装",
  			"铁卫"
  		],
  		name: "黑角",
  		team: [
  			"行动组A4",
  			"罗德岛"
  		],
  		race: "鬼",
  		rarity: 1,
  		painter: "竜崎いち"
  	},
  	{
  		className: [
  			"先锋",
  			"尖兵"
  		],
  		name: "夜刀",
  		team: [
  			"行动组A4",
  			"罗德岛"
  		],
  		race: "鬼",
  		rarity: 1,
  		painter: "Skade"
  	},
  	{
  		className: [
  			"近卫",
  			"无畏者"
  		],
  		name: "Castle-3",
  		team: [
  			"罗德岛"
  		],
  		race: "",
  		rarity: 0,
  		painter: "TOKI"
  	},
  	{
  		className: [
  			"医疗",
  			"医师"
  		],
  		name: "Lancet-2",
  		team: [
  			"罗德岛"
  		],
  		race: "",
  		rarity: 0,
  		painter: "TOKI"
  	}
  ];

  var TYPES = [{
    label: '稀有度',
    key: 'rarity',
    type: 'number'
  }, {
    label: '阵营',
    key: 'team',
    type: 'array'
  }, {
    label: '职业',
    key: 'className',
    type: 'array'
  }, {
    label: '种族',
    key: 'race',
    type: 'string'
  }, {
    label: '画师',
    key: 'painter',
    type: 'string'
  }, {
    label: '名称',
    key: 'guess'
  }];
  var VAL_DICT = {
    'correct': '🟩',
    'wrong': '🟥',
    'wrongpos': '🟨',
    'up': '🔼',
    'down': '🔽'
  };
  var chartsData = dealData;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  //! moment.js
  //! version : 2.29.1
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com

  var hookCallback;

  function hooks() {
      return hookCallback.apply(null, arguments);
  }

  // This is done to register the method called with moment()
  // without creating circular dependencies.
  function setHookCallback(callback) {
      hookCallback = callback;
  }

  function isArray(input) {
      return (
          input instanceof Array ||
          Object.prototype.toString.call(input) === '[object Array]'
      );
  }

  function isObject(input) {
      // IE8 will treat undefined and null as object if it wasn't for
      // input != null
      return (
          input != null &&
          Object.prototype.toString.call(input) === '[object Object]'
      );
  }

  function hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
  }

  function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
      } else {
          var k;
          for (k in obj) {
              if (hasOwnProp(obj, k)) {
                  return false;
              }
          }
          return true;
      }
  }

  function isUndefined(input) {
      return input === void 0;
  }

  function isNumber(input) {
      return (
          typeof input === 'number' ||
          Object.prototype.toString.call(input) === '[object Number]'
      );
  }

  function isDate(input) {
      return (
          input instanceof Date ||
          Object.prototype.toString.call(input) === '[object Date]'
      );
  }

  function map(arr, fn) {
      var res = [],
          i;
      for (i = 0; i < arr.length; ++i) {
          res.push(fn(arr[i], i));
      }
      return res;
  }

  function extend(a, b) {
      for (var i in b) {
          if (hasOwnProp(b, i)) {
              a[i] = b[i];
          }
      }

      if (hasOwnProp(b, 'toString')) {
          a.toString = b.toString;
      }

      if (hasOwnProp(b, 'valueOf')) {
          a.valueOf = b.valueOf;
      }

      return a;
  }

  function createUTC(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
      // We need to deep clone this object.
      return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false,
      };
  }

  function getParsingFlags(m) {
      if (m._pf == null) {
          m._pf = defaultParsingFlags();
      }
      return m._pf;
  }

  var some;
  if (Array.prototype.some) {
      some = Array.prototype.some;
  } else {
      some = function (fun) {
          var t = Object(this),
              len = t.length >>> 0,
              i;

          for (i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                  return true;
              }
          }

          return false;
      };
  }

  function isValid(m) {
      if (m._isValid == null) {
          var flags = getParsingFlags(m),
              parsedParts = some.call(flags.parsedDateParts, function (i) {
                  return i != null;
              }),
              isNowValid =
                  !isNaN(m._d.getTime()) &&
                  flags.overflow < 0 &&
                  !flags.empty &&
                  !flags.invalidEra &&
                  !flags.invalidMonth &&
                  !flags.invalidWeekday &&
                  !flags.weekdayMismatch &&
                  !flags.nullInput &&
                  !flags.invalidFormat &&
                  !flags.userInvalidated &&
                  (!flags.meridiem || (flags.meridiem && parsedParts));

          if (m._strict) {
              isNowValid =
                  isNowValid &&
                  flags.charsLeftOver === 0 &&
                  flags.unusedTokens.length === 0 &&
                  flags.bigHour === undefined;
          }

          if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
          } else {
              return isNowValid;
          }
      }
      return m._isValid;
  }

  function createInvalid(flags) {
      var m = createUTC(NaN);
      if (flags != null) {
          extend(getParsingFlags(m), flags);
      } else {
          getParsingFlags(m).userInvalidated = true;
      }

      return m;
  }

  // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.
  var momentProperties = (hooks.momentProperties = []),
      updateInProgress = false;

  function copyConfig(to, from) {
      var i, prop, val;

      if (!isUndefined(from._isAMomentObject)) {
          to._isAMomentObject = from._isAMomentObject;
      }
      if (!isUndefined(from._i)) {
          to._i = from._i;
      }
      if (!isUndefined(from._f)) {
          to._f = from._f;
      }
      if (!isUndefined(from._l)) {
          to._l = from._l;
      }
      if (!isUndefined(from._strict)) {
          to._strict = from._strict;
      }
      if (!isUndefined(from._tzm)) {
          to._tzm = from._tzm;
      }
      if (!isUndefined(from._isUTC)) {
          to._isUTC = from._isUTC;
      }
      if (!isUndefined(from._offset)) {
          to._offset = from._offset;
      }
      if (!isUndefined(from._pf)) {
          to._pf = getParsingFlags(from);
      }
      if (!isUndefined(from._locale)) {
          to._locale = from._locale;
      }

      if (momentProperties.length > 0) {
          for (i = 0; i < momentProperties.length; i++) {
              prop = momentProperties[i];
              val = from[prop];
              if (!isUndefined(val)) {
                  to[prop] = val;
              }
          }
      }

      return to;
  }

  // Moment prototype object
  function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
          this._d = new Date(NaN);
      }
      // Prevent infinite loop in case updateOffset creates new moment
      // objects.
      if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
      }
  }

  function isMoment(obj) {
      return (
          obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
      );
  }

  function warn(msg) {
      if (
          hooks.suppressDeprecationWarnings === false &&
          typeof console !== 'undefined' &&
          console.warn
      ) {
          console.warn('Deprecation warning: ' + msg);
      }
  }

  function deprecate(msg, fn) {
      var firstTime = true;

      return extend(function () {
          if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
              var args = [],
                  arg,
                  i,
                  key;
              for (i = 0; i < arguments.length; i++) {
                  arg = '';
                  if (typeof arguments[i] === 'object') {
                      arg += '\n[' + i + '] ';
                      for (key in arguments[0]) {
                          if (hasOwnProp(arguments[0], key)) {
                              arg += key + ': ' + arguments[0][key] + ', ';
                          }
                      }
                      arg = arg.slice(0, -2); // Remove trailing comma and space
                  } else {
                      arg = arguments[i];
                  }
                  args.push(arg);
              }
              warn(
                  msg +
                      '\nArguments: ' +
                      Array.prototype.slice.call(args).join('') +
                      '\n' +
                      new Error().stack
              );
              firstTime = false;
          }
          return fn.apply(this, arguments);
      }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
      }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
      return (
          (typeof Function !== 'undefined' && input instanceof Function) ||
          Object.prototype.toString.call(input) === '[object Function]'
      );
  }

  function set(config) {
      var prop, i;
      for (i in config) {
          if (hasOwnProp(config, i)) {
              prop = config[i];
              if (isFunction(prop)) {
                  this[i] = prop;
              } else {
                  this['_' + i] = prop;
              }
          }
      }
      this._config = config;
      // Lenient ordinal parsing accepts just a number in addition to
      // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
      // TODO: Remove "ordinalParse" fallback in next major release.
      this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
              '|' +
              /\d{1,2}/.source
      );
  }

  function mergeConfigs(parentConfig, childConfig) {
      var res = extend({}, parentConfig),
          prop;
      for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
              if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                  res[prop] = {};
                  extend(res[prop], parentConfig[prop]);
                  extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                  res[prop] = childConfig[prop];
              } else {
                  delete res[prop];
              }
          }
      }
      for (prop in parentConfig) {
          if (
              hasOwnProp(parentConfig, prop) &&
              !hasOwnProp(childConfig, prop) &&
              isObject(parentConfig[prop])
          ) {
              // make sure changes to properties don't modify parent config
              res[prop] = extend({}, res[prop]);
          }
      }
      return res;
  }

  function Locale(config) {
      if (config != null) {
          this.set(config);
      }
  }

  var keys;

  if (Object.keys) {
      keys = Object.keys;
  } else {
      keys = function (obj) {
          var i,
              res = [];
          for (i in obj) {
              if (hasOwnProp(obj, i)) {
                  res.push(i);
              }
          }
          return res;
      };
  }

  var defaultCalendar = {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L',
  };

  function calendar(key, mom, now) {
      var output = this._calendar[key] || this._calendar['sameElse'];
      return isFunction(output) ? output.call(mom, now) : output;
  }

  function zeroFill(number, targetLength, forceSign) {
      var absNumber = '' + Math.abs(number),
          zerosToFill = targetLength - absNumber.length,
          sign = number >= 0;
      return (
          (sign ? (forceSign ? '+' : '') : '-') +
          Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
          absNumber
      );
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      formatFunctions = {},
      formatTokenFunctions = {};

  // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }
  function addFormatToken(token, padded, ordinal, callback) {
      var func = callback;
      if (typeof callback === 'string') {
          func = function () {
              return this[callback]();
          };
      }
      if (token) {
          formatTokenFunctions[token] = func;
      }
      if (padded) {
          formatTokenFunctions[padded[0]] = function () {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
      }
      if (ordinal) {
          formatTokenFunctions[ordinal] = function () {
              return this.localeData().ordinal(
                  func.apply(this, arguments),
                  token
              );
          };
      }
  }

  function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, '');
      }
      return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
      var array = format.match(formattingTokens),
          i,
          length;

      for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
          } else {
              array[i] = removeFormattingTokens(array[i]);
          }
      }

      return function (mom) {
          var output = '',
              i;
          for (i = 0; i < length; i++) {
              output += isFunction(array[i])
                  ? array[i].call(mom, format)
                  : array[i];
          }
          return output;
      };
  }

  // format date using native date object
  function formatMoment(m, format) {
      if (!m.isValid()) {
          return m.localeData().invalidDate();
      }

      format = expandFormat(format, m.localeData());
      formatFunctions[format] =
          formatFunctions[format] || makeFormatFunction(format);

      return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
      var i = 5;

      function replaceLongDateFormatTokens(input) {
          return locale.longDateFormat(input) || input;
      }

      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format)) {
          format = format.replace(
              localFormattingTokens,
              replaceLongDateFormatTokens
          );
          localFormattingTokens.lastIndex = 0;
          i -= 1;
      }

      return format;
  }

  var defaultLongDateFormat = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
  };

  function longDateFormat(key) {
      var format = this._longDateFormat[key],
          formatUpper = this._longDateFormat[key.toUpperCase()];

      if (format || !formatUpper) {
          return format;
      }

      this._longDateFormat[key] = formatUpper
          .match(formattingTokens)
          .map(function (tok) {
              if (
                  tok === 'MMMM' ||
                  tok === 'MM' ||
                  tok === 'DD' ||
                  tok === 'dddd'
              ) {
                  return tok.slice(1);
              }
              return tok;
          })
          .join('');

      return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
      return this._invalidDate;
  }

  var defaultOrdinal = '%d',
      defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
      return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      w: 'a week',
      ww: '%d weeks',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return isFunction(output)
          ? output(number, withoutSuffix, string, isFuture)
          : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
      var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
      return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
      var lowerCase = unit.toLowerCase();
      aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
      return typeof units === 'string'
          ? aliases[units] || aliases[units.toLowerCase()]
          : undefined;
  }

  function normalizeObjectUnits(inputObject) {
      var normalizedInput = {},
          normalizedProp,
          prop;

      for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                  normalizedInput[normalizedProp] = inputObject[prop];
              }
          }
      }

      return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
      priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
      var units = [],
          u;
      for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
          }
      }
      units.sort(function (a, b) {
          return a.priority - b.priority;
      });
      return units;
  }

  function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function absFloor(number) {
      if (number < 0) {
          // -0 -> 0
          return Math.ceil(number) || 0;
      } else {
          return Math.floor(number);
      }
  }

  function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion,
          value = 0;

      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
      }

      return value;
  }

  function makeGetSet(unit, keepTime) {
      return function (value) {
          if (value != null) {
              set$1(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
          } else {
              return get(this, unit);
          }
      };
  }

  function get(mom, unit) {
      return mom.isValid()
          ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
          : NaN;
  }

  function set$1(mom, unit, value) {
      if (mom.isValid() && !isNaN(value)) {
          if (
              unit === 'FullYear' &&
              isLeapYear(mom.year()) &&
              mom.month() === 1 &&
              mom.date() === 29
          ) {
              value = toInt(value);
              mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                  value,
                  mom.month(),
                  daysInMonth(value, mom.month())
              );
          } else {
              mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
          }
      }
  }

  // MOMENTS

  function stringGet(units) {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
          return this[units]();
      }
      return this;
  }

  function stringSet(units, value) {
      if (typeof units === 'object') {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units),
              i;
          for (i = 0; i < prioritized.length; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
          }
      } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
              return this[units](value);
          }
      }
      return this;
  }

  var match1 = /\d/, //       0 - 9
      match2 = /\d\d/, //      00 - 99
      match3 = /\d{3}/, //     000 - 999
      match4 = /\d{4}/, //    0000 - 9999
      match6 = /[+-]?\d{6}/, // -999999 - 999999
      match1to2 = /\d\d?/, //       0 - 99
      match3to4 = /\d\d\d\d?/, //     999 - 9999
      match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
      match1to3 = /\d{1,3}/, //       0 - 999
      match1to4 = /\d{1,4}/, //       0 - 9999
      match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
      matchUnsigned = /\d+/, //       0 - inf
      matchSigned = /[+-]?\d+/, //    -inf - inf
      matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
      matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
      matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
      // any word (or two) characters or numbers including two/three word month in arabic.
      // includes scottish gaelic two word and hyphenated months
      matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      regexes;

  regexes = {};

  function addRegexToken(token, regex, strictRegex) {
      regexes[token] = isFunction(regex)
          ? regex
          : function (isStrict, localeData) {
                return isStrict && strictRegex ? strictRegex : regex;
            };
  }

  function getParseRegexForToken(token, config) {
      if (!hasOwnProp(regexes, token)) {
          return new RegExp(unescapeFormat(token));
      }

      return regexes[token](config._strict, config._locale);
  }

  // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
  function unescapeFormat(s) {
      return regexEscape(
          s
              .replace('\\', '')
              .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                  matched,
                  p1,
                  p2,
                  p3,
                  p4
              ) {
                  return p1 || p2 || p3 || p4;
              })
      );
  }

  function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
      var i,
          func = callback;
      if (typeof token === 'string') {
          token = [token];
      }
      if (isNumber(callback)) {
          func = function (input, array) {
              array[callback] = toInt(input);
          };
      }
      for (i = 0; i < token.length; i++) {
          tokens[token[i]] = func;
      }
  }

  function addWeekParseToken(token, callback) {
      addParseToken(token, function (input, array, config, token) {
          config._w = config._w || {};
          callback(input, config._w, config, token);
      });
  }

  function addTimeToArrayFromToken(token, input, config) {
      if (input != null && hasOwnProp(tokens, token)) {
          tokens[token](input, config._a, config, token);
      }
  }

  var YEAR = 0,
      MONTH = 1,
      DATE = 2,
      HOUR = 3,
      MINUTE = 4,
      SECOND = 5,
      MILLISECOND = 6,
      WEEK = 7,
      WEEKDAY = 8;

  function mod(n, x) {
      return ((n % x) + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
      indexOf = Array.prototype.indexOf;
  } else {
      indexOf = function (o) {
          // I know
          var i;
          for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                  return i;
              }
          }
          return -1;
      };
  }

  function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
          return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1
          ? isLeapYear(year)
              ? 29
              : 28
          : 31 - ((modMonth % 7) % 2);
  }

  // FORMATTING

  addFormatToken('M', ['MM', 2], 'Mo', function () {
      return this.month() + 1;
  });

  addFormatToken('MMM', 0, 0, function (format) {
      return this.localeData().monthsShort(this, format);
  });

  addFormatToken('MMMM', 0, 0, function (format) {
      return this.localeData().months(this, format);
  });

  // ALIASES

  addUnitAlias('month', 'M');

  // PRIORITY

  addUnitPriority('month', 8);

  // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
      return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
      return locale.monthsRegex(isStrict);
  });

  addParseToken(['M', 'MM'], function (input, array) {
      array[MONTH] = toInt(input) - 1;
  });

  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
      var month = config._locale.monthsParse(input, token, config._strict);
      // if we didn't find a month name, mark the date as invalid.
      if (month != null) {
          array[MONTH] = month;
      } else {
          getParsingFlags(config).invalidMonth = input;
      }
  });

  // LOCALES

  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
          '_'
      ),
      defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
          '_'
      ),
      MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      defaultMonthsShortRegex = matchWord,
      defaultMonthsRegex = matchWord;

  function localeMonths(m, format) {
      if (!m) {
          return isArray(this._months)
              ? this._months
              : this._months['standalone'];
      }
      return isArray(this._months)
          ? this._months[m.month()]
          : this._months[
                (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                    ? 'format'
                    : 'standalone'
            ][m.month()];
  }

  function localeMonthsShort(m, format) {
      if (!m) {
          return isArray(this._monthsShort)
              ? this._monthsShort
              : this._monthsShort['standalone'];
      }
      return isArray(this._monthsShort)
          ? this._monthsShort[m.month()]
          : this._monthsShort[
                MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
            ][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
      var i,
          ii,
          mom,
          llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
          // this is not used
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
              mom = createUTC([2000, i]);
              this._shortMonthsParse[i] = this.monthsShort(
                  mom,
                  ''
              ).toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
          }
      }

      if (strict) {
          if (format === 'MMM') {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
          }
      } else {
          if (format === 'MMM') {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
          }
      }
  }

  function localeMonthsParse(monthName, format, strict) {
      var i, mom, regex;

      if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format, strict);
      }

      if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
      }

      // TODO: add sorting
      // Sorting makes sure if one month (or abbr) is a prefix of another
      // see sorting in computeMonthsParse
      for (i = 0; i < 12; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, i]);
          if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp(
                  '^' + this.months(mom, '').replace('.', '') + '$',
                  'i'
              );
              this._shortMonthsParse[i] = new RegExp(
                  '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                  'i'
              );
          }
          if (!strict && !this._monthsParse[i]) {
              regex =
                  '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
              this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }
          // test the regex
          if (
              strict &&
              format === 'MMMM' &&
              this._longMonthsParse[i].test(monthName)
          ) {
              return i;
          } else if (
              strict &&
              format === 'MMM' &&
              this._shortMonthsParse[i].test(monthName)
          ) {
              return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
          }
      }
  }

  // MOMENTS

  function setMonth(mom, value) {
      var dayOfMonth;

      if (!mom.isValid()) {
          // No op
          return mom;
      }

      if (typeof value === 'string') {
          if (/^\d+$/.test(value)) {
              value = toInt(value);
          } else {
              value = mom.localeData().monthsParse(value);
              // TODO: Another silent failure?
              if (!isNumber(value)) {
                  return mom;
              }
          }
      }

      dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
      mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
      return mom;
  }

  function getSetMonth(value) {
      if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
      } else {
          return get(this, 'Month');
      }
  }

  function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
  }

  function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
          }
          if (isStrict) {
              return this._monthsShortStrictRegex;
          } else {
              return this._monthsShortRegex;
          }
      } else {
          if (!hasOwnProp(this, '_monthsShortRegex')) {
              this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict
              ? this._monthsShortStrictRegex
              : this._monthsShortRegex;
      }
  }

  function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
          }
          if (isStrict) {
              return this._monthsStrictRegex;
          } else {
              return this._monthsRegex;
          }
      } else {
          if (!hasOwnProp(this, '_monthsRegex')) {
              this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict
              ? this._monthsStrictRegex
              : this._monthsRegex;
      }
  }

  function computeMonthsParse() {
      function cmpLenRev(a, b) {
          return b.length - a.length;
      }

      var shortPieces = [],
          longPieces = [],
          mixedPieces = [],
          i,
          mom;
      for (i = 0; i < 12; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, i]);
          shortPieces.push(this.monthsShort(mom, ''));
          longPieces.push(this.months(mom, ''));
          mixedPieces.push(this.months(mom, ''));
          mixedPieces.push(this.monthsShort(mom, ''));
      }
      // Sorting makes sure if one month (or abbr) is a prefix of another it
      // will match the longer piece.
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
      }
      for (i = 0; i < 24; i++) {
          mixedPieces[i] = regexEscape(mixedPieces[i]);
      }

      this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp(
          '^(' + longPieces.join('|') + ')',
          'i'
      );
      this._monthsShortStrictRegex = new RegExp(
          '^(' + shortPieces.join('|') + ')',
          'i'
      );
  }

  // FORMATTING

  addFormatToken('Y', 0, 0, function () {
      var y = this.year();
      return y <= 9999 ? zeroFill(y, 4) : '+' + y;
  });

  addFormatToken(0, ['YY', 2], 0, function () {
      return this.year() % 100;
  });

  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

  // ALIASES

  addUnitAlias('year', 'y');

  // PRIORITIES

  addUnitPriority('year', 1);

  // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);

  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
      array[YEAR] =
          input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
      array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
      array[YEAR] = parseInt(input, 10);
  });

  // HELPERS

  function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
  }

  // HOOKS

  hooks.parseTwoDigitYear = function (input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };

  // MOMENTS

  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
      return isLeapYear(this.year());
  }

  function createDate(y, m, d, h, M, s, ms) {
      // can't just apply() to create a date:
      // https://stackoverflow.com/q/181348
      var date;
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          date = new Date(y + 400, m, d, h, M, s, ms);
          if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
          }
      } else {
          date = new Date(y, m, d, h, M, s, ms);
      }

      return date;
  }

  function createUTCDate(y) {
      var date, args;
      // the Date.UTC function remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          // preserve leap years using a full 400 year cycle, then reset
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
          }
      } else {
          date = new Date(Date.UTC.apply(null, arguments));
      }

      return date;
  }

  // start-of-first-week - start-of-year
  function firstWeekOffset(year, dow, doy) {
      var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
          fwd = 7 + dow - doy,
          // first-week day local weekday -- which local weekday is fwd
          fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

      return -fwdlw + fwd - 1;
  }

  // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7,
          weekOffset = firstWeekOffset(year, dow, doy),
          dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
          resYear,
          resDayOfYear;

      if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
      } else {
          resYear = year;
          resDayOfYear = dayOfYear;
      }

      return {
          year: resYear,
          dayOfYear: resDayOfYear,
      };
  }

  function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
          week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
          resWeek,
          resYear;

      if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
      } else {
          resYear = mom.year();
          resWeek = week;
      }

      return {
          week: resWeek,
          year: resYear,
      };
  }

  function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy),
          weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }

  // FORMATTING

  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

  // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W');

  // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5);

  // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);

  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
      input,
      week,
      config,
      token
  ) {
      week[token.substr(0, 1)] = toInt(input);
  });

  // HELPERS

  // LOCALES

  function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
      dow: 0, // Sunday is the first day of the week.
      doy: 6, // The week that contains Jan 6th is the first week of the year.
  };

  function localeFirstDayOfWeek() {
      return this._week.dow;
  }

  function localeFirstDayOfYear() {
      return this._week.doy;
  }

  // MOMENTS

  function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, 'd');
  }

  // FORMATTING

  addFormatToken('d', 0, 'do', 'day');

  addFormatToken('dd', 0, 0, function (format) {
      return this.localeData().weekdaysMin(this, format);
  });

  addFormatToken('ddd', 0, 0, function (format) {
      return this.localeData().weekdaysShort(this, format);
  });

  addFormatToken('dddd', 0, 0, function (format) {
      return this.localeData().weekdays(this, format);
  });

  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday');

  // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E');

  // PRIORITY
  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11);

  // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
      return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
      return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
      return locale.weekdaysRegex(isStrict);
  });

  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
      var weekday = config._locale.weekdaysParse(input, token, config._strict);
      // if we didn't get a weekday name, mark the date as invalid
      if (weekday != null) {
          week.d = weekday;
      } else {
          getParsingFlags(config).invalidWeekday = input;
      }
  });

  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
      week[token] = toInt(input);
  });

  // HELPERS

  function parseWeekday(input, locale) {
      if (typeof input !== 'string') {
          return input;
      }

      if (!isNaN(input)) {
          return parseInt(input, 10);
      }

      input = locale.weekdaysParse(input);
      if (typeof input === 'number') {
          return input;
      }

      return null;
  }

  function parseIsoWeekday(input, locale) {
      if (typeof input === 'string') {
          return locale.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
  }

  // LOCALES
  function shiftWeekdays(ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
          '_'
      ),
      defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
      defaultWeekdaysRegex = matchWord,
      defaultWeekdaysShortRegex = matchWord,
      defaultWeekdaysMinRegex = matchWord;

  function localeWeekdays(m, format) {
      var weekdays = isArray(this._weekdays)
          ? this._weekdays
          : this._weekdays[
                m && m !== true && this._weekdays.isFormat.test(format)
                    ? 'format'
                    : 'standalone'
            ];
      return m === true
          ? shiftWeekdays(weekdays, this._week.dow)
          : m
          ? weekdays[m.day()]
          : weekdays;
  }

  function localeWeekdaysShort(m) {
      return m === true
          ? shiftWeekdays(this._weekdaysShort, this._week.dow)
          : m
          ? this._weekdaysShort[m.day()]
          : this._weekdaysShort;
  }

  function localeWeekdaysMin(m) {
      return m === true
          ? shiftWeekdays(this._weekdaysMin, this._week.dow)
          : m
          ? this._weekdaysMin[m.day()]
          : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
      var i,
          ii,
          mom,
          llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];

          for (i = 0; i < 7; ++i) {
              mom = createUTC([2000, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(
                  mom,
                  ''
              ).toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(
                  mom,
                  ''
              ).toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
          }
      }

      if (strict) {
          if (format === 'dddd') {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          }
      } else {
          if (format === 'dddd') {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          }
      }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
      var i, mom, regex;

      if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format, strict);
      }

      if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
      }

      for (i = 0; i < 7; i++) {
          // make the regex if we don't have it already

          mom = createUTC([2000, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp(
                  '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                  'i'
              );
              this._shortWeekdaysParse[i] = new RegExp(
                  '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                  'i'
              );
              this._minWeekdaysParse[i] = new RegExp(
                  '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                  'i'
              );
          }
          if (!this._weekdaysParse[i]) {
              regex =
                  '^' +
                  this.weekdays(mom, '') +
                  '|^' +
                  this.weekdaysShort(mom, '') +
                  '|^' +
                  this.weekdaysMin(mom, '');
              this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }
          // test the regex
          if (
              strict &&
              format === 'dddd' &&
              this._fullWeekdaysParse[i].test(weekdayName)
          ) {
              return i;
          } else if (
              strict &&
              format === 'ddd' &&
              this._shortWeekdaysParse[i].test(weekdayName)
          ) {
              return i;
          } else if (
              strict &&
              format === 'dd' &&
              this._minWeekdaysParse[i].test(weekdayName)
          ) {
              return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
          }
      }
  }

  // MOMENTS

  function getSetDayOfWeek(input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, 'd');
      } else {
          return day;
      }
  }

  function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }

      // behaves the same as moment#day except
      // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
      // as a setter, sunday should belong to the previous week.

      if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
          return this.day() || 7;
      }
  }

  function weekdaysRegex(isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysStrictRegex;
          } else {
              return this._weekdaysRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict
              ? this._weekdaysStrictRegex
              : this._weekdaysRegex;
      }
  }

  function weekdaysShortRegex(isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysShortStrictRegex;
          } else {
              return this._weekdaysShortRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysShortRegex')) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict
              ? this._weekdaysShortStrictRegex
              : this._weekdaysShortRegex;
      }
  }

  function weekdaysMinRegex(isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysMinStrictRegex;
          } else {
              return this._weekdaysMinRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysMinRegex')) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict
              ? this._weekdaysMinStrictRegex
              : this._weekdaysMinRegex;
      }
  }

  function computeWeekdaysParse() {
      function cmpLenRev(a, b) {
          return b.length - a.length;
      }

      var minPieces = [],
          shortPieces = [],
          longPieces = [],
          mixedPieces = [],
          i,
          mom,
          minp,
          shortp,
          longp;
      for (i = 0; i < 7; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ''));
          shortp = regexEscape(this.weekdaysShort(mom, ''));
          longp = regexEscape(this.weekdays(mom, ''));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
      }
      // Sorting makes sure if one weekday (or abbr) is a prefix of another it
      // will match the longer piece.
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);

      this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;

      this._weekdaysStrictRegex = new RegExp(
          '^(' + longPieces.join('|') + ')',
          'i'
      );
      this._weekdaysShortStrictRegex = new RegExp(
          '^(' + shortPieces.join('|') + ')',
          'i'
      );
      this._weekdaysMinStrictRegex = new RegExp(
          '^(' + minPieces.join('|') + ')',
          'i'
      );
  }

  // FORMATTING

  function hFormat() {
      return this.hours() % 12 || 12;
  }

  function kFormat() {
      return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);

  addFormatToken('hmm', 0, 0, function () {
      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });

  addFormatToken('hmmss', 0, 0, function () {
      return (
          '' +
          hFormat.apply(this) +
          zeroFill(this.minutes(), 2) +
          zeroFill(this.seconds(), 2)
      );
  });

  addFormatToken('Hmm', 0, 0, function () {
      return '' + this.hours() + zeroFill(this.minutes(), 2);
  });

  addFormatToken('Hmmss', 0, 0, function () {
      return (
          '' +
          this.hours() +
          zeroFill(this.minutes(), 2) +
          zeroFill(this.seconds(), 2)
      );
  });

  function meridiem(token, lowercase) {
      addFormatToken(token, 0, 0, function () {
          return this.localeData().meridiem(
              this.hours(),
              this.minutes(),
              lowercase
          );
      });
  }

  meridiem('a', true);
  meridiem('A', false);

  // ALIASES

  addUnitAlias('hour', 'h');

  // PRIORITY
  addUnitPriority('hour', 13);

  // PARSING

  function matchMeridiem(isStrict, locale) {
      return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);

  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);

  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
      var kInput = toInt(input);
      array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
      var pos1 = input.length - 4,
          pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
      var pos1 = input.length - 4,
          pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
  });

  // LOCALES

  function localeIsPM(input) {
      // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
      // Using charAt should be more compatible.
      return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
      // Setting the hour should keep the time, because the user explicitly
      // specified which hour they want. So trying to maintain the same hour (in
      // a new timezone) makes sense. Adding/subtracting hours does not follow
      // this rule.
      getSetHour = makeGetSet('Hours', true);

  function localeMeridiem(hours, minutes, isLower) {
      if (hours > 11) {
          return isLower ? 'pm' : 'PM';
      } else {
          return isLower ? 'am' : 'AM';
      }
  }

  var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,

      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,

      week: defaultLocaleWeek,

      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,

      meridiemParse: defaultLocaleMeridiemParse,
  };

  // internal storage for locale config files
  var locales = {},
      localeFamilies = {},
      globalLocale;

  function commonPrefix(arr1, arr2) {
      var i,
          minl = Math.min(arr1.length, arr2.length);
      for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
              return i;
          }
      }
      return minl;
  }

  function normalizeLocale(key) {
      return key ? key.toLowerCase().replace('_', '-') : key;
  }

  // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
  function chooseLocale(names) {
      var i = 0,
          j,
          next,
          locale,
          split;

      while (i < names.length) {
          split = normalizeLocale(names[i]).split('-');
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split('-') : null;
          while (j > 0) {
              locale = loadLocale(split.slice(0, j).join('-'));
              if (locale) {
                  return locale;
              }
              if (
                  next &&
                  next.length >= j &&
                  commonPrefix(split, next) >= j - 1
              ) {
                  //the next array item is better than a shallower substring of this one
                  break;
              }
              j--;
          }
          i++;
      }
      return globalLocale;
  }

  function loadLocale(name) {
      var oldLocale = null,
          aliasedRequire;
      // TODO: Find a better way to register and load all the locales in Node
      if (
          locales[name] === undefined &&
          typeof module !== 'undefined' &&
          module &&
          module.exports
      ) {
          try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = require;
              aliasedRequire('./locale/' + name);
              getSetGlobalLocale(oldLocale);
          } catch (e) {
              // mark as not found to avoid repeating expensive file require call causing high CPU
              // when trying to find en-US, en_US, en-us for every format call
              locales[name] = null; // null means not found
          }
      }
      return locales[name];
  }

  // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.
  function getSetGlobalLocale(key, values) {
      var data;
      if (key) {
          if (isUndefined(values)) {
              data = getLocale(key);
          } else {
              data = defineLocale(key, values);
          }

          if (data) {
              // moment.duration._locale = moment._locale = data;
              globalLocale = data;
          } else {
              if (typeof console !== 'undefined' && console.warn) {
                  //warn user if arguments are passed but the locale could not be set
                  console.warn(
                      'Locale ' + key + ' not found. Did you forget to load it?'
                  );
              }
          }
      }

      return globalLocale._abbr;
  }

  function defineLocale(name, config) {
      if (config !== null) {
          var locale,
              parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
              deprecateSimple(
                  'defineLocaleOverride',
                  'use moment.updateLocale(localeName, config) to change ' +
                      'an existing locale. moment.defineLocale(localeName, ' +
                      'config) should only be used for creating a new locale ' +
                      'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
              );
              parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                  parentConfig = locales[config.parentLocale]._config;
              } else {
                  locale = loadLocale(config.parentLocale);
                  if (locale != null) {
                      parentConfig = locale._config;
                  } else {
                      if (!localeFamilies[config.parentLocale]) {
                          localeFamilies[config.parentLocale] = [];
                      }
                      localeFamilies[config.parentLocale].push({
                          name: name,
                          config: config,
                      });
                      return null;
                  }
              }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));

          if (localeFamilies[name]) {
              localeFamilies[name].forEach(function (x) {
                  defineLocale(x.name, x.config);
              });
          }

          // backwards compat for now: also set the locale
          // make sure we set the locale AFTER all child locales have been
          // created, so we won't end up with the child locale set.
          getSetGlobalLocale(name);

          return locales[name];
      } else {
          // useful for testing
          delete locales[name];
          return null;
      }
  }

  function updateLocale(name, config) {
      if (config != null) {
          var locale,
              tmpLocale,
              parentConfig = baseConfig;

          if (locales[name] != null && locales[name].parentLocale != null) {
              // Update existing child locale in-place to avoid memory-leaks
              locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
              // MERGE
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                  parentConfig = tmpLocale._config;
              }
              config = mergeConfigs(parentConfig, config);
              if (tmpLocale == null) {
                  // updateLocale is called for creating a new locale
                  // Set abbr so it will have a name (getters return
                  // undefined otherwise).
                  config.abbr = name;
              }
              locale = new Locale(config);
              locale.parentLocale = locales[name];
              locales[name] = locale;
          }

          // backwards compat for now: also set the locale
          getSetGlobalLocale(name);
      } else {
          // pass null for config to unupdate, useful for tests
          if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                  locales[name] = locales[name].parentLocale;
                  if (name === getSetGlobalLocale()) {
                      getSetGlobalLocale(name);
                  }
              } else if (locales[name] != null) {
                  delete locales[name];
              }
          }
      }
      return locales[name];
  }

  // returns locale data
  function getLocale(key) {
      var locale;

      if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
      }

      if (!key) {
          return globalLocale;
      }

      if (!isArray(key)) {
          //short-circuit everything else
          locale = loadLocale(key);
          if (locale) {
              return locale;
          }
          key = [key];
      }

      return chooseLocale(key);
  }

  function listLocales() {
      return keys(locales);
  }

  function checkOverflow(m) {
      var overflow,
          a = m._a;

      if (a && getParsingFlags(m).overflow === -2) {
          overflow =
              a[MONTH] < 0 || a[MONTH] > 11
                  ? MONTH
                  : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                  ? DATE
                  : a[HOUR] < 0 ||
                    a[HOUR] > 24 ||
                    (a[HOUR] === 24 &&
                        (a[MINUTE] !== 0 ||
                            a[SECOND] !== 0 ||
                            a[MILLISECOND] !== 0))
                  ? HOUR
                  : a[MINUTE] < 0 || a[MINUTE] > 59
                  ? MINUTE
                  : a[SECOND] < 0 || a[SECOND] > 59
                  ? SECOND
                  : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                  ? MILLISECOND
                  : -1;

          if (
              getParsingFlags(m)._overflowDayOfYear &&
              (overflow < YEAR || overflow > DATE)
          ) {
              overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
          }

          getParsingFlags(m).overflow = overflow;
      }

      return m;
  }

  // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
      isoDates = [
          ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
          ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
          ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
          ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
          ['YYYY-DDD', /\d{4}-\d{3}/],
          ['YYYY-MM', /\d{4}-\d\d/, false],
          ['YYYYYYMMDD', /[+-]\d{10}/],
          ['YYYYMMDD', /\d{8}/],
          ['GGGG[W]WWE', /\d{4}W\d{3}/],
          ['GGGG[W]WW', /\d{4}W\d{2}/, false],
          ['YYYYDDD', /\d{7}/],
          ['YYYYMM', /\d{6}/, false],
          ['YYYY', /\d{4}/, false],
      ],
      // iso time formats and regexes
      isoTimes = [
          ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
          ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
          ['HH:mm:ss', /\d\d:\d\d:\d\d/],
          ['HH:mm', /\d\d:\d\d/],
          ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
          ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
          ['HHmmss', /\d\d\d\d\d\d/],
          ['HHmm', /\d\d\d\d/],
          ['HH', /\d\d/],
      ],
      aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
      // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
      rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      obsOffsets = {
          UT: 0,
          GMT: 0,
          EDT: -4 * 60,
          EST: -5 * 60,
          CDT: -5 * 60,
          CST: -6 * 60,
          MDT: -6 * 60,
          MST: -7 * 60,
          PDT: -7 * 60,
          PST: -8 * 60,
      };

  // date from iso format
  function configFromISO(config) {
      var i,
          l,
          string = config._i,
          match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
          allowTime,
          dateFormat,
          timeFormat,
          tzFormat;

      if (match) {
          getParsingFlags(config).iso = true;

          for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                  dateFormat = isoDates[i][0];
                  allowTime = isoDates[i][2] !== false;
                  break;
              }
          }
          if (dateFormat == null) {
              config._isValid = false;
              return;
          }
          if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                  if (isoTimes[i][1].exec(match[3])) {
                      // match[2] should be 'T' or space
                      timeFormat = (match[2] || ' ') + isoTimes[i][0];
                      break;
                  }
              }
              if (timeFormat == null) {
                  config._isValid = false;
                  return;
              }
          }
          if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
          }
          if (match[4]) {
              if (tzRegex.exec(match[4])) {
                  tzFormat = 'Z';
              } else {
                  config._isValid = false;
                  return;
              }
          }
          config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
          configFromStringAndFormat(config);
      } else {
          config._isValid = false;
      }
  }

  function extractFromRFC2822Strings(
      yearStr,
      monthStr,
      dayStr,
      hourStr,
      minuteStr,
      secondStr
  ) {
      var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10),
      ];

      if (secondStr) {
          result.push(parseInt(secondStr, 10));
      }

      return result;
  }

  function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
          return 2000 + year;
      } else if (year <= 999) {
          return 1900 + year;
      }
      return year;
  }

  function preprocessRFC2822(s) {
      // Remove comments and folding whitespace and replace multiple-spaces with a single space
      return s
          .replace(/\([^)]*\)|[\n\t]/g, ' ')
          .replace(/(\s\s+)/g, ' ')
          .replace(/^\s\s*/, '')
          .replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
          // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
              weekdayActual = new Date(
                  parsedInput[0],
                  parsedInput[1],
                  parsedInput[2]
              ).getDay();
          if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
          }
      }
      return true;
  }

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
          return obsOffsets[obsOffset];
      } else if (militaryOffset) {
          // the only allowed military tz is Z
          return 0;
      } else {
          var hm = parseInt(numOffset, 10),
              m = hm % 100,
              h = (hm - m) / 100;
          return h * 60 + m;
      }
  }

  // date and time from ref 2822 format
  function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i)),
          parsedArray;
      if (match) {
          parsedArray = extractFromRFC2822Strings(
              match[4],
              match[3],
              match[2],
              match[5],
              match[6],
              match[7]
          );
          if (!checkWeekday(match[1], parsedArray, config)) {
              return;
          }

          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);

          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

          getParsingFlags(config).rfc2822 = true;
      } else {
          config._isValid = false;
      }
  }

  // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
  function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
          config._d = new Date(+matched[1]);
          return;
      }

      configFromISO(config);
      if (config._isValid === false) {
          delete config._isValid;
      } else {
          return;
      }

      configFromRFC2822(config);
      if (config._isValid === false) {
          delete config._isValid;
      } else {
          return;
      }

      if (config._strict) {
          config._isValid = false;
      } else {
          // Final attempt, use Input Fallback
          hooks.createFromInputFallback(config);
      }
  }

  hooks.createFromInputFallback = deprecate(
      'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
          'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
          'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
      function (config) {
          config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
      }
  );

  // Pick the first defined of two or three arguments.
  function defaults(a, b, c) {
      if (a != null) {
          return a;
      }
      if (b != null) {
          return b;
      }
      return c;
  }

  function currentDateArray(config) {
      // hooks is actually the exported moment object
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
          return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate(),
          ];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }

  // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]
  function configFromArray(config) {
      var i,
          date,
          input = [],
          currentDate,
          expectedWeekday,
          yearToUse;

      if (config._d) {
          return;
      }

      currentDate = currentDateArray(config);

      //compute day of the year from weeks and weekdays
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
      }

      //if the day of the year is set, figure out what it is
      if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

          if (
              config._dayOfYear > daysInYear(yearToUse) ||
              config._dayOfYear === 0
          ) {
              getParsingFlags(config)._overflowDayOfYear = true;
          }

          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
      }

      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
      }

      // Zero out whatever was not defaulted, including time
      for (; i < 7; i++) {
          config._a[i] = input[i] =
              config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
      }

      // Check for 24:00:00.000
      if (
          config._a[HOUR] === 24 &&
          config._a[MINUTE] === 0 &&
          config._a[SECOND] === 0 &&
          config._a[MILLISECOND] === 0
      ) {
          config._nextDay = true;
          config._a[HOUR] = 0;
      }

      config._d = (config._useUTC ? createUTCDate : createDate).apply(
          null,
          input
      );
      expectedWeekday = config._useUTC
          ? config._d.getUTCDay()
          : config._d.getDay();

      // Apply timezone offset from input. The actual utcOffset can be changed
      // with parseZone.
      if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }

      if (config._nextDay) {
          config._a[HOUR] = 24;
      }

      // check for mismatching day of week
      if (
          config._w &&
          typeof config._w.d !== 'undefined' &&
          config._w.d !== expectedWeekday
      ) {
          getParsingFlags(config).weekdayMismatch = true;
      }
  }

  function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;

          // TODO: We need to take the current isoWeekYear, but that depends on
          // how we interpret now (local, utc, fixed offset). So create
          // a now version of current config (take local/utc/offset flags, and
          // create now).
          weekYear = defaults(
              w.GG,
              config._a[YEAR],
              weekOfYear(createLocal(), 1, 4).year
          );
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
          }
      } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;

          curWeek = weekOfYear(createLocal(), dow, doy);

          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

          // Default to current week.
          week = defaults(w.w, curWeek.week);

          if (w.d != null) {
              // weekday -- low day numbers are considered next week
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                  weekdayOverflow = true;
              }
          } else if (w.e != null) {
              // local weekday -- counting starts from beginning of week
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                  weekdayOverflow = true;
              }
          } else {
              // default to beginning of week
              weekday = dow;
          }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
      } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
      }
  }

  // constant that refers to the ISO standard
  hooks.ISO_8601 = function () {};

  // constant that refers to the RFC 2822 form
  hooks.RFC_2822 = function () {};

  // date from string and format string
  function configFromStringAndFormat(config) {
      // TODO: Move this to another part of the creation flow to prevent circular deps
      if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
      }
      if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;

      // This array is used to make a Date, either with `new Date` or `Date.UTC`
      var string = '' + config._i,
          i,
          parsedInput,
          tokens,
          token,
          skipped,
          stringLength = string.length,
          totalParsedInputLength = 0,
          era;

      tokens =
          expandFormat(config._f, config._locale).match(formattingTokens) || [];

      for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          parsedInput = (string.match(getParseRegexForToken(token, config)) ||
              [])[0];
          if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                  getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(
                  string.indexOf(parsedInput) + parsedInput.length
              );
              totalParsedInputLength += parsedInput.length;
          }
          // don't parse if it's not a known token
          if (formatTokenFunctions[token]) {
              if (parsedInput) {
                  getParsingFlags(config).empty = false;
              } else {
                  getParsingFlags(config).unusedTokens.push(token);
              }
              addTimeToArrayFromToken(token, parsedInput, config);
          } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token);
          }
      }

      // add remaining unparsed input length to the string
      getParsingFlags(config).charsLeftOver =
          stringLength - totalParsedInputLength;
      if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
      }

      // clear _12h flag if hour is <= 12
      if (
          config._a[HOUR] <= 12 &&
          getParsingFlags(config).bigHour === true &&
          config._a[HOUR] > 0
      ) {
          getParsingFlags(config).bigHour = undefined;
      }

      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      // handle meridiem
      config._a[HOUR] = meridiemFixWrap(
          config._locale,
          config._a[HOUR],
          config._meridiem
      );

      // handle era
      era = getParsingFlags(config).era;
      if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
      }

      configFromArray(config);
      checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
      var isPm;

      if (meridiem == null) {
          // nothing to do
          return hour;
      }
      if (locale.meridiemHour != null) {
          return locale.meridiemHour(hour, meridiem);
      } else if (locale.isPM != null) {
          // Fallback
          isPm = locale.isPM(meridiem);
          if (isPm && hour < 12) {
              hour += 12;
          }
          if (!isPm && hour === 12) {
              hour = 0;
          }
          return hour;
      } else {
          // this is not supposed to happen
          return hour;
      }
  }

  // date from string and array of format strings
  function configFromStringAndArray(config) {
      var tempConfig,
          bestMoment,
          scoreToBeat,
          i,
          currentScore,
          validFormatFound,
          bestFormatIsValid = false;

      if (config._f.length === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
      }

      for (i = 0; i < config._f.length; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);

          if (isValid(tempConfig)) {
              validFormatFound = true;
          }

          // if there is any input that was not parsed add a penalty for that format
          currentScore += getParsingFlags(tempConfig).charsLeftOver;

          //or tokens
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

          getParsingFlags(tempConfig).score = currentScore;

          if (!bestFormatIsValid) {
              if (
                  scoreToBeat == null ||
                  currentScore < scoreToBeat ||
                  validFormatFound
              ) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
                  if (validFormatFound) {
                      bestFormatIsValid = true;
                  }
              }
          } else {
              if (currentScore < scoreToBeat) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
              }
          }
      }

      extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
      if (config._d) {
          return;
      }

      var i = normalizeObjectUnits(config._i),
          dayOrDate = i.day === undefined ? i.date : i.day;
      config._a = map(
          [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
          function (obj) {
              return obj && parseInt(obj, 10);
          }
      );

      configFromArray(config);
  }

  function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
          // Adding is smart enough around DST
          res.add(1, 'd');
          res._nextDay = undefined;
      }

      return res;
  }

  function prepareConfig(config) {
      var input = config._i,
          format = config._f;

      config._locale = config._locale || getLocale(config._l);

      if (input === null || (format === undefined && input === '')) {
          return createInvalid({ nullInput: true });
      }

      if (typeof input === 'string') {
          config._i = input = config._locale.preparse(input);
      }

      if (isMoment(input)) {
          return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
          config._d = input;
      } else if (isArray(format)) {
          configFromStringAndArray(config);
      } else if (format) {
          configFromStringAndFormat(config);
      } else {
          configFromInput(config);
      }

      if (!isValid(config)) {
          config._d = null;
      }

      return config;
  }

  function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
          config._d = new Date(hooks.now());
      } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
      } else if (typeof input === 'string') {
          configFromString(config);
      } else if (isArray(input)) {
          config._a = map(input.slice(0), function (obj) {
              return parseInt(obj, 10);
          });
          configFromArray(config);
      } else if (isObject(input)) {
          configFromObject(config);
      } else if (isNumber(input)) {
          // from milliseconds
          config._d = new Date(input);
      } else {
          hooks.createFromInputFallback(config);
      }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
      var c = {};

      if (format === true || format === false) {
          strict = format;
          format = undefined;
      }

      if (locale === true || locale === false) {
          strict = locale;
          locale = undefined;
      }

      if (
          (isObject(input) && isObjectEmpty(input)) ||
          (isArray(input) && input.length === 0)
      ) {
          input = undefined;
      }
      // object construction must be done this way.
      // https://github.com/moment/moment/issues/1423
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale;
      c._i = input;
      c._f = format;
      c._strict = strict;

      return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate(
          'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
          function () {
              var other = createLocal.apply(null, arguments);
              if (this.isValid() && other.isValid()) {
                  return other < this ? this : other;
              } else {
                  return createInvalid();
              }
          }
      ),
      prototypeMax = deprecate(
          'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
          function () {
              var other = createLocal.apply(null, arguments);
              if (this.isValid() && other.isValid()) {
                  return other > this ? this : other;
              } else {
                  return createInvalid();
              }
          }
      );

  // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.
  function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
      }
      if (!moments.length) {
          return createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
          }
      }
      return res;
  }

  // TODO: Use [].sort instead?
  function min() {
      var args = [].slice.call(arguments, 0);

      return pickBy('isBefore', args);
  }

  function max() {
      var args = [].slice.call(arguments, 0);

      return pickBy('isAfter', args);
  }

  var now = function () {
      return Date.now ? Date.now() : +new Date();
  };

  var ordering = [
      'year',
      'quarter',
      'month',
      'week',
      'day',
      'hour',
      'minute',
      'second',
      'millisecond',
  ];

  function isDurationValid(m) {
      var key,
          unitHasDecimal = false,
          i;
      for (key in m) {
          if (
              hasOwnProp(m, key) &&
              !(
                  indexOf.call(ordering, key) !== -1 &&
                  (m[key] == null || !isNaN(m[key]))
              )
          ) {
              return false;
          }
      }

      for (i = 0; i < ordering.length; ++i) {
          if (m[ordering[i]]) {
              if (unitHasDecimal) {
                  return false; // only allow non-integers for smallest unit
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                  unitHasDecimal = true;
              }
          }
      }

      return true;
  }

  function isValid$1() {
      return this._isValid;
  }

  function createInvalid$1() {
      return createDuration(NaN);
  }

  function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration),
          years = normalizedInput.year || 0,
          quarters = normalizedInput.quarter || 0,
          months = normalizedInput.month || 0,
          weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
          days = normalizedInput.day || 0,
          hours = normalizedInput.hour || 0,
          minutes = normalizedInput.minute || 0,
          seconds = normalizedInput.second || 0,
          milliseconds = normalizedInput.millisecond || 0;

      this._isValid = isDurationValid(normalizedInput);

      // representation for dateAddRemove
      this._milliseconds =
          +milliseconds +
          seconds * 1e3 + // 1000
          minutes * 6e4 + // 1000 * 60
          hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
      // Because of dateAddRemove treats 24 hours as different from a
      // day when working around DST, we need to store them separately
      this._days = +days + weeks * 7;
      // It is impossible to translate months into days without knowing
      // which months you are are talking about, so we have to store
      // it separately.
      this._months = +months + quarters * 3 + years * 12;

      this._data = {};

      this._locale = getLocale();

      this._bubble();
  }

  function isDuration(obj) {
      return obj instanceof Duration;
  }

  function absRound(number) {
      if (number < 0) {
          return Math.round(-1 * number) * -1;
      } else {
          return Math.round(number);
      }
  }

  // compare two arrays, return the number of differences
  function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length),
          lengthDiff = Math.abs(array1.length - array2.length),
          diffs = 0,
          i;
      for (i = 0; i < len; i++) {
          if (
              (dontConvert && array1[i] !== array2[i]) ||
              (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
          ) {
              diffs++;
          }
      }
      return diffs + lengthDiff;
  }

  // FORMATTING

  function offset(token, separator) {
      addFormatToken(token, 0, 0, function () {
          var offset = this.utcOffset(),
              sign = '+';
          if (offset < 0) {
              offset = -offset;
              sign = '-';
          }
          return (
              sign +
              zeroFill(~~(offset / 60), 2) +
              separator +
              zeroFill(~~offset % 60, 2)
          );
      });
  }

  offset('Z', ':');
  offset('ZZ', '');

  // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
  });

  // HELPERS

  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']
  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
      var matches = (string || '').match(matcher),
          chunk,
          parts,
          minutes;

      if (matches === null) {
          return null;
      }

      chunk = matches[matches.length - 1] || [];
      parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
      minutes = +(parts[1] * 60) + toInt(parts[2]);

      return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  }

  // Return a moment from input, that is local/utc/zone equivalent to model.
  function cloneWithOffset(input, model) {
      var res, diff;
      if (model._isUTC) {
          res = model.clone();
          diff =
              (isMoment(input) || isDate(input)
                  ? input.valueOf()
                  : createLocal(input).valueOf()) - res.valueOf();
          // Use low-level api, because this fn is low-level api.
          res._d.setTime(res._d.valueOf() + diff);
          hooks.updateOffset(res, false);
          return res;
      } else {
          return createLocal(input).local();
      }
  }

  function getDateOffset(m) {
      // On Firefox.24 Date#getTimezoneOffset returns a floating point.
      // https://github.com/moment/moment/pull/1871
      return -Math.round(m._d.getTimezoneOffset());
  }

  // HOOKS

  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.
  hooks.updateOffset = function () {};

  // MOMENTS

  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.
  function getSetOffset(input, keepLocalTime, keepMinutes) {
      var offset = this._offset || 0,
          localAdjust;
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      if (input != null) {
          if (typeof input === 'string') {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                  return this;
              }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
              this.add(localAdjust, 'm');
          }
          if (offset !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                  addSubtract(
                      this,
                      createDuration(input - offset, 'm'),
                      1,
                      false
                  );
              } else if (!this._changeInProgress) {
                  this._changeInProgress = true;
                  hooks.updateOffset(this, true);
                  this._changeInProgress = null;
              }
          }
          return this;
      } else {
          return this._isUTC ? offset : getDateOffset(this);
      }
  }

  function getSetZone(input, keepLocalTime) {
      if (input != null) {
          if (typeof input !== 'string') {
              input = -input;
          }

          this.utcOffset(input, keepLocalTime);

          return this;
      } else {
          return -this.utcOffset();
      }
  }

  function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;

          if (keepLocalTime) {
              this.subtract(getDateOffset(this), 'm');
          }
      }
      return this;
  }

  function setOffsetToParsedOffset() {
      if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === 'string') {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
              this.utcOffset(tZone);
          } else {
              this.utcOffset(0, true);
          }
      }
      return this;
  }

  function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
          return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;

      return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
      return (
          this.utcOffset() > this.clone().month(0).utcOffset() ||
          this.utcOffset() > this.clone().month(5).utcOffset()
      );
  }

  function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
      }

      var c = {},
          other;

      copyConfig(c, this);
      c = prepareConfig(c);

      if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted =
              this.isValid() && compareArrays(c._a, other.toArray()) > 0;
      } else {
          this._isDSTShifted = false;
      }

      return this._isDSTShifted;
  }

  function isLocal() {
      return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }

  // ASP.NET json date format regex
  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
      // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
      // and further modified to allow for strings containing both week and day
      isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
      var duration = input,
          // matching against regexp is expensive, do it on demand
          match = null,
          sign,
          ret,
          diffRes;

      if (isDuration(input)) {
          duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months,
          };
      } else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
              duration[key] = +input;
          } else {
              duration.milliseconds = +input;
          }
      } else if ((match = aspNetRegex.exec(input))) {
          sign = match[1] === '-' ? -1 : 1;
          duration = {
              y: 0,
              d: toInt(match[DATE]) * sign,
              h: toInt(match[HOUR]) * sign,
              m: toInt(match[MINUTE]) * sign,
              s: toInt(match[SECOND]) * sign,
              ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
          };
      } else if ((match = isoRegex.exec(input))) {
          sign = match[1] === '-' ? -1 : 1;
          duration = {
              y: parseIso(match[2], sign),
              M: parseIso(match[3], sign),
              w: parseIso(match[4], sign),
              d: parseIso(match[5], sign),
              h: parseIso(match[6], sign),
              m: parseIso(match[7], sign),
              s: parseIso(match[8], sign),
          };
      } else if (duration == null) {
          // checks for null or undefined
          duration = {};
      } else if (
          typeof duration === 'object' &&
          ('from' in duration || 'to' in duration)
      ) {
          diffRes = momentsDifference(
              createLocal(duration.from),
              createLocal(duration.to)
          );

          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
      }

      ret = new Duration(duration);

      if (isDuration(input) && hasOwnProp(input, '_locale')) {
          ret._locale = input._locale;
      }

      if (isDuration(input) && hasOwnProp(input, '_isValid')) {
          ret._isValid = input._isValid;
      }

      return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
      // We'd normally use ~~inp for this, but unfortunately it also
      // converts floats to ints.
      // inp may be undefined, so careful calling replace on it.
      var res = inp && parseFloat(inp.replace(',', '.'));
      // apply sign while we're at it
      return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
      var res = {};

      res.months =
          other.month() - base.month() + (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, 'M').isAfter(other)) {
          --res.months;
      }

      res.milliseconds = +other - +base.clone().add(res.months, 'M');

      return res;
  }

  function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
      }

      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
      } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
      }

      return res;
  }

  // TODO: remove 'name' arg after deprecation is removed
  function createAdder(direction, name) {
      return function (val, period) {
          var dur, tmp;
          //invert the arguments, but complain about it
          if (period !== null && !isNaN(+period)) {
              deprecateSimple(
                  name,
                  'moment().' +
                      name +
                      '(period, number) is deprecated. Please use moment().' +
                      name +
                      '(number, period). ' +
                      'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
              );
              tmp = val;
              val = period;
              period = tmp;
          }

          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
      };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds = duration._milliseconds,
          days = absRound(duration._days),
          months = absRound(duration._months);

      if (!mom.isValid()) {
          // No op
          return;
      }

      updateOffset = updateOffset == null ? true : updateOffset;

      if (months) {
          setMonth(mom, get(mom, 'Month') + months * isAdding);
      }
      if (days) {
          set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
      }
      if (milliseconds) {
          mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
      }
      if (updateOffset) {
          hooks.updateOffset(mom, days || months);
      }
  }

  var add = createAdder(1, 'add'),
      subtract = createAdder(-1, 'subtract');

  function isString(input) {
      return typeof input === 'string' || input instanceof String;
  }

  // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
  function isMomentInput(input) {
      return (
          isMoment(input) ||
          isDate(input) ||
          isString(input) ||
          isNumber(input) ||
          isNumberOrStringArray(input) ||
          isMomentInputObject(input) ||
          input === null ||
          input === undefined
      );
  }

  function isMomentInputObject(input) {
      var objectTest = isObject(input) && !isObjectEmpty(input),
          propertyTest = false,
          properties = [
              'years',
              'year',
              'y',
              'months',
              'month',
              'M',
              'days',
              'day',
              'd',
              'dates',
              'date',
              'D',
              'hours',
              'hour',
              'h',
              'minutes',
              'minute',
              'm',
              'seconds',
              'second',
              's',
              'milliseconds',
              'millisecond',
              'ms',
          ],
          i,
          property;

      for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
      }

      return objectTest && propertyTest;
  }

  function isNumberOrStringArray(input) {
      var arrayTest = isArray(input),
          dataTypeTest = false;
      if (arrayTest) {
          dataTypeTest =
              input.filter(function (item) {
                  return !isNumber(item) && isString(input);
              }).length === 0;
      }
      return arrayTest && dataTypeTest;
  }

  function isCalendarSpec(input) {
      var objectTest = isObject(input) && !isObjectEmpty(input),
          propertyTest = false,
          properties = [
              'sameDay',
              'nextDay',
              'lastDay',
              'nextWeek',
              'lastWeek',
              'sameElse',
          ],
          i,
          property;

      for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
      }

      return objectTest && propertyTest;
  }

  function getCalendarFormat(myMoment, now) {
      var diff = myMoment.diff(now, 'days', true);
      return diff < -6
          ? 'sameElse'
          : diff < -1
          ? 'lastWeek'
          : diff < 0
          ? 'lastDay'
          : diff < 1
          ? 'sameDay'
          : diff < 2
          ? 'nextDay'
          : diff < 7
          ? 'nextWeek'
          : 'sameElse';
  }

  function calendar$1(time, formats) {
      // Support for single parameter, formats only overload to the calendar function
      if (arguments.length === 1) {
          if (!arguments[0]) {
              time = undefined;
              formats = undefined;
          } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = undefined;
          } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = undefined;
          }
      }
      // We want to compare the start of today, vs this.
      // Getting start-of-today depends on whether we're local/utc/offset or not.
      var now = time || createLocal(),
          sod = cloneWithOffset(now, this).startOf('day'),
          format = hooks.calendarFormat(this, sod) || 'sameElse',
          output =
              formats &&
              (isFunction(formats[format])
                  ? formats[format].call(this, now)
                  : formats[format]);

      return this.format(
          output || this.localeData().calendar(format, this, createLocal(now))
      );
  }

  function clone() {
      return new Moment(this);
  }

  function isAfter(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() > localInput.valueOf();
      } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
  }

  function isBefore(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() < localInput.valueOf();
      } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
  }

  function isBetween(from, to, units, inclusivity) {
      var localFrom = isMoment(from) ? from : createLocal(from),
          localTo = isMoment(to) ? to : createLocal(to);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
      }
      inclusivity = inclusivity || '()';
      return (
          (inclusivity[0] === '('
              ? this.isAfter(localFrom, units)
              : !this.isBefore(localFrom, units)) &&
          (inclusivity[1] === ')'
              ? this.isBefore(localTo, units)
              : !this.isAfter(localTo, units))
      );
  }

  function isSame(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input),
          inputMs;
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() === localInput.valueOf();
      } else {
          inputMs = localInput.valueOf();
          return (
              this.clone().startOf(units).valueOf() <= inputMs &&
              inputMs <= this.clone().endOf(units).valueOf()
          );
      }
  }

  function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
      var that, zoneDelta, output;

      if (!this.isValid()) {
          return NaN;
      }

      that = cloneWithOffset(input, this);

      if (!that.isValid()) {
          return NaN;
      }

      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

      units = normalizeUnits(units);

      switch (units) {
          case 'year':
              output = monthDiff(this, that) / 12;
              break;
          case 'month':
              output = monthDiff(this, that);
              break;
          case 'quarter':
              output = monthDiff(this, that) / 3;
              break;
          case 'second':
              output = (this - that) / 1e3;
              break; // 1000
          case 'minute':
              output = (this - that) / 6e4;
              break; // 1000 * 60
          case 'hour':
              output = (this - that) / 36e5;
              break; // 1000 * 60 * 60
          case 'day':
              output = (this - that - zoneDelta) / 864e5;
              break; // 1000 * 60 * 60 * 24, negate dst
          case 'week':
              output = (this - that - zoneDelta) / 6048e5;
              break; // 1000 * 60 * 60 * 24 * 7, negate dst
          default:
              output = this - that;
      }

      return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
      if (a.date() < b.date()) {
          // end-of-month calculations work correct when the start month has more
          // days than the end month.
          return -monthDiff(b, a);
      }
      // difference in months
      var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
          // b is in (anchor - 1 month, anchor + 1 month)
          anchor = a.clone().add(wholeMonthDiff, 'months'),
          anchor2,
          adjust;

      if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
          // linear across the month
          adjust = (b - anchor) / (anchor - anchor2);
      } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
          // linear across the month
          adjust = (b - anchor) / (anchor2 - anchor);
      }

      //check for negative zero, return zero if negative zero
      return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
      return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
      if (!this.isValid()) {
          return null;
      }
      var utc = keepOffset !== true,
          m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(
              m,
              utc
                  ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                  : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
          );
      }
      if (isFunction(Date.prototype.toISOString)) {
          // native implementation is ~50x faster, use it when we can
          if (utc) {
              return this.toDate().toISOString();
          } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                  .toISOString()
                  .replace('Z', formatMoment(m, 'Z'));
          }
      }
      return formatMoment(
          m,
          utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
      );
  }

  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */
  function inspect() {
      if (!this.isValid()) {
          return 'moment.invalid(/* ' + this._i + ' */)';
      }
      var func = 'moment',
          zone = '',
          prefix,
          year,
          datetime,
          suffix;
      if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
          zone = 'Z';
      }
      prefix = '[' + func + '("]';
      year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
      datetime = '-MM-DD[T]HH:mm:ss.SSS';
      suffix = zone + '[")]';

      return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
      if (!inputString) {
          inputString = this.isUtc()
              ? hooks.defaultFormatUtc
              : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
      if (
          this.isValid() &&
          ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
      ) {
          return createDuration({ to: this, from: time })
              .locale(this.locale())
              .humanize(!withoutSuffix);
      } else {
          return this.localeData().invalidDate();
      }
  }

  function fromNow(withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
      if (
          this.isValid() &&
          ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
      ) {
          return createDuration({ from: this, to: time })
              .locale(this.locale())
              .humanize(!withoutSuffix);
      } else {
          return this.localeData().invalidDate();
      }
  }

  function toNow(withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
  }

  // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.
  function locale(key) {
      var newLocaleData;

      if (key === undefined) {
          return this._locale._abbr;
      } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
              this._locale = newLocaleData;
          }
          return this;
      }
  }

  var lang = deprecate(
      'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
      function (key) {
          if (key === undefined) {
              return this.localeData();
          } else {
              return this.locale(key);
          }
      }
  );

  function localeData() {
      return this._locale;
  }

  var MS_PER_SECOND = 1000,
      MS_PER_MINUTE = 60 * MS_PER_SECOND,
      MS_PER_HOUR = 60 * MS_PER_MINUTE,
      MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

  // actual modulo - handles negative numbers (for dates before 1970):
  function mod$1(dividend, divisor) {
      return ((dividend % divisor) + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
          return new Date(y, m, d).valueOf();
      }
  }

  function utcStartOfDate(y, m, d) {
      // Date.UTC remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
          return Date.UTC(y, m, d);
      }
  }

  function startOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === undefined || units === 'millisecond' || !this.isValid()) {
          return this;
      }

      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

      switch (units) {
          case 'year':
              time = startOfDate(this.year(), 0, 1);
              break;
          case 'quarter':
              time = startOfDate(
                  this.year(),
                  this.month() - (this.month() % 3),
                  1
              );
              break;
          case 'month':
              time = startOfDate(this.year(), this.month(), 1);
              break;
          case 'week':
              time = startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - this.weekday()
              );
              break;
          case 'isoWeek':
              time = startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - (this.isoWeekday() - 1)
              );
              break;
          case 'day':
          case 'date':
              time = startOfDate(this.year(), this.month(), this.date());
              break;
          case 'hour':
              time = this._d.valueOf();
              time -= mod$1(
                  time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                  MS_PER_HOUR
              );
              break;
          case 'minute':
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
          case 'second':
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
      }

      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
  }

  function endOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === undefined || units === 'millisecond' || !this.isValid()) {
          return this;
      }

      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

      switch (units) {
          case 'year':
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
          case 'quarter':
              time =
                  startOfDate(
                      this.year(),
                      this.month() - (this.month() % 3) + 3,
                      1
                  ) - 1;
              break;
          case 'month':
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
          case 'week':
              time =
                  startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - this.weekday() + 7
                  ) - 1;
              break;
          case 'isoWeek':
              time =
                  startOfDate(
                      this.year(),
                      this.month(),
                      this.date() - (this.isoWeekday() - 1) + 7
                  ) - 1;
              break;
          case 'day':
          case 'date':
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
          case 'hour':
              time = this._d.valueOf();
              time +=
                  MS_PER_HOUR -
                  mod$1(
                      time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                      MS_PER_HOUR
                  ) -
                  1;
              break;
          case 'minute':
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
          case 'second':
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
      }

      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
  }

  function valueOf() {
      return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
      return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
      return new Date(this.valueOf());
  }

  function toArray() {
      var m = this;
      return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond(),
      ];
  }

  function toObject() {
      var m = this;
      return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds(),
      };
  }

  function toJSON() {
      // new Date(NaN).toJSON() === null
      return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
      return isValid(this);
  }

  function parsingFlags() {
      return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
      return getParsingFlags(this).overflow;
  }

  function creationData() {
      return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict,
      };
  }

  addFormatToken('N', 0, 0, 'eraAbbr');
  addFormatToken('NN', 0, 0, 'eraAbbr');
  addFormatToken('NNN', 0, 0, 'eraAbbr');
  addFormatToken('NNNN', 0, 0, 'eraName');
  addFormatToken('NNNNN', 0, 0, 'eraNarrow');

  addFormatToken('y', ['y', 1], 'yo', 'eraYear');
  addFormatToken('y', ['yy', 2], 0, 'eraYear');
  addFormatToken('y', ['yyy', 3], 0, 'eraYear');
  addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

  addRegexToken('N', matchEraAbbr);
  addRegexToken('NN', matchEraAbbr);
  addRegexToken('NNN', matchEraAbbr);
  addRegexToken('NNNN', matchEraName);
  addRegexToken('NNNNN', matchEraNarrow);

  addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
      input,
      array,
      config,
      token
  ) {
      var era = config._locale.erasParse(input, token, config._strict);
      if (era) {
          getParsingFlags(config).era = era;
      } else {
          getParsingFlags(config).invalidEra = input;
      }
  });

  addRegexToken('y', matchUnsigned);
  addRegexToken('yy', matchUnsigned);
  addRegexToken('yyy', matchUnsigned);
  addRegexToken('yyyy', matchUnsigned);
  addRegexToken('yo', matchEraYearOrdinal);

  addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
  addParseToken(['yo'], function (input, array, config, token) {
      var match;
      if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
      }

      if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
      } else {
          array[YEAR] = parseInt(input, 10);
      }
  });

  function localeEras(m, format) {
      var i,
          l,
          date,
          eras = this._eras || getLocale('en')._eras;
      for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
              case 'string':
                  // truncate time
                  date = hooks(eras[i].since).startOf('day');
                  eras[i].since = date.valueOf();
                  break;
          }

          switch (typeof eras[i].until) {
              case 'undefined':
                  eras[i].until = +Infinity;
                  break;
              case 'string':
                  // truncate time
                  date = hooks(eras[i].until).startOf('day').valueOf();
                  eras[i].until = date.valueOf();
                  break;
          }
      }
      return eras;
  }

  function localeErasParse(eraName, format, strict) {
      var i,
          l,
          eras = this.eras(),
          name,
          abbr,
          narrow;
      eraName = eraName.toUpperCase();

      for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();

          if (strict) {
              switch (format) {
                  case 'N':
                  case 'NN':
                  case 'NNN':
                      if (abbr === eraName) {
                          return eras[i];
                      }
                      break;

                  case 'NNNN':
                      if (name === eraName) {
                          return eras[i];
                      }
                      break;

                  case 'NNNNN':
                      if (narrow === eraName) {
                          return eras[i];
                      }
                      break;
              }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
          }
      }
  }

  function localeErasConvertYear(era, year) {
      var dir = era.since <= era.until ? +1 : -1;
      if (year === undefined) {
          return hooks(era.since).year();
      } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
      }
  }

  function getEraName() {
      var i,
          l,
          val,
          eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
          // truncate time
          val = this.clone().startOf('day').valueOf();

          if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].name;
          }
      }

      return '';
  }

  function getEraNarrow() {
      var i,
          l,
          val,
          eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
          // truncate time
          val = this.clone().startOf('day').valueOf();

          if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].narrow;
          }
      }

      return '';
  }

  function getEraAbbr() {
      var i,
          l,
          val,
          eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
          // truncate time
          val = this.clone().startOf('day').valueOf();

          if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].abbr;
          }
      }

      return '';
  }

  function getEraYear() {
      var i,
          l,
          dir,
          val,
          eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? +1 : -1;

          // truncate time
          val = this.clone().startOf('day').valueOf();

          if (
              (eras[i].since <= val && val <= eras[i].until) ||
              (eras[i].until <= val && val <= eras[i].since)
          ) {
              return (
                  (this.year() - hooks(eras[i].since).year()) * dir +
                  eras[i].offset
              );
          }
      }

      return this.year();
  }

  function erasNameRegex(isStrict) {
      if (!hasOwnProp(this, '_erasNameRegex')) {
          computeErasParse.call(this);
      }
      return isStrict ? this._erasNameRegex : this._erasRegex;
  }

  function erasAbbrRegex(isStrict) {
      if (!hasOwnProp(this, '_erasAbbrRegex')) {
          computeErasParse.call(this);
      }
      return isStrict ? this._erasAbbrRegex : this._erasRegex;
  }

  function erasNarrowRegex(isStrict) {
      if (!hasOwnProp(this, '_erasNarrowRegex')) {
          computeErasParse.call(this);
      }
      return isStrict ? this._erasNarrowRegex : this._erasRegex;
  }

  function matchEraAbbr(isStrict, locale) {
      return locale.erasAbbrRegex(isStrict);
  }

  function matchEraName(isStrict, locale) {
      return locale.erasNameRegex(isStrict);
  }

  function matchEraNarrow(isStrict, locale) {
      return locale.erasNarrowRegex(isStrict);
  }

  function matchEraYearOrdinal(isStrict, locale) {
      return locale._eraYearOrdinalRegex || matchUnsigned;
  }

  function computeErasParse() {
      var abbrPieces = [],
          namePieces = [],
          narrowPieces = [],
          mixedPieces = [],
          i,
          l,
          eras = this.eras();

      for (i = 0, l = eras.length; i < l; ++i) {
          namePieces.push(regexEscape(eras[i].name));
          abbrPieces.push(regexEscape(eras[i].abbr));
          narrowPieces.push(regexEscape(eras[i].narrow));

          mixedPieces.push(regexEscape(eras[i].name));
          mixedPieces.push(regexEscape(eras[i].abbr));
          mixedPieces.push(regexEscape(eras[i].narrow));
      }

      this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
      this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
      this._erasNarrowRegex = new RegExp(
          '^(' + narrowPieces.join('|') + ')',
          'i'
      );
  }

  // FORMATTING

  addFormatToken(0, ['gg', 2], 0, function () {
      return this.weekYear() % 100;
  });

  addFormatToken(0, ['GG', 2], 0, function () {
      return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
      addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear');

  // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG');

  // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1);

  // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);

  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
      input,
      week,
      config,
      token
  ) {
      week[token.substr(0, 2)] = toInt(input);
  });

  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
      week[token] = hooks.parseTwoDigitYear(input);
  });

  // MOMENTS

  function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(
          this,
          input,
          this.week(),
          this.weekday(),
          this.localeData()._week.dow,
          this.localeData()._week.doy
      );
  }

  function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(
          this,
          input,
          this.isoWeek(),
          this.isoWeekday(),
          1,
          4
      );
  }

  function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
  }

  function getISOWeeksInISOWeekYear() {
      return weeksInYear(this.isoWeekYear(), 1, 4);
  }

  function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getWeeksInWeekYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
          return weekOfYear(this, dow, doy).year;
      } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
              week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
          date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
  }

  // FORMATTING

  addFormatToken('Q', 0, 'Qo', 'quarter');

  // ALIASES

  addUnitAlias('quarter', 'Q');

  // PRIORITY

  addUnitPriority('quarter', 7);

  // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
  });

  // MOMENTS

  function getSetQuarter(input) {
      return input == null
          ? Math.ceil((this.month() + 1) / 3)
          : this.month((input - 1) * 3 + (this.month() % 3));
  }

  // FORMATTING

  addFormatToken('D', ['DD', 2], 'Do', 'date');

  // ALIASES

  addUnitAlias('date', 'D');

  // PRIORITY
  addUnitPriority('date', 9);

  // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
      // TODO: Remove "ordinalParse" fallback in next major release.
      return isStrict
          ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
          : locale._dayOfMonthOrdinalParseLenient;
  });

  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
      array[DATE] = toInt(input.match(match1to2)[0]);
  });

  // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true);

  // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

  // ALIASES

  addUnitAlias('dayOfYear', 'DDD');

  // PRIORITY
  addUnitPriority('dayOfYear', 4);

  // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
      config._dayOfYear = toInt(input);
  });

  // HELPERS

  // MOMENTS

  function getSetDayOfYear(input) {
      var dayOfYear =
          Math.round(
              (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
          ) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  }

  // FORMATTING

  addFormatToken('m', ['mm', 2], 0, 'minute');

  // ALIASES

  addUnitAlias('minute', 'm');

  // PRIORITY

  addUnitPriority('minute', 14);

  // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE);

  // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false);

  // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second');

  // ALIASES

  addUnitAlias('second', 's');

  // PRIORITY

  addUnitPriority('second', 15);

  // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND);

  // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false);

  // FORMATTING

  addFormatToken('S', 0, 0, function () {
      return ~~(this.millisecond() / 100);
  });

  addFormatToken(0, ['SS', 2], 0, function () {
      return ~~(this.millisecond() / 10);
  });

  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
      return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
      return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
      return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
      return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
      return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
      return this.millisecond() * 1000000;
  });

  // ALIASES

  addUnitAlias('millisecond', 'ms');

  // PRIORITY

  addUnitPriority('millisecond', 16);

  // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);

  var token, getSetMillisecond;
  for (token = 'SSSS'; token.length <= 9; token += 'S') {
      addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
      array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
      addParseToken(token, parseMs);
  }

  getSetMillisecond = makeGetSet('Milliseconds', false);

  // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName');

  // MOMENTS

  function getZoneAbbr() {
      return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
      return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;

  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  if (typeof Symbol !== 'undefined' && Symbol.for != null) {
      proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
          return 'Moment<' + this.format() + '>';
      };
  }
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.eraName = getEraName;
  proto.eraNarrow = getEraNarrow;
  proto.eraAbbr = getEraAbbr;
  proto.eraYear = getEraYear;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.weeksInWeekYear = getWeeksInWeekYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate(
      'dates accessor is deprecated. Use date instead.',
      getSetDayOfMonth
  );
  proto.months = deprecate(
      'months accessor is deprecated. Use month instead',
      getSetMonth
  );
  proto.years = deprecate(
      'years accessor is deprecated. Use year instead',
      getSetYear
  );
  proto.zone = deprecate(
      'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
      getSetZone
  );
  proto.isDSTShifted = deprecate(
      'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
      isDaylightSavingTimeShifted
  );

  function createUnix(input) {
      return createLocal(input * 1000);
  }

  function createInZone() {
      return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
      return string;
  }

  var proto$1 = Locale.prototype;

  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;

  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;

  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;

  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;

  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
      var locale = getLocale(),
          utc = createUTC().set(setter, index);
      return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
      if (isNumber(format)) {
          index = format;
          format = undefined;
      }

      format = format || '';

      if (index != null) {
          return get$1(format, index, field, 'month');
      }

      var i,
          out = [];
      for (i = 0; i < 12; i++) {
          out[i] = get$1(format, i, field, 'month');
      }
      return out;
  }

  // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)
  function listWeekdaysImpl(localeSorted, format, index, field) {
      if (typeof localeSorted === 'boolean') {
          if (isNumber(format)) {
              index = format;
              format = undefined;
          }

          format = format || '';
      } else {
          format = localeSorted;
          index = format;
          localeSorted = false;

          if (isNumber(format)) {
              index = format;
              format = undefined;
          }

          format = format || '';
      }

      var locale = getLocale(),
          shift = localeSorted ? locale._week.dow : 0,
          i,
          out = [];

      if (index != null) {
          return get$1(format, (index + shift) % 7, field, 'day');
      }

      for (i = 0; i < 7; i++) {
          out[i] = get$1(format, (i + shift) % 7, field, 'day');
      }
      return out;
  }

  function listMonths(format, index) {
      return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
      return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
      eras: [
          {
              since: '0001-01-01',
              until: +Infinity,
              offset: 1,
              name: 'Anno Domini',
              narrow: 'AD',
              abbr: 'AD',
          },
          {
              since: '0000-12-31',
              until: -Infinity,
              offset: 1,
              name: 'Before Christ',
              narrow: 'BC',
              abbr: 'BC',
          },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (number) {
          var b = number % 10,
              output =
                  toInt((number % 100) / 10) === 1
                      ? 'th'
                      : b === 1
                      ? 'st'
                      : b === 2
                      ? 'nd'
                      : b === 3
                      ? 'rd'
                      : 'th';
          return number + output;
      },
  });

  // Side effect imports

  hooks.lang = deprecate(
      'moment.lang is deprecated. Use moment.locale instead.',
      getSetGlobalLocale
  );
  hooks.langData = deprecate(
      'moment.langData is deprecated. Use moment.localeData instead.',
      getLocale
  );

  var mathAbs = Math.abs;

  function abs() {
      var data = this._data;

      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);

      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);

      return this;
  }

  function addSubtract$1(duration, input, value, direction) {
      var other = createDuration(input, value);

      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;

      return duration._bubble();
  }

  // supports only 2.0-style add(1, 's') or add(duration)
  function add$1(input, value) {
      return addSubtract$1(this, input, value, 1);
  }

  // supports only 2.0-style subtract(1, 's') or subtract(duration)
  function subtract$1(input, value) {
      return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
      if (number < 0) {
          return Math.floor(number);
      } else {
          return Math.ceil(number);
      }
  }

  function bubble() {
      var milliseconds = this._milliseconds,
          days = this._days,
          months = this._months,
          data = this._data,
          seconds,
          minutes,
          hours,
          years,
          monthsFromDays;

      // if we have a mix of positive and negative values, bubble down first
      // check: https://github.com/moment/moment/issues/2166
      if (
          !(
              (milliseconds >= 0 && days >= 0 && months >= 0) ||
              (milliseconds <= 0 && days <= 0 && months <= 0)
          )
      ) {
          milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
          days = 0;
          months = 0;
      }

      // The following code bubbles up values, see the tests for
      // examples of what that means.
      data.milliseconds = milliseconds % 1000;

      seconds = absFloor(milliseconds / 1000);
      data.seconds = seconds % 60;

      minutes = absFloor(seconds / 60);
      data.minutes = minutes % 60;

      hours = absFloor(minutes / 60);
      data.hours = hours % 24;

      days += absFloor(hours / 24);

      // convert days to months
      monthsFromDays = absFloor(daysToMonths(days));
      months += monthsFromDays;
      days -= absCeil(monthsToDays(monthsFromDays));

      // 12 months -> 1 year
      years = absFloor(months / 12);
      months %= 12;

      data.days = days;
      data.months = months;
      data.years = years;

      return this;
  }

  function daysToMonths(days) {
      // 400 years have 146097 days (taking into account leap year rules)
      // 400 years have 12 months === 4800
      return (days * 4800) / 146097;
  }

  function monthsToDays(months) {
      // the reverse of daysToMonths
      return (months * 146097) / 4800;
  }

  function as(units) {
      if (!this.isValid()) {
          return NaN;
      }
      var days,
          months,
          milliseconds = this._milliseconds;

      units = normalizeUnits(units);

      if (units === 'month' || units === 'quarter' || units === 'year') {
          days = this._days + milliseconds / 864e5;
          months = this._months + daysToMonths(days);
          switch (units) {
              case 'month':
                  return months;
              case 'quarter':
                  return months / 3;
              case 'year':
                  return months / 12;
          }
      } else {
          // handle milliseconds separately because of floating point math errors (issue #1867)
          days = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
              case 'week':
                  return days / 7 + milliseconds / 6048e5;
              case 'day':
                  return days + milliseconds / 864e5;
              case 'hour':
                  return days * 24 + milliseconds / 36e5;
              case 'minute':
                  return days * 1440 + milliseconds / 6e4;
              case 'second':
                  return days * 86400 + milliseconds / 1000;
              // Math.floor prevents floating point math errors here
              case 'millisecond':
                  return Math.floor(days * 864e5) + milliseconds;
              default:
                  throw new Error('Unknown unit ' + units);
          }
      }
  }

  // TODO: Use this.as('ms')?
  function valueOf$1() {
      if (!this.isValid()) {
          return NaN;
      }
      return (
          this._milliseconds +
          this._days * 864e5 +
          (this._months % 12) * 2592e6 +
          toInt(this._months / 12) * 31536e6
      );
  }

  function makeAs(alias) {
      return function () {
          return this.as(alias);
      };
  }

  var asMilliseconds = makeAs('ms'),
      asSeconds = makeAs('s'),
      asMinutes = makeAs('m'),
      asHours = makeAs('h'),
      asDays = makeAs('d'),
      asWeeks = makeAs('w'),
      asMonths = makeAs('M'),
      asQuarters = makeAs('Q'),
      asYears = makeAs('y');

  function clone$1() {
      return createDuration(this);
  }

  function get$2(units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
      return function () {
          return this.isValid() ? this._data[name] : NaN;
      };
  }

  var milliseconds = makeGetter('milliseconds'),
      seconds = makeGetter('seconds'),
      minutes = makeGetter('minutes'),
      hours = makeGetter('hours'),
      days = makeGetter('days'),
      months = makeGetter('months'),
      years = makeGetter('years');

  function weeks() {
      return absFloor(this.days() / 7);
  }

  var round = Math.round,
      thresholds = {
          ss: 44, // a few seconds to seconds
          s: 45, // seconds to minute
          m: 45, // minutes to hour
          h: 22, // hours to day
          d: 26, // days to month/week
          w: null, // weeks to month
          M: 11, // months to year
      };

  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
      return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
      var duration = createDuration(posNegDuration).abs(),
          seconds = round(duration.as('s')),
          minutes = round(duration.as('m')),
          hours = round(duration.as('h')),
          days = round(duration.as('d')),
          months = round(duration.as('M')),
          weeks = round(duration.as('w')),
          years = round(duration.as('y')),
          a =
              (seconds <= thresholds.ss && ['s', seconds]) ||
              (seconds < thresholds.s && ['ss', seconds]) ||
              (minutes <= 1 && ['m']) ||
              (minutes < thresholds.m && ['mm', minutes]) ||
              (hours <= 1 && ['h']) ||
              (hours < thresholds.h && ['hh', hours]) ||
              (days <= 1 && ['d']) ||
              (days < thresholds.d && ['dd', days]);

      if (thresholds.w != null) {
          a =
              a ||
              (weeks <= 1 && ['w']) ||
              (weeks < thresholds.w && ['ww', weeks]);
      }
      a = a ||
          (months <= 1 && ['M']) ||
          (months < thresholds.M && ['MM', months]) ||
          (years <= 1 && ['y']) || ['yy', years];

      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale;
      return substituteTimeAgo.apply(null, a);
  }

  // This function allows you to set the rounding function for relative time strings
  function getSetRelativeTimeRounding(roundingFunction) {
      if (roundingFunction === undefined) {
          return round;
      }
      if (typeof roundingFunction === 'function') {
          round = roundingFunction;
          return true;
      }
      return false;
  }

  // This function allows you to set a threshold for relative time strings
  function getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === undefined) {
          return false;
      }
      if (limit === undefined) {
          return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === 's') {
          thresholds.ss = limit - 1;
      }
      return true;
  }

  function humanize(argWithSuffix, argThresholds) {
      if (!this.isValid()) {
          return this.localeData().invalidDate();
      }

      var withSuffix = false,
          th = thresholds,
          locale,
          output;

      if (typeof argWithSuffix === 'object') {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
      }
      if (typeof argWithSuffix === 'boolean') {
          withSuffix = argWithSuffix;
      }
      if (typeof argThresholds === 'object') {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
          }
      }

      locale = this.localeData();
      output = relativeTime$1(this, !withSuffix, th, locale);

      if (withSuffix) {
          output = locale.pastFuture(+this, output);
      }

      return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
      return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
      // for ISO strings we do not use the normal bubbling rules:
      //  * milliseconds bubble up until they become hours
      //  * days do not bubble at all
      //  * months bubble up until they become years
      // This is because there is no context-free conversion between hours and days
      // (think of clock changes)
      // and also not between days and months (28-31 days per month)
      if (!this.isValid()) {
          return this.localeData().invalidDate();
      }

      var seconds = abs$1(this._milliseconds) / 1000,
          days = abs$1(this._days),
          months = abs$1(this._months),
          minutes,
          hours,
          years,
          s,
          total = this.asSeconds(),
          totalSign,
          ymSign,
          daysSign,
          hmsSign;

      if (!total) {
          // this is the same as C#'s (Noda) and python (isodate)...
          // but not other JS (goog.date)
          return 'P0D';
      }

      // 3600 seconds -> 60 minutes -> 1 hour
      minutes = absFloor(seconds / 60);
      hours = absFloor(minutes / 60);
      seconds %= 60;
      minutes %= 60;

      // 12 months -> 1 year
      years = absFloor(months / 12);
      months %= 12;

      // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
      s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

      totalSign = total < 0 ? '-' : '';
      ymSign = sign(this._months) !== sign(total) ? '-' : '';
      daysSign = sign(this._days) !== sign(total) ? '-' : '';
      hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

      return (
          totalSign +
          'P' +
          (years ? ymSign + years + 'Y' : '') +
          (months ? ymSign + months + 'M' : '') +
          (days ? daysSign + days + 'D' : '') +
          (hours || minutes || seconds ? 'T' : '') +
          (hours ? hmsSign + hours + 'H' : '') +
          (minutes ? hmsSign + minutes + 'M' : '') +
          (seconds ? hmsSign + s + 'S' : '')
      );
  }

  var proto$2 = Duration.prototype;

  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;

  proto$2.toIsoString = deprecate(
      'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
      toISOString$1
  );
  proto$2.lang = lang;

  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf');

  // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
      config._d = new Date(parseFloat(input) * 1000);
  });
  addParseToken('x', function (input, array, config) {
      config._d = new Date(toInt(input));
  });

  //! moment.js

  hooks.version = '2.29.1';

  setHookCallback(createLocal);

  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto;

  // currently HTML5 input type only supports 24-hour formats
  hooks.HTML5_FMT = {
      DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
      DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
      DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
      DATE: 'YYYY-MM-DD', // <input type="date" />
      TIME: 'HH:mm', // <input type="time" />
      TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
      TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
      WEEK: 'GGGG-[W]WW', // <input type="week" />
      MONTH: 'YYYY-MM', // <input type="month" />
  };

  var moment = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': hooks
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(moment);

  var momentTimezone = createCommonjsModule(function (module) {
  //! moment-timezone.js
  //! version : 0.5.34
  //! Copyright (c) JS Foundation and other contributors
  //! license : MIT
  //! github.com/moment/moment-timezone

  (function (root, factory) {

  	/*global define*/
  	if ( module.exports) {
  		module.exports = factory(require$$0); // Node
  	} else {
  		factory(root.moment);                        // Browser
  	}
  }(commonjsGlobal, function (moment) {

  	// Resolves es6 module loading issue
  	if (moment.version === undefined && moment.default) {
  		moment = moment.default;
  	}

  	// Do not load moment-timezone a second time.
  	// if (moment.tz !== undefined) {
  	// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
  	// 	return moment;
  	// }

  	var VERSION = "0.5.34",
  		zones = {},
  		links = {},
  		countries = {},
  		names = {},
  		guesses = {},
  		cachedGuess;

  	if (!moment || typeof moment.version !== 'string') {
  		logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
  	}

  	var momentVersion = moment.version.split('.'),
  		major = +momentVersion[0],
  		minor = +momentVersion[1];

  	// Moment.js version check
  	if (major < 2 || (major === 2 && minor < 6)) {
  		logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
  	}

  	/************************************
  		Unpacking
  	************************************/

  	function charCodeToInt(charCode) {
  		if (charCode > 96) {
  			return charCode - 87;
  		} else if (charCode > 64) {
  			return charCode - 29;
  		}
  		return charCode - 48;
  	}

  	function unpackBase60(string) {
  		var i = 0,
  			parts = string.split('.'),
  			whole = parts[0],
  			fractional = parts[1] || '',
  			multiplier = 1,
  			num,
  			out = 0,
  			sign = 1;

  		// handle negative numbers
  		if (string.charCodeAt(0) === 45) {
  			i = 1;
  			sign = -1;
  		}

  		// handle digits before the decimal
  		for (i; i < whole.length; i++) {
  			num = charCodeToInt(whole.charCodeAt(i));
  			out = 60 * out + num;
  		}

  		// handle digits after the decimal
  		for (i = 0; i < fractional.length; i++) {
  			multiplier = multiplier / 60;
  			num = charCodeToInt(fractional.charCodeAt(i));
  			out += num * multiplier;
  		}

  		return out * sign;
  	}

  	function arrayToInt (array) {
  		for (var i = 0; i < array.length; i++) {
  			array[i] = unpackBase60(array[i]);
  		}
  	}

  	function intToUntil (array, length) {
  		for (var i = 0; i < length; i++) {
  			array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
  		}

  		array[length - 1] = Infinity;
  	}

  	function mapIndices (source, indices) {
  		var out = [], i;

  		for (i = 0; i < indices.length; i++) {
  			out[i] = source[indices[i]];
  		}

  		return out;
  	}

  	function unpack (string) {
  		var data = string.split('|'),
  			offsets = data[2].split(' '),
  			indices = data[3].split(''),
  			untils  = data[4].split(' ');

  		arrayToInt(offsets);
  		arrayToInt(indices);
  		arrayToInt(untils);

  		intToUntil(untils, indices.length);

  		return {
  			name       : data[0],
  			abbrs      : mapIndices(data[1].split(' '), indices),
  			offsets    : mapIndices(offsets, indices),
  			untils     : untils,
  			population : data[5] | 0
  		};
  	}

  	/************************************
  		Zone object
  	************************************/

  	function Zone (packedString) {
  		if (packedString) {
  			this._set(unpack(packedString));
  		}
  	}

  	Zone.prototype = {
  		_set : function (unpacked) {
  			this.name       = unpacked.name;
  			this.abbrs      = unpacked.abbrs;
  			this.untils     = unpacked.untils;
  			this.offsets    = unpacked.offsets;
  			this.population = unpacked.population;
  		},

  		_index : function (timestamp) {
  			var target = +timestamp,
  				untils = this.untils,
  				i;

  			for (i = 0; i < untils.length; i++) {
  				if (target < untils[i]) {
  					return i;
  				}
  			}
  		},

  		countries : function () {
  			var zone_name = this.name;
  			return Object.keys(countries).filter(function (country_code) {
  				return countries[country_code].zones.indexOf(zone_name) !== -1;
  			});
  		},

  		parse : function (timestamp) {
  			var target  = +timestamp,
  				offsets = this.offsets,
  				untils  = this.untils,
  				max     = untils.length - 1,
  				offset, offsetNext, offsetPrev, i;

  			for (i = 0; i < max; i++) {
  				offset     = offsets[i];
  				offsetNext = offsets[i + 1];
  				offsetPrev = offsets[i ? i - 1 : i];

  				if (offset < offsetNext && tz.moveAmbiguousForward) {
  					offset = offsetNext;
  				} else if (offset > offsetPrev && tz.moveInvalidForward) {
  					offset = offsetPrev;
  				}

  				if (target < untils[i] - (offset * 60000)) {
  					return offsets[i];
  				}
  			}

  			return offsets[max];
  		},

  		abbr : function (mom) {
  			return this.abbrs[this._index(mom)];
  		},

  		offset : function (mom) {
  			logError("zone.offset has been deprecated in favor of zone.utcOffset");
  			return this.offsets[this._index(mom)];
  		},

  		utcOffset : function (mom) {
  			return this.offsets[this._index(mom)];
  		}
  	};

  	/************************************
  		Country object
  	************************************/

  	function Country (country_name, zone_names) {
  		this.name = country_name;
  		this.zones = zone_names;
  	}

  	/************************************
  		Current Timezone
  	************************************/

  	function OffsetAt(at) {
  		var timeString = at.toTimeString();
  		var abbr = timeString.match(/\([a-z ]+\)/i);
  		if (abbr && abbr[0]) {
  			// 17:56:31 GMT-0600 (CST)
  			// 17:56:31 GMT-0600 (Central Standard Time)
  			abbr = abbr[0].match(/[A-Z]/g);
  			abbr = abbr ? abbr.join('') : undefined;
  		} else {
  			// 17:56:31 CST
  			// 17:56:31 GMT+0800 (台北標準時間)
  			abbr = timeString.match(/[A-Z]{3,5}/g);
  			abbr = abbr ? abbr[0] : undefined;
  		}

  		if (abbr === 'GMT') {
  			abbr = undefined;
  		}

  		this.at = +at;
  		this.abbr = abbr;
  		this.offset = at.getTimezoneOffset();
  	}

  	function ZoneScore(zone) {
  		this.zone = zone;
  		this.offsetScore = 0;
  		this.abbrScore = 0;
  	}

  	ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
  		this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
  		if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
  			this.abbrScore++;
  		}
  	};

  	function findChange(low, high) {
  		var mid, diff;

  		while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
  			mid = new OffsetAt(new Date(low.at + diff));
  			if (mid.offset === low.offset) {
  				low = mid;
  			} else {
  				high = mid;
  			}
  		}

  		return low;
  	}

  	function userOffsets() {
  		var startYear = new Date().getFullYear() - 2,
  			last = new OffsetAt(new Date(startYear, 0, 1)),
  			offsets = [last],
  			change, next, i;

  		for (i = 1; i < 48; i++) {
  			next = new OffsetAt(new Date(startYear, i, 1));
  			if (next.offset !== last.offset) {
  				change = findChange(last, next);
  				offsets.push(change);
  				offsets.push(new OffsetAt(new Date(change.at + 6e4)));
  			}
  			last = next;
  		}

  		for (i = 0; i < 4; i++) {
  			offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
  			offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
  		}

  		return offsets;
  	}

  	function sortZoneScores (a, b) {
  		if (a.offsetScore !== b.offsetScore) {
  			return a.offsetScore - b.offsetScore;
  		}
  		if (a.abbrScore !== b.abbrScore) {
  			return a.abbrScore - b.abbrScore;
  		}
  		if (a.zone.population !== b.zone.population) {
  			return b.zone.population - a.zone.population;
  		}
  		return b.zone.name.localeCompare(a.zone.name);
  	}

  	function addToGuesses (name, offsets) {
  		var i, offset;
  		arrayToInt(offsets);
  		for (i = 0; i < offsets.length; i++) {
  			offset = offsets[i];
  			guesses[offset] = guesses[offset] || {};
  			guesses[offset][name] = true;
  		}
  	}

  	function guessesForUserOffsets (offsets) {
  		var offsetsLength = offsets.length,
  			filteredGuesses = {},
  			out = [],
  			i, j, guessesOffset;

  		for (i = 0; i < offsetsLength; i++) {
  			guessesOffset = guesses[offsets[i].offset] || {};
  			for (j in guessesOffset) {
  				if (guessesOffset.hasOwnProperty(j)) {
  					filteredGuesses[j] = true;
  				}
  			}
  		}

  		for (i in filteredGuesses) {
  			if (filteredGuesses.hasOwnProperty(i)) {
  				out.push(names[i]);
  			}
  		}

  		return out;
  	}

  	function rebuildGuess () {

  		// use Intl API when available and returning valid time zone
  		try {
  			var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  			if (intlName && intlName.length > 3) {
  				var name = names[normalizeName(intlName)];
  				if (name) {
  					return name;
  				}
  				logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
  			}
  		} catch (e) {
  			// Intl unavailable, fall back to manual guessing.
  		}

  		var offsets = userOffsets(),
  			offsetsLength = offsets.length,
  			guesses = guessesForUserOffsets(offsets),
  			zoneScores = [],
  			zoneScore, i, j;

  		for (i = 0; i < guesses.length; i++) {
  			zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
  			for (j = 0; j < offsetsLength; j++) {
  				zoneScore.scoreOffsetAt(offsets[j]);
  			}
  			zoneScores.push(zoneScore);
  		}

  		zoneScores.sort(sortZoneScores);

  		return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
  	}

  	function guess (ignoreCache) {
  		if (!cachedGuess || ignoreCache) {
  			cachedGuess = rebuildGuess();
  		}
  		return cachedGuess;
  	}

  	/************************************
  		Global Methods
  	************************************/

  	function normalizeName (name) {
  		return (name || '').toLowerCase().replace(/\//g, '_');
  	}

  	function addZone (packed) {
  		var i, name, split, normalized;

  		if (typeof packed === "string") {
  			packed = [packed];
  		}

  		for (i = 0; i < packed.length; i++) {
  			split = packed[i].split('|');
  			name = split[0];
  			normalized = normalizeName(name);
  			zones[normalized] = packed[i];
  			names[normalized] = name;
  			addToGuesses(normalized, split[2].split(' '));
  		}
  	}

  	function getZone (name, caller) {

  		name = normalizeName(name);

  		var zone = zones[name];
  		var link;

  		if (zone instanceof Zone) {
  			return zone;
  		}

  		if (typeof zone === 'string') {
  			zone = new Zone(zone);
  			zones[name] = zone;
  			return zone;
  		}

  		// Pass getZone to prevent recursion more than 1 level deep
  		if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
  			zone = zones[name] = new Zone();
  			zone._set(link);
  			zone.name = names[name];
  			return zone;
  		}

  		return null;
  	}

  	function getNames () {
  		var i, out = [];

  		for (i in names) {
  			if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
  				out.push(names[i]);
  			}
  		}

  		return out.sort();
  	}

  	function getCountryNames () {
  		return Object.keys(countries);
  	}

  	function addLink (aliases) {
  		var i, alias, normal0, normal1;

  		if (typeof aliases === "string") {
  			aliases = [aliases];
  		}

  		for (i = 0; i < aliases.length; i++) {
  			alias = aliases[i].split('|');

  			normal0 = normalizeName(alias[0]);
  			normal1 = normalizeName(alias[1]);

  			links[normal0] = normal1;
  			names[normal0] = alias[0];

  			links[normal1] = normal0;
  			names[normal1] = alias[1];
  		}
  	}

  	function addCountries (data) {
  		var i, country_code, country_zones, split;
  		if (!data || !data.length) return;
  		for (i = 0; i < data.length; i++) {
  			split = data[i].split('|');
  			country_code = split[0].toUpperCase();
  			country_zones = split[1].split(' ');
  			countries[country_code] = new Country(
  				country_code,
  				country_zones
  			);
  		}
  	}

  	function getCountry (name) {
  		name = name.toUpperCase();
  		return countries[name] || null;
  	}

  	function zonesForCountry(country, with_offset) {
  		country = getCountry(country);

  		if (!country) return null;

  		var zones = country.zones.sort();

  		if (with_offset) {
  			return zones.map(function (zone_name) {
  				var zone = getZone(zone_name);
  				return {
  					name: zone_name,
  					offset: zone.utcOffset(new Date())
  				};
  			});
  		}

  		return zones;
  	}

  	function loadData (data) {
  		addZone(data.zones);
  		addLink(data.links);
  		addCountries(data.countries);
  		tz.dataVersion = data.version;
  	}

  	function zoneExists (name) {
  		if (!zoneExists.didShowError) {
  			zoneExists.didShowError = true;
  				logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
  		}
  		return !!getZone(name);
  	}

  	function needsOffset (m) {
  		var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
  		return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
  	}

  	function logError (message) {
  		if (typeof console !== 'undefined' && typeof console.error === 'function') {
  			console.error(message);
  		}
  	}

  	/************************************
  		moment.tz namespace
  	************************************/

  	function tz (input) {
  		var args = Array.prototype.slice.call(arguments, 0, -1),
  			name = arguments[arguments.length - 1],
  			zone = getZone(name),
  			out  = moment.utc.apply(null, args);

  		if (zone && !moment.isMoment(input) && needsOffset(out)) {
  			out.add(zone.parse(out), 'minutes');
  		}

  		out.tz(name);

  		return out;
  	}

  	tz.version      = VERSION;
  	tz.dataVersion  = '';
  	tz._zones       = zones;
  	tz._links       = links;
  	tz._names       = names;
  	tz._countries	= countries;
  	tz.add          = addZone;
  	tz.link         = addLink;
  	tz.load         = loadData;
  	tz.zone         = getZone;
  	tz.zoneExists   = zoneExists; // deprecated in 0.1.0
  	tz.guess        = guess;
  	tz.names        = getNames;
  	tz.Zone         = Zone;
  	tz.unpack       = unpack;
  	tz.unpackBase60 = unpackBase60;
  	tz.needsOffset  = needsOffset;
  	tz.moveInvalidForward   = true;
  	tz.moveAmbiguousForward = false;
  	tz.countries    = getCountryNames;
  	tz.zonesForCountry = zonesForCountry;

  	/************************************
  		Interface with Moment.js
  	************************************/

  	var fn = moment.fn;

  	moment.tz = tz;

  	moment.defaultZone = null;

  	moment.updateOffset = function (mom, keepTime) {
  		var zone = moment.defaultZone,
  			offset;

  		if (mom._z === undefined) {
  			if (zone && needsOffset(mom) && !mom._isUTC) {
  				mom._d = moment.utc(mom._a)._d;
  				mom.utc().add(zone.parse(mom), 'minutes');
  			}
  			mom._z = zone;
  		}
  		if (mom._z) {
  			offset = mom._z.utcOffset(mom);
  			if (Math.abs(offset) < 16) {
  				offset = offset / 60;
  			}
  			if (mom.utcOffset !== undefined) {
  				var z = mom._z;
  				mom.utcOffset(-offset, keepTime);
  				mom._z = z;
  			} else {
  				mom.zone(offset, keepTime);
  			}
  		}
  	};

  	fn.tz = function (name, keepTime) {
  		if (name) {
  			if (typeof name !== 'string') {
  				throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
  			}
  			this._z = getZone(name);
  			if (this._z) {
  				moment.updateOffset(this, keepTime);
  			} else {
  				logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
  			}
  			return this;
  		}
  		if (this._z) { return this._z.name; }
  	};

  	function abbrWrap (old) {
  		return function () {
  			if (this._z) { return this._z.abbr(this); }
  			return old.call(this);
  		};
  	}

  	function resetZoneWrap (old) {
  		return function () {
  			this._z = null;
  			return old.apply(this, arguments);
  		};
  	}

  	function resetZoneWrap2 (old) {
  		return function () {
  			if (arguments.length > 0) this._z = null;
  			return old.apply(this, arguments);
  		};
  	}

  	fn.zoneName  = abbrWrap(fn.zoneName);
  	fn.zoneAbbr  = abbrWrap(fn.zoneAbbr);
  	fn.utc       = resetZoneWrap(fn.utc);
  	fn.local     = resetZoneWrap(fn.local);
  	fn.utcOffset = resetZoneWrap2(fn.utcOffset);

  	moment.tz.setDefault = function(name) {
  		if (major < 2 || (major === 2 && minor < 9)) {
  			logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
  		}
  		moment.defaultZone = name ? getZone(name) : null;
  		return moment;
  	};

  	// Cloning a moment should include the _z property.
  	var momentProperties = moment.momentProperties;
  	if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
  		// moment 2.8.1+
  		momentProperties.push('_z');
  		momentProperties.push('_a');
  	} else if (momentProperties) {
  		// moment 2.7.0
  		momentProperties._z = null;
  	}

  	// INJECT DATA

  	return moment;
  }));
  });

  var version = "2021e";
  var zones = [
  	"Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5",
  	"Africa/Nairobi|LMT +0230 EAT +0245|-2r.g -2u -30 -2J|012132|-2ua2r.g N6nV.g 3Fbu h1cu dzbJ|47e5",
  	"Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5",
  	"Africa/Lagos|LMT GMT +0030 WAT|-d.z 0 -u -10|01023|-2B40d.z 7iod.z dnXK.p dLzH.z|17e6",
  	"Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4",
  	"Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5",
  	"Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6",
  	"Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|32e5",
  	"Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3",
  	"Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|20e4",
  	"Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5",
  	"Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|012121212121212121212121212121212131|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 PeX0|",
  	"Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5",
  	"Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5",
  	"Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5",
  	"Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00|",
  	"Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5",
  	"Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5",
  	"Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4",
  	"America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326",
  	"America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4",
  	"America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5",
  	"America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4",
  	"America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
  	"America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
  	"America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0|",
  	"America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0|",
  	"America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
  	"America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0|",
  	"America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0|",
  	"America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0|",
  	"America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0|",
  	"America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0|",
  	"America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5",
  	"America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5",
  	"America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3",
  	"America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5",
  	"America/Barbados|LMT AST ADT -0330|3W.t 40 30 3u|0121213121212121|-2m4k1.v 1eAN1.v RB0 1Bz0 Op0 1rb0 11d0 1jJc0 IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4",
  	"America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5",
  	"America/Belize|LMT CST -0530 CWT CPT CDT|5Q.M 60 5u 50 50 50|012121212121212121212121212121212121212121212121213412121212121212121212121212121212121212121215151|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu Rcu 7Bt0 Ni0 4nd0 Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu e9Au qn0 lxB0 mn0|57e3",
  	"America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2",
  	"America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5",
  	"America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4",
  	"America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2",
  	"America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4",
  	"America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4",
  	"America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5",
  	"America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3",
  	"America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5",
  	"America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4",
  	"America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5",
  	"America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5",
  	"America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4",
  	"America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8",
  	"America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3",
  	"America/Dawson|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|13e2",
  	"America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5",
  	"America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|0123425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 JxX1 SMX 1cN0 1cL0 aW10 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5",
  	"America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|0121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 XQp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5",
  	"America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3",
  	"America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5",
  	"America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5",
  	"America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2",
  	"America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5",
  	"America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
  	"America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3",
  	"America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2",
  	"America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|0121212121212121212121212121212121212121212121212121212121212121212121212132121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 7jA0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2",
  	"America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5",
  	"America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5",
  	"America/Guyana|LMT -04 -0345 -03|3Q.D 40 3J 30|01231|-2mf87.l 8Hc7.l 2r7bJ Ey0f|80e4",
  	"America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4",
  	"America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5",
  	"America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4",
  	"America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010401054541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 8wn0 1cN0 1cL0 1cN0 1cK0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2",
  	"America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2",
  	"America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4",
  	"America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3",
  	"America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 1nX1 e0X 9vd0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5",
  	"America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6",
  	"America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6",
  	"America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4",
  	"America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5",
  	"America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5",
  	"America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4",
  	"America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4",
  	"America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4",
  	"America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2",
  	"America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5",
  	"America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
  	"America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6",
  	"America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2",
  	"America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3",
  	"America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5",
  	"America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5",
  	"America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5",
  	"America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6",
  	"America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2",
  	"America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2",
  	"America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2",
  	"America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3",
  	"America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
  	"America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4",
  	"America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
  	"America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4",
  	"America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4",
  	"America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|",
  	"America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842",
  	"America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2",
  	"America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5",
  	"America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4",
  	"America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229",
  	"America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4",
  	"America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5",
  	"America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5",
  	"America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6",
  	"America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452",
  	"America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2",
  	"America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
  	"America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3",
  	"America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5",
  	"America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656",
  	"America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
  	"America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
  	"America/Whitehorse|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|010102304056565656565656565656565656565656565656565656565656565656565656565656565656565656567|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1z90|23e3",
  	"America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4",
  	"America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642",
  	"America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
  	"Antarctica/Casey|-00 +08 +11|0 -80 -b0|0121212121212|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10 1o30 14k0 1kr0 12l0 1o01|10",
  	"Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70",
  	"Pacific/Port_Moresby|+10|-a0|0||25e4",
  	"Antarctica/Macquarie|AEST AEDT -00|-a0 -b0 0|010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 1a00 4SK0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 3Co0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|1",
  	"Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60",
  	"Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5",
  	"Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40",
  	"Antarctica/Rothera|-00 -03|0 30|01|gOo0|130",
  	"Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5",
  	"Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40",
  	"Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25",
  	"Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4",
  	"Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5",
  	"Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 LA0 1C00 LA0 1C00 Oo0 1zc0 Oo0 1C00 LA0 1C00 LA0 1C00 LA0 1C00 LA0 1C00 Oo0 1zc0 Oo0 1C00 LA0 1C00 LA0 1C00 LA0 1C00 LA0 1C00 Oo0 1C00 LA0 1C00|25e5",
  	"Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3",
  	"Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4",
  	"Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4",
  	"Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4",
  	"Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
  	"Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5",
  	"Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4",
  	"Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5",
  	"Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6",
  	"Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|",
  	"Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5",
  	"Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4",
  	"Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4",
  	"Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6",
  	"Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4",
  	"Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3",
  	"Asia/Shanghai|CST CDT|-80 -90|01010101010101010101010101010|-23uw0 18n0 OjB0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6",
  	"Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5",
  	"Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6",
  	"Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5",
  	"Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4",
  	"Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5",
  	"Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4",
  	"Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2o0 MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 pBa0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1nA0 1200 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1nA0 1200 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1qo0 Xc0 1qo0|18e5",
  	"Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|01010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2o0 MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 pBa0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nA0 1210 1qL0 WN0 1qL0 WN0 1qL0 11c0 1on0 11B0 1o00 11A0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1nA0 1200 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1nA0 1200 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 Xc0 1qo0 1200 1qo0 Xc0 1qo0|25e4",
  	"Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5",
  	"Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5",
  	"Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3",
  	"Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
  	"Europe/Istanbul|IMT EET EEST +03 +04|-1U.U -20 -30 -30 -40|0121212121212121212121212121212121212121212121234312121212121212121212121212121212121212121212121212121212121212123|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSN0 CL0 mp0 1Vz0 1gN0 8yn0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1ip0 19X0 1ip0 17b0 qdB0 38L0 1jd0 Tz0 l6O0 11A0 WN0 1qL0 TB0 1tX0 U10 1tz0 11B0 1in0 17d0 z90 cne0 pb0 2Cp0 1800 14o0 1dc0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6",
  	"Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6",
  	"Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4",
  	"Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|01212121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyOk.E MM0 iM0 4JA0 10o0 1pA0 10M0 1pA0 16o0 1jA0 16o0 1jA0 3LA0 Eo0 oo0 1co0 1dA0 16o0 10M0 1jc0 1tA0 14o0 1cM0 1a00 11A0 1Nc0 Ao0 1Nc0 Ao0 1Ko0 LA0 1o00 WM0 EQK0 Db0 1fB0 Rb0 bXB0 gM0 8Q00 IM0 1wo0 TX0 1HB0 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4",
  	"Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5",
  	"Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4",
  	"Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6",
  	"Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5",
  	"Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5",
  	"Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2",
  	"Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5",
  	"Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5",
  	"Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4",
  	"Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4",
  	"Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3",
  	"Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5",
  	"Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6",
  	"Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4",
  	"Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4",
  	"Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5",
  	"Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5",
  	"Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4",
  	"Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4",
  	"Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5",
  	"Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
  	"Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4",
  	"Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5",
  	"Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4",
  	"Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4",
  	"Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -a0 -9u|012343434343151515151515134343|-2um8r.Q 97XV.Q 1m1zu 6CM0 Fz0 1kN0 14n0 1kN0 14L0 1zd0 On0 69B0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6",
  	"Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2",
  	"Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5",
  	"Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5",
  	"Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5",
  	"Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6",
  	"Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3",
  	"Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rc0 1lc0 14o0 1zc0 Oo0 1zc0 Oo0|38e6",
  	"Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5",
  	"Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5",
  	"Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2",
  	"Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
  	"Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4",
  	"Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5",
  	"Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5",
  	"Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|0121212121212121212121212121212121212121212123212321232123212121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4",
  	"Atlantic/Bermuda|BMT BST AST ADT|4j.i 3j.i 40 30|010102323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28p7E.G 1bb0 1i10 11X0 ru30 thbE.G 1PX0 11B0 1tz0 Rd0 1zb0 Op0 1zb0 3I10 Lz0 1EN0 FX0 1HB0 FX0 1Kp0 Db0 1Kp0 Db0 1Kp0 FX0 93d0 11z0 GAp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3",
  	"Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4",
  	"Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3",
  	"Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|0121212121212121212121212121212121212121212123212321232123212121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4",
  	"Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4",
  	"Atlantic/South_Georgia|-02|20|0||30",
  	"Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2",
  	"Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5",
  	"Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5",
  	"Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5",
  	"Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3",
  	"Australia/Hobart|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 1a00 1qM0 Oo0 1zc0 Oo0 TAo0 yM0 1cM0 1cM0 1fA0 1a00 VfA0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4",
  	"Australia/Darwin|ACST ACDT|-9u -au|010101010|-293ju xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00|12e4",
  	"Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293iJ xc0 10jc0 yM0 1cM0 1cM0 1gSo0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368",
  	"Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347",
  	"Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10",
  	"Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293k0 xc0 10jc0 yM0 1cM0 1cM0 1fA0 1a00 17c00 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5",
  	"Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293i0 xc0 10jc0 yM0 1cM0 1cM0 1gSo0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5",
  	"CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2",
  	"CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"EST|EST|50|0||",
  	"EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"Etc/GMT-0|GMT|0|0||",
  	"Etc/GMT-1|+01|-10|0||",
  	"Etc/GMT-11|+11|-b0|0||",
  	"Pacific/Tarawa|+12|-c0|0||29e3",
  	"Etc/GMT-13|+13|-d0|0||",
  	"Etc/GMT-14|+14|-e0|0||",
  	"Etc/GMT-2|+02|-20|0||",
  	"Etc/GMT-3|+03|-30|0||",
  	"Etc/GMT-4|+04|-40|0||",
  	"Etc/GMT-5|+05|-50|0||",
  	"Etc/GMT-6|+06|-60|0||",
  	"Indian/Christmas|+07|-70|0||21e2",
  	"Etc/GMT-8|+08|-80|0||",
  	"Pacific/Palau|+09|-90|0||21e3",
  	"Etc/GMT+1|-01|10|0||",
  	"Etc/GMT+10|-10|a0|0||",
  	"Etc/GMT+11|-11|b0|0||",
  	"Etc/GMT+12|-12|c0|0||",
  	"Etc/GMT+3|-03|30|0||",
  	"Etc/GMT+4|-04|40|0||",
  	"Etc/GMT+5|-05|50|0||",
  	"Etc/GMT+6|-06|60|0||",
  	"Etc/GMT+7|-07|70|0||",
  	"Etc/GMT+8|-08|80|0||",
  	"Etc/GMT+9|-09|90|0||",
  	"Etc/UTC|UTC|0|0||",
  	"Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5",
  	"Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3",
  	"Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5",
  	"Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5",
  	"Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6",
  	"Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5",
  	"Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5",
  	"Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5",
  	"Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5",
  	"Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 1oo0 11c0 1lc0 17c0 O1V0 3Nf0 WM0 1fA0 1cM0 1cM0 1oJ0 1dd0 1020 1fX0 1cp0 1cM0 1cM0 1cM0 1fA0 1a00 bhy0 Rb0 1wr0 Rc0 1C00 LA0 1C00 LA0 SNW0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cO0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
  	"Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4",
  	"Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4",
  	"Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3",
  	"Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Kaliningrad|CET CEST EET EEST MSK MSD +03|-10 -20 -20 -30 -30 -40 -30|01010101010101232454545454545454543232323232323232323232323232323232323232323262|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 390 7A0 1en0 12N0 1pbb0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4",
  	"Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5",
  	"Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4",
  	"Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5",
  	"Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5",
  	"Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
  	"Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5",
  	"Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2n5c9.l cFX9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3",
  	"Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6",
  	"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6",
  	"Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4",
  	"Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5",
  	"Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5",
  	"Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810|",
  	"Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4",
  	"Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
  	"Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5",
  	"Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4",
  	"Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
  	"Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5",
  	"Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4",
  	"Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1ao0 1co0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5",
  	"Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
  	"Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|0123232323232323212121212121212121212121212121212121212121212121|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0 5gn0|10e5",
  	"Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
  	"Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4",
  	"HST|HST|a0|0||",
  	"Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2",
  	"Indian/Cocos|+0630|-6u|0||596",
  	"Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130",
  	"Indian/Mahe|LMT +04|-3F.M -40|01|-2xorF.M|79e3",
  	"Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4",
  	"Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4",
  	"Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4",
  	"Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3",
  	"MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
  	"MST|MST|70|0||",
  	"MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600",
  	"Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0|37e3",
  	"Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4",
  	"Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3",
  	"Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|012121212121212121212121|-2l9nd.g 2uNXd.g Dc0 n610 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3",
  	"Pacific/Enderbury|-00 -12 -11 +13|0 c0 b0 -d0|0123|-1iIo0 1GsA0 B7X0|1",
  	"Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483",
  	"Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|01212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 2hc0 bc0 4q00 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00|88e4",
  	"Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3",
  	"Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125",
  	"Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4",
  	"Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4",
  	"Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4",
  	"Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2",
  	"Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2",
  	"Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3",
  	"Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2",
  	"Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2",
  	"Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3",
  	"Pacific/Niue|LMT -1120 -11|bj.E bk b0|012|-FScE.k suo0.k|12e2",
  	"Pacific/Norfolk|+1112 +1130 +1230 +11 +12|-bc -bu -cu -b0 -c0|012134343434343434343434343434343434343434|-Kgbc W01G Oo0 1COo0 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|25e4",
  	"Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3",
  	"Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56",
  	"Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3",
  	"Pacific/Rarotonga|LMT -1030 -0930 -10|aD.4 au 9u a0|0123232323232323232323232323|-FSdk.U 13tbO.U IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3",
  	"Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4",
  	"Pacific/Tongatapu|LMT +1220 +13 +14|-cj.c -ck -d0 -e0|01232323232|-XbMj.c BgLX.c 1yndk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3",
  	"PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
  	"WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|"
  ];
  var links = [
  	"Africa/Abidjan|Africa/Accra",
  	"Africa/Abidjan|Africa/Bamako",
  	"Africa/Abidjan|Africa/Banjul",
  	"Africa/Abidjan|Africa/Conakry",
  	"Africa/Abidjan|Africa/Dakar",
  	"Africa/Abidjan|Africa/Freetown",
  	"Africa/Abidjan|Africa/Lome",
  	"Africa/Abidjan|Africa/Nouakchott",
  	"Africa/Abidjan|Africa/Ouagadougou",
  	"Africa/Abidjan|Africa/Timbuktu",
  	"Africa/Abidjan|Atlantic/St_Helena",
  	"Africa/Cairo|Egypt",
  	"Africa/Johannesburg|Africa/Maseru",
  	"Africa/Johannesburg|Africa/Mbabane",
  	"Africa/Lagos|Africa/Bangui",
  	"Africa/Lagos|Africa/Brazzaville",
  	"Africa/Lagos|Africa/Douala",
  	"Africa/Lagos|Africa/Kinshasa",
  	"Africa/Lagos|Africa/Libreville",
  	"Africa/Lagos|Africa/Luanda",
  	"Africa/Lagos|Africa/Malabo",
  	"Africa/Lagos|Africa/Niamey",
  	"Africa/Lagos|Africa/Porto-Novo",
  	"Africa/Maputo|Africa/Blantyre",
  	"Africa/Maputo|Africa/Bujumbura",
  	"Africa/Maputo|Africa/Gaborone",
  	"Africa/Maputo|Africa/Harare",
  	"Africa/Maputo|Africa/Kigali",
  	"Africa/Maputo|Africa/Lubumbashi",
  	"Africa/Maputo|Africa/Lusaka",
  	"Africa/Nairobi|Africa/Addis_Ababa",
  	"Africa/Nairobi|Africa/Asmara",
  	"Africa/Nairobi|Africa/Asmera",
  	"Africa/Nairobi|Africa/Dar_es_Salaam",
  	"Africa/Nairobi|Africa/Djibouti",
  	"Africa/Nairobi|Africa/Kampala",
  	"Africa/Nairobi|Africa/Mogadishu",
  	"Africa/Nairobi|Indian/Antananarivo",
  	"Africa/Nairobi|Indian/Comoro",
  	"Africa/Nairobi|Indian/Mayotte",
  	"Africa/Tripoli|Libya",
  	"America/Adak|America/Atka",
  	"America/Adak|US/Aleutian",
  	"America/Anchorage|US/Alaska",
  	"America/Argentina/Buenos_Aires|America/Buenos_Aires",
  	"America/Argentina/Catamarca|America/Argentina/ComodRivadavia",
  	"America/Argentina/Catamarca|America/Catamarca",
  	"America/Argentina/Cordoba|America/Cordoba",
  	"America/Argentina/Cordoba|America/Rosario",
  	"America/Argentina/Jujuy|America/Jujuy",
  	"America/Argentina/Mendoza|America/Mendoza",
  	"America/Chicago|US/Central",
  	"America/Denver|America/Shiprock",
  	"America/Denver|Navajo",
  	"America/Denver|US/Mountain",
  	"America/Detroit|US/Michigan",
  	"America/Edmonton|Canada/Mountain",
  	"America/Fort_Wayne|America/Indiana/Indianapolis",
  	"America/Fort_Wayne|America/Indianapolis",
  	"America/Fort_Wayne|US/East-Indiana",
  	"America/Godthab|America/Nuuk",
  	"America/Halifax|Canada/Atlantic",
  	"America/Havana|Cuba",
  	"America/Indiana/Knox|America/Knox_IN",
  	"America/Indiana/Knox|US/Indiana-Starke",
  	"America/Jamaica|Jamaica",
  	"America/Kentucky/Louisville|America/Louisville",
  	"America/Los_Angeles|US/Pacific",
  	"America/Manaus|Brazil/West",
  	"America/Mazatlan|Mexico/BajaSur",
  	"America/Mexico_City|Mexico/General",
  	"America/New_York|US/Eastern",
  	"America/Noronha|Brazil/DeNoronha",
  	"America/Panama|America/Atikokan",
  	"America/Panama|America/Cayman",
  	"America/Panama|America/Coral_Harbour",
  	"America/Phoenix|America/Creston",
  	"America/Phoenix|US/Arizona",
  	"America/Puerto_Rico|America/Anguilla",
  	"America/Puerto_Rico|America/Antigua",
  	"America/Puerto_Rico|America/Aruba",
  	"America/Puerto_Rico|America/Blanc-Sablon",
  	"America/Puerto_Rico|America/Curacao",
  	"America/Puerto_Rico|America/Dominica",
  	"America/Puerto_Rico|America/Grenada",
  	"America/Puerto_Rico|America/Guadeloupe",
  	"America/Puerto_Rico|America/Kralendijk",
  	"America/Puerto_Rico|America/Lower_Princes",
  	"America/Puerto_Rico|America/Marigot",
  	"America/Puerto_Rico|America/Montserrat",
  	"America/Puerto_Rico|America/Port_of_Spain",
  	"America/Puerto_Rico|America/St_Barthelemy",
  	"America/Puerto_Rico|America/St_Kitts",
  	"America/Puerto_Rico|America/St_Lucia",
  	"America/Puerto_Rico|America/St_Thomas",
  	"America/Puerto_Rico|America/St_Vincent",
  	"America/Puerto_Rico|America/Tortola",
  	"America/Puerto_Rico|America/Virgin",
  	"America/Regina|Canada/Saskatchewan",
  	"America/Rio_Branco|America/Porto_Acre",
  	"America/Rio_Branco|Brazil/Acre",
  	"America/Santiago|Chile/Continental",
  	"America/Sao_Paulo|Brazil/East",
  	"America/St_Johns|Canada/Newfoundland",
  	"America/Tijuana|America/Ensenada",
  	"America/Tijuana|America/Santa_Isabel",
  	"America/Tijuana|Mexico/BajaNorte",
  	"America/Toronto|America/Montreal",
  	"America/Toronto|America/Nassau",
  	"America/Toronto|Canada/Eastern",
  	"America/Vancouver|Canada/Pacific",
  	"America/Whitehorse|Canada/Yukon",
  	"America/Winnipeg|Canada/Central",
  	"Asia/Ashgabat|Asia/Ashkhabad",
  	"Asia/Bangkok|Asia/Phnom_Penh",
  	"Asia/Bangkok|Asia/Vientiane",
  	"Asia/Dhaka|Asia/Dacca",
  	"Asia/Dubai|Asia/Muscat",
  	"Asia/Ho_Chi_Minh|Asia/Saigon",
  	"Asia/Hong_Kong|Hongkong",
  	"Asia/Jerusalem|Asia/Tel_Aviv",
  	"Asia/Jerusalem|Israel",
  	"Asia/Kathmandu|Asia/Katmandu",
  	"Asia/Kolkata|Asia/Calcutta",
  	"Asia/Kuala_Lumpur|Asia/Singapore",
  	"Asia/Kuala_Lumpur|Singapore",
  	"Asia/Macau|Asia/Macao",
  	"Asia/Makassar|Asia/Ujung_Pandang",
  	"Asia/Nicosia|Europe/Nicosia",
  	"Asia/Qatar|Asia/Bahrain",
  	"Asia/Rangoon|Asia/Yangon",
  	"Asia/Riyadh|Antarctica/Syowa",
  	"Asia/Riyadh|Asia/Aden",
  	"Asia/Riyadh|Asia/Kuwait",
  	"Asia/Seoul|ROK",
  	"Asia/Shanghai|Asia/Chongqing",
  	"Asia/Shanghai|Asia/Chungking",
  	"Asia/Shanghai|Asia/Harbin",
  	"Asia/Shanghai|PRC",
  	"Asia/Taipei|ROC",
  	"Asia/Tehran|Iran",
  	"Asia/Thimphu|Asia/Thimbu",
  	"Asia/Tokyo|Japan",
  	"Asia/Ulaanbaatar|Asia/Ulan_Bator",
  	"Asia/Urumqi|Asia/Kashgar",
  	"Atlantic/Faroe|Atlantic/Faeroe",
  	"Atlantic/Reykjavik|Iceland",
  	"Atlantic/South_Georgia|Etc/GMT+2",
  	"Australia/Adelaide|Australia/South",
  	"Australia/Brisbane|Australia/Queensland",
  	"Australia/Broken_Hill|Australia/Yancowinna",
  	"Australia/Darwin|Australia/North",
  	"Australia/Hobart|Australia/Currie",
  	"Australia/Hobart|Australia/Tasmania",
  	"Australia/Lord_Howe|Australia/LHI",
  	"Australia/Melbourne|Australia/Victoria",
  	"Australia/Perth|Australia/West",
  	"Australia/Sydney|Australia/ACT",
  	"Australia/Sydney|Australia/Canberra",
  	"Australia/Sydney|Australia/NSW",
  	"Etc/GMT-0|Etc/GMT",
  	"Etc/GMT-0|Etc/GMT+0",
  	"Etc/GMT-0|Etc/GMT0",
  	"Etc/GMT-0|Etc/Greenwich",
  	"Etc/GMT-0|GMT",
  	"Etc/GMT-0|GMT+0",
  	"Etc/GMT-0|GMT-0",
  	"Etc/GMT-0|GMT0",
  	"Etc/GMT-0|Greenwich",
  	"Etc/UTC|Etc/UCT",
  	"Etc/UTC|Etc/Universal",
  	"Etc/UTC|Etc/Zulu",
  	"Etc/UTC|UCT",
  	"Etc/UTC|UTC",
  	"Etc/UTC|Universal",
  	"Etc/UTC|Zulu",
  	"Europe/Belgrade|Europe/Ljubljana",
  	"Europe/Belgrade|Europe/Podgorica",
  	"Europe/Belgrade|Europe/Sarajevo",
  	"Europe/Belgrade|Europe/Skopje",
  	"Europe/Belgrade|Europe/Zagreb",
  	"Europe/Chisinau|Europe/Tiraspol",
  	"Europe/Dublin|Eire",
  	"Europe/Helsinki|Europe/Mariehamn",
  	"Europe/Istanbul|Asia/Istanbul",
  	"Europe/Istanbul|Turkey",
  	"Europe/Lisbon|Portugal",
  	"Europe/London|Europe/Belfast",
  	"Europe/London|Europe/Guernsey",
  	"Europe/London|Europe/Isle_of_Man",
  	"Europe/London|Europe/Jersey",
  	"Europe/London|GB",
  	"Europe/London|GB-Eire",
  	"Europe/Moscow|W-SU",
  	"Europe/Oslo|Arctic/Longyearbyen",
  	"Europe/Oslo|Atlantic/Jan_Mayen",
  	"Europe/Prague|Europe/Bratislava",
  	"Europe/Rome|Europe/San_Marino",
  	"Europe/Rome|Europe/Vatican",
  	"Europe/Warsaw|Poland",
  	"Europe/Zurich|Europe/Busingen",
  	"Europe/Zurich|Europe/Vaduz",
  	"Indian/Christmas|Etc/GMT-7",
  	"Pacific/Auckland|Antarctica/McMurdo",
  	"Pacific/Auckland|Antarctica/South_Pole",
  	"Pacific/Auckland|NZ",
  	"Pacific/Chatham|NZ-CHAT",
  	"Pacific/Chuuk|Pacific/Truk",
  	"Pacific/Chuuk|Pacific/Yap",
  	"Pacific/Easter|Chile/EasterIsland",
  	"Pacific/Enderbury|Pacific/Kanton",
  	"Pacific/Guam|Pacific/Saipan",
  	"Pacific/Honolulu|Pacific/Johnston",
  	"Pacific/Honolulu|US/Hawaii",
  	"Pacific/Kwajalein|Kwajalein",
  	"Pacific/Pago_Pago|Pacific/Midway",
  	"Pacific/Pago_Pago|Pacific/Samoa",
  	"Pacific/Pago_Pago|US/Samoa",
  	"Pacific/Palau|Etc/GMT-9",
  	"Pacific/Pohnpei|Pacific/Ponape",
  	"Pacific/Port_Moresby|Antarctica/DumontDUrville",
  	"Pacific/Port_Moresby|Etc/GMT-10",
  	"Pacific/Tarawa|Etc/GMT-12",
  	"Pacific/Tarawa|Pacific/Funafuti",
  	"Pacific/Tarawa|Pacific/Wake",
  	"Pacific/Tarawa|Pacific/Wallis"
  ];
  var countries = [
  	"AD|Europe/Andorra",
  	"AE|Asia/Dubai",
  	"AF|Asia/Kabul",
  	"AG|America/Port_of_Spain America/Antigua",
  	"AI|America/Port_of_Spain America/Anguilla",
  	"AL|Europe/Tirane",
  	"AM|Asia/Yerevan",
  	"AO|Africa/Lagos Africa/Luanda",
  	"AQ|Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok Pacific/Auckland Antarctica/McMurdo",
  	"AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia",
  	"AS|Pacific/Pago_Pago",
  	"AT|Europe/Vienna",
  	"AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla",
  	"AW|America/Curacao America/Aruba",
  	"AX|Europe/Helsinki Europe/Mariehamn",
  	"AZ|Asia/Baku",
  	"BA|Europe/Belgrade Europe/Sarajevo",
  	"BB|America/Barbados",
  	"BD|Asia/Dhaka",
  	"BE|Europe/Brussels",
  	"BF|Africa/Abidjan Africa/Ouagadougou",
  	"BG|Europe/Sofia",
  	"BH|Asia/Qatar Asia/Bahrain",
  	"BI|Africa/Maputo Africa/Bujumbura",
  	"BJ|Africa/Lagos Africa/Porto-Novo",
  	"BL|America/Port_of_Spain America/St_Barthelemy",
  	"BM|Atlantic/Bermuda",
  	"BN|Asia/Brunei",
  	"BO|America/La_Paz",
  	"BQ|America/Curacao America/Kralendijk",
  	"BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco",
  	"BS|America/Nassau",
  	"BT|Asia/Thimphu",
  	"BW|Africa/Maputo Africa/Gaborone",
  	"BY|Europe/Minsk",
  	"BZ|America/Belize",
  	"CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Blanc-Sablon America/Toronto America/Nipigon America/Thunder_Bay America/Iqaluit America/Pangnirtung America/Atikokan America/Winnipeg America/Rainy_River America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Creston America/Dawson_Creek America/Fort_Nelson America/Whitehorse America/Dawson America/Vancouver",
  	"CC|Indian/Cocos",
  	"CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi",
  	"CF|Africa/Lagos Africa/Bangui",
  	"CG|Africa/Lagos Africa/Brazzaville",
  	"CH|Europe/Zurich",
  	"CI|Africa/Abidjan",
  	"CK|Pacific/Rarotonga",
  	"CL|America/Santiago America/Punta_Arenas Pacific/Easter",
  	"CM|Africa/Lagos Africa/Douala",
  	"CN|Asia/Shanghai Asia/Urumqi",
  	"CO|America/Bogota",
  	"CR|America/Costa_Rica",
  	"CU|America/Havana",
  	"CV|Atlantic/Cape_Verde",
  	"CW|America/Curacao",
  	"CX|Indian/Christmas",
  	"CY|Asia/Nicosia Asia/Famagusta",
  	"CZ|Europe/Prague",
  	"DE|Europe/Zurich Europe/Berlin Europe/Busingen",
  	"DJ|Africa/Nairobi Africa/Djibouti",
  	"DK|Europe/Copenhagen",
  	"DM|America/Port_of_Spain America/Dominica",
  	"DO|America/Santo_Domingo",
  	"DZ|Africa/Algiers",
  	"EC|America/Guayaquil Pacific/Galapagos",
  	"EE|Europe/Tallinn",
  	"EG|Africa/Cairo",
  	"EH|Africa/El_Aaiun",
  	"ER|Africa/Nairobi Africa/Asmara",
  	"ES|Europe/Madrid Africa/Ceuta Atlantic/Canary",
  	"ET|Africa/Nairobi Africa/Addis_Ababa",
  	"FI|Europe/Helsinki",
  	"FJ|Pacific/Fiji",
  	"FK|Atlantic/Stanley",
  	"FM|Pacific/Chuuk Pacific/Pohnpei Pacific/Kosrae",
  	"FO|Atlantic/Faroe",
  	"FR|Europe/Paris",
  	"GA|Africa/Lagos Africa/Libreville",
  	"GB|Europe/London",
  	"GD|America/Port_of_Spain America/Grenada",
  	"GE|Asia/Tbilisi",
  	"GF|America/Cayenne",
  	"GG|Europe/London Europe/Guernsey",
  	"GH|Africa/Accra",
  	"GI|Europe/Gibraltar",
  	"GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule",
  	"GM|Africa/Abidjan Africa/Banjul",
  	"GN|Africa/Abidjan Africa/Conakry",
  	"GP|America/Port_of_Spain America/Guadeloupe",
  	"GQ|Africa/Lagos Africa/Malabo",
  	"GR|Europe/Athens",
  	"GS|Atlantic/South_Georgia",
  	"GT|America/Guatemala",
  	"GU|Pacific/Guam",
  	"GW|Africa/Bissau",
  	"GY|America/Guyana",
  	"HK|Asia/Hong_Kong",
  	"HN|America/Tegucigalpa",
  	"HR|Europe/Belgrade Europe/Zagreb",
  	"HT|America/Port-au-Prince",
  	"HU|Europe/Budapest",
  	"ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
  	"IE|Europe/Dublin",
  	"IL|Asia/Jerusalem",
  	"IM|Europe/London Europe/Isle_of_Man",
  	"IN|Asia/Kolkata",
  	"IO|Indian/Chagos",
  	"IQ|Asia/Baghdad",
  	"IR|Asia/Tehran",
  	"IS|Atlantic/Reykjavik",
  	"IT|Europe/Rome",
  	"JE|Europe/London Europe/Jersey",
  	"JM|America/Jamaica",
  	"JO|Asia/Amman",
  	"JP|Asia/Tokyo",
  	"KE|Africa/Nairobi",
  	"KG|Asia/Bishkek",
  	"KH|Asia/Bangkok Asia/Phnom_Penh",
  	"KI|Pacific/Tarawa Pacific/Enderbury Pacific/Kiritimati",
  	"KM|Africa/Nairobi Indian/Comoro",
  	"KN|America/Port_of_Spain America/St_Kitts",
  	"KP|Asia/Pyongyang",
  	"KR|Asia/Seoul",
  	"KW|Asia/Riyadh Asia/Kuwait",
  	"KY|America/Panama America/Cayman",
  	"KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral",
  	"LA|Asia/Bangkok Asia/Vientiane",
  	"LB|Asia/Beirut",
  	"LC|America/Port_of_Spain America/St_Lucia",
  	"LI|Europe/Zurich Europe/Vaduz",
  	"LK|Asia/Colombo",
  	"LR|Africa/Monrovia",
  	"LS|Africa/Johannesburg Africa/Maseru",
  	"LT|Europe/Vilnius",
  	"LU|Europe/Luxembourg",
  	"LV|Europe/Riga",
  	"LY|Africa/Tripoli",
  	"MA|Africa/Casablanca",
  	"MC|Europe/Monaco",
  	"MD|Europe/Chisinau",
  	"ME|Europe/Belgrade Europe/Podgorica",
  	"MF|America/Port_of_Spain America/Marigot",
  	"MG|Africa/Nairobi Indian/Antananarivo",
  	"MH|Pacific/Majuro Pacific/Kwajalein",
  	"MK|Europe/Belgrade Europe/Skopje",
  	"ML|Africa/Abidjan Africa/Bamako",
  	"MM|Asia/Yangon",
  	"MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan",
  	"MO|Asia/Macau",
  	"MP|Pacific/Guam Pacific/Saipan",
  	"MQ|America/Martinique",
  	"MR|Africa/Abidjan Africa/Nouakchott",
  	"MS|America/Port_of_Spain America/Montserrat",
  	"MT|Europe/Malta",
  	"MU|Indian/Mauritius",
  	"MV|Indian/Maldives",
  	"MW|Africa/Maputo Africa/Blantyre",
  	"MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas",
  	"MY|Asia/Kuala_Lumpur Asia/Kuching",
  	"MZ|Africa/Maputo",
  	"NA|Africa/Windhoek",
  	"NC|Pacific/Noumea",
  	"NE|Africa/Lagos Africa/Niamey",
  	"NF|Pacific/Norfolk",
  	"NG|Africa/Lagos",
  	"NI|America/Managua",
  	"NL|Europe/Amsterdam",
  	"NO|Europe/Oslo",
  	"NP|Asia/Kathmandu",
  	"NR|Pacific/Nauru",
  	"NU|Pacific/Niue",
  	"NZ|Pacific/Auckland Pacific/Chatham",
  	"OM|Asia/Dubai Asia/Muscat",
  	"PA|America/Panama",
  	"PE|America/Lima",
  	"PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier",
  	"PG|Pacific/Port_Moresby Pacific/Bougainville",
  	"PH|Asia/Manila",
  	"PK|Asia/Karachi",
  	"PL|Europe/Warsaw",
  	"PM|America/Miquelon",
  	"PN|Pacific/Pitcairn",
  	"PR|America/Puerto_Rico",
  	"PS|Asia/Gaza Asia/Hebron",
  	"PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores",
  	"PW|Pacific/Palau",
  	"PY|America/Asuncion",
  	"QA|Asia/Qatar",
  	"RE|Indian/Reunion",
  	"RO|Europe/Bucharest",
  	"RS|Europe/Belgrade",
  	"RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Volgograd Europe/Astrakhan Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
  	"RW|Africa/Maputo Africa/Kigali",
  	"SA|Asia/Riyadh",
  	"SB|Pacific/Guadalcanal",
  	"SC|Indian/Mahe",
  	"SD|Africa/Khartoum",
  	"SE|Europe/Stockholm",
  	"SG|Asia/Singapore",
  	"SH|Africa/Abidjan Atlantic/St_Helena",
  	"SI|Europe/Belgrade Europe/Ljubljana",
  	"SJ|Europe/Oslo Arctic/Longyearbyen",
  	"SK|Europe/Prague Europe/Bratislava",
  	"SL|Africa/Abidjan Africa/Freetown",
  	"SM|Europe/Rome Europe/San_Marino",
  	"SN|Africa/Abidjan Africa/Dakar",
  	"SO|Africa/Nairobi Africa/Mogadishu",
  	"SR|America/Paramaribo",
  	"SS|Africa/Juba",
  	"ST|Africa/Sao_Tome",
  	"SV|America/El_Salvador",
  	"SX|America/Curacao America/Lower_Princes",
  	"SY|Asia/Damascus",
  	"SZ|Africa/Johannesburg Africa/Mbabane",
  	"TC|America/Grand_Turk",
  	"TD|Africa/Ndjamena",
  	"TF|Indian/Reunion Indian/Kerguelen",
  	"TG|Africa/Abidjan Africa/Lome",
  	"TH|Asia/Bangkok",
  	"TJ|Asia/Dushanbe",
  	"TK|Pacific/Fakaofo",
  	"TL|Asia/Dili",
  	"TM|Asia/Ashgabat",
  	"TN|Africa/Tunis",
  	"TO|Pacific/Tongatapu",
  	"TR|Europe/Istanbul",
  	"TT|America/Port_of_Spain",
  	"TV|Pacific/Funafuti",
  	"TW|Asia/Taipei",
  	"TZ|Africa/Nairobi Africa/Dar_es_Salaam",
  	"UA|Europe/Simferopol Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye",
  	"UG|Africa/Nairobi Africa/Kampala",
  	"UM|Pacific/Pago_Pago Pacific/Wake Pacific/Honolulu Pacific/Midway",
  	"US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu",
  	"UY|America/Montevideo",
  	"UZ|Asia/Samarkand Asia/Tashkent",
  	"VA|Europe/Rome Europe/Vatican",
  	"VC|America/Port_of_Spain America/St_Vincent",
  	"VE|America/Caracas",
  	"VG|America/Port_of_Spain America/Tortola",
  	"VI|America/Port_of_Spain America/St_Thomas",
  	"VN|Asia/Bangkok Asia/Ho_Chi_Minh",
  	"VU|Pacific/Efate",
  	"WF|Pacific/Wallis",
  	"WS|Pacific/Apia",
  	"YE|Asia/Riyadh Asia/Aden",
  	"YT|Africa/Nairobi Indian/Mayotte",
  	"ZA|Africa/Johannesburg",
  	"ZM|Africa/Maputo Africa/Lusaka",
  	"ZW|Africa/Maputo Africa/Harare"
  ];
  var require$$1 = {
  	version: version,
  	zones: zones,
  	links: links,
  	countries: countries
  };

  var momentTimezone$1 = createCommonjsModule(function (module) {
  var moment = module.exports = momentTimezone;
  moment.tz.load(require$$1);
  });

  function copyCurrentDay(text, alert) {
    var success = "复制成功!";

    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      alert(success);
      return window.clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.

      document.body.appendChild(textarea);
      textarea.select();

      try {
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed. Let Fireblend know!", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
        alert(success);
      }
    }
  }

  var renderGuessTable = function renderGuessTable(data, answer) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'guesses'
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "row"
    }, TYPES.map(function (_ref) {
      var label = _ref.label;
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "column",
        key: label
      }, label);
    })), data.map(function (v, index) {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "row",
        key: index
      }, TYPES.map(function (_ref2) {
        var key = _ref2.key,
            type = _ref2.type;

        if (key === 'guess') {
          var _v$guess = v.guess,
              name = _v$guess.name,
              rarity = _v$guess.rarity,
              team = _v$guess.team,
              className = _v$guess.className,
              race = _v$guess.race,
              painter = _v$guess.painter;
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "column",
            key: key
          }, /*#__PURE__*/React__default['default'].createElement("div", {
            className: "tooltip"
          }, name, /*#__PURE__*/React__default['default'].createElement("span", {
            className: "tooltiptext"
          }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u5E72\u5458\u540D\u79F0:"), name), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u7A00\u6709\u5EA6:"), 1 + rarity), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u9635\u8425:"), team === null || team === void 0 ? void 0 : team.join(' ')), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u804C\u4E1A:"), className === null || className === void 0 ? void 0 : className.join('-')), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u79CD\u65CF:"), race), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("span", {
            className: 'title'
          }, "\u753B\u5E08:"), painter))));
        }

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "column",
          key: key
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "emoji ".concat(v[key])
        }));
      }));
    }));
  };

  var markText = function markText(data, showName) {
    var text = "\u5E72\u5458\u731C\u731C\u4E50 http://akg.saki.cc";
    data.forEach(function (v) {
      text += '\n';
      TYPES.map(function (_ref3) {
        var key = _ref3.key,
            type = _ref3.type;

        if (key === 'guess') {
          showName && (text += v.guess.name);
        } else {
          text += VAL_DICT[v[key]];
        }
      });
    });
    return text;
  };

  var ShareIcon = function ShareIcon() {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'share-icon'
    }, /*#__PURE__*/React__default['default'].createElement("svg", {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 300 300"
    }, /*#__PURE__*/React__default['default'].createElement("circle", {
      cx: "242",
      cy: "49",
      r: "35"
    }), /*#__PURE__*/React__default['default'].createElement("circle", {
      cx: "242",
      cy: "251",
      r: "35"
    }), /*#__PURE__*/React__default['default'].createElement("circle", {
      cx: "58",
      cy: "150",
      r: "35"
    }), /*#__PURE__*/React__default['default'].createElement("line", {
      x1: "242",
      y1: "49",
      x2: "59",
      y2: "150",
      "stroke-width": "20"
    }), /*#__PURE__*/React__default['default'].createElement("line", {
      x1: "242",
      y1: "251",
      x2: "59",
      y2: "150",
      "stroke-width": "20"
    })));
  };

  function Home() {
    var _data, _data$guess;

    var inputRef = React__default['default'].useRef();

    var _React$useState = React__default['default'].useState("random"),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        mode = _React$useState2[0],
        setMode = _React$useState2[1];

    var _React$useState3 = React__default['default'].useState(""),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        msg = _React$useState4[0],
        setMsg = _React$useState4[1];

    var _React$useState5 = React__default['default'].useState(Math.floor(Math.random() * chartsData.length)),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        randomAnswerKey = _React$useState6[0],
        setRandomAnswerKey = _React$useState6[1];

    var _React$useState7 = React__default['default'].useState(-1),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        remoteAnswerKey = _React$useState8[0],
        setRemoteAnswerKey = _React$useState8[1];

    var _React$useState9 = React__default['default'].useState([]),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        randomData = _React$useState10[0],
        setRandomData = _React$useState10[1];

    var _React$useState11 = React__default['default'].useState([]),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        dayData = _React$useState12[0],
        setDayData = _React$useState12[1];

    var chartNames = React__default['default'].useMemo(function () {
      return chartsData.map(function (v) {
        return v.name;
      });
    }, []);
    var today = React__default['default'].useMemo(function () {
      return momentTimezone$1().tz("Asia/Shanghai").format('YYYY-MM-DD');
    }, []);
    React__default['default'].useEffect(function () {
      autocomplete(inputRef.current, chartNames);
      var randomData = localStorage.getItem('randomData');

      if (randomData) {
        setRandomData(JSON.parse(randomData));
        setRandomAnswerKey(Number(localStorage.getItem('randomAnswerKey')));
      }

      var dayData = localStorage.getItem(today + 'dayData');

      if (dayData) {
        setDayData(JSON.parse(dayData));
      }
    }, []);
    var answer = mode === 'random' ? chartsData[randomAnswerKey] : chartsData[remoteAnswerKey];
    var data = mode === 'random' ? randomData : dayData;
    var setData = mode === 'random' ? function (v) {
      localStorage.setItem('randomData', JSON.stringify(v));
      localStorage.setItem('randomAnswerKey', "".concat(randomAnswerKey));
      setRandomData(v);
    } : function (v) {
      localStorage.setItem(today + 'dayData', JSON.stringify(v));
      setDayData(v);
    };

    var showModal = function showModal(msg) {
      setMsg(msg);
      setTimeout(function () {
        setMsg('');
      }, 1500);
    };

    var isWin = (data === null || data === void 0 ? void 0 : (_data = data[(data === null || data === void 0 ? void 0 : data.length) - 1]) === null || _data === void 0 ? void 0 : (_data$guess = _data.guess) === null || _data$guess === void 0 ? void 0 : _data$guess.name) === answer.name;
    var isOver = data.length > 5 || isWin;

    var onSubmit = function onSubmit(e) {
      e.stopPropagation();

      if (mode === 'day' && today !== momentTimezone$1().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
        alert('数据已更新，即将刷新页面');
        window.location.reload();
        return;
      }

      var inputName = inputRef.current.value;

      if (chartNames.indexOf(inputName) === -1) {
        showModal('输入错误，请输入正确的干员名称。');
      } else if (data.map(function (v) {
        return v.guess.name;
      }).indexOf(inputName) !== -1) {
        showModal('已经输入过啦 换一个吧！');
      } else {
        var inputItem = chartsData.filter(function (v) {
          return v.name === inputName;
        })[0];
        var res = {};
        TYPES.forEach(function (_ref4) {
          var key = _ref4.key,
              type = _ref4.type;

          if (key === 'guess') {
            return res[key] = inputItem;
          }

          var emoji;

          switch (type) {
            case 'string':
              emoji = (inputItem === null || inputItem === void 0 ? void 0 : inputItem[key]) === (answer === null || answer === void 0 ? void 0 : answer[key]) ? 'correct' : 'wrong';
              break;

            case 'number':
              var diff = Number(inputItem === null || inputItem === void 0 ? void 0 : inputItem[key]) - Number(answer === null || answer === void 0 ? void 0 : answer[key]);
              emoji = diff === 0 ? 'correct' : diff > 0 ? 'down' : 'up';
              break;

            case 'array':
              var x = (inputItem === null || inputItem === void 0 ? void 0 : inputItem[key]) || [];
              var y = (answer === null || answer === void 0 ? void 0 : answer[key]) || [];

              var eqState = function eqState(x, y) {
                var l = new Set([].concat(_toConsumableArray(x), _toConsumableArray(y))).size;
                if (x.length === y.length && x.length === l) return 'correct';
                if (x.length + y.length === l) return 'wrong';
                return 'wrongpos';
              };

              emoji = eqState(x, y);
              break;
          }

          res[key] = emoji;
        });
        setData([].concat(_toConsumableArray(data), [res]));
        inputRef.current.value = '';
      }
    };

    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'container'
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'main-container clean-float'
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'ak-tab'
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "ak-tab-item ".concat(mode === 'random' ? 'active' : ''),
      onClick: function onClick() {
        return setMode('random');
      }
    }, "\u968F\u673A\u6A21\u5F0F"), remoteAnswerKey !== -1 && /*#__PURE__*/React__default['default'].createElement("div", {
      className: "ak-tab-item ".concat(mode === 'day' ? 'active' : ''),
      onClick: function onClick() {
        return setMode('day');
      }
    }, "\u6BCF\u65E5\u6A21\u5F0F")), /*#__PURE__*/React__default['default'].createElement("div", null, "\u5E72\u5458\u731C\u731C\u4E50"), /*#__PURE__*/React__default['default'].createElement("div", null, "\u660E\u65E5\u65B9\u821F wordle-like by \u6628\u65E5\u6C89\u8239"), /*#__PURE__*/React__default['default'].createElement("div", null, "\u4F60\u67096\u6B21\u673A\u4F1A\u731C\u6D4B\u8FD9\u53EA\u795E\u79D8\u5E72\u5458\uFF0C\u8BD5\u8BD5\u770B\uFF01", /*#__PURE__*/React__default['default'].createElement("div", {
      className: "tooltip"
    }, "\u5206\u4EAB Emoji \u6620\u5C04\u8868", /*#__PURE__*/React__default['default'].createElement("span", {
      className: "tooltiptext"
    }, "\uD83D\uDFE9: \u5B8C\u5168\u6B63\u786E", /*#__PURE__*/React__default['default'].createElement("br", null), "\uD83D\uDFE5: \u4E0D\u6B63\u786E", /*#__PURE__*/React__default['default'].createElement("br", null), "\uD83D\uDFE8: \u90E8\u5206\u6B63\u786E", /*#__PURE__*/React__default['default'].createElement("br", null), "\uD83D\uDD3C: \u731C\u6D4B\u503C\u8FC7\u5C0F", /*#__PURE__*/React__default['default'].createElement("br", null), "\uD83D\uDD3D: \u731C\u6D4B\u503C\u8FC7\u5927"))), mode === 'day' && /*#__PURE__*/React__default['default'].createElement("div", null, "\u66F4\u65B0\u65F6\u95F4\u4E3A \u5317\u4EAC\u65F6\u95F40\u70B9 GMT+8"), !!(data === null || data === void 0 ? void 0 : data.length) && renderGuessTable(data), /*#__PURE__*/React__default['default'].createElement("form", {
      className: 'input-form',
      autoComplete: "off",
      action: "javascript:void(0)",
      onSubmit: onSubmit,
      style: {
        display: isOver ? 'none' : ''
      }
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "autocomplete"
    }, /*#__PURE__*/React__default['default'].createElement("input", {
      ref: inputRef,
      id: "guess"
    })), /*#__PURE__*/React__default['default'].createElement("input", {
      className: "guess_input",
      type: "submit",
      value: "\u63D0\u4EA4"
    })), !!isOver && /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'answer'
    }, "".concat(isWin ? '成功' : '失败', "\u4E86\uFF01\u8FD9\u53EA\u795E\u79D8\u7684\u5E72\u5458\u662F").concat(answer.name, "\u3002")), !!(data === null || data === void 0 ? void 0 : data.length) && /*#__PURE__*/React__default['default'].createElement("div", {
      className: 'share-body'
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      className: 'togglec',
      onClick: function onClick() {
        copyCurrentDay(markText(data, false), showModal);
      }
    }, /*#__PURE__*/React__default['default'].createElement(ShareIcon, null), "\u5206\u4EAB"), /*#__PURE__*/React__default['default'].createElement("a", {
      className: 'togglec',
      onClick: function onClick() {
        copyCurrentDay(markText(data, true), showModal);
      },
      style: {
        marginLeft: 20
      }
    }, /*#__PURE__*/React__default['default'].createElement(ShareIcon, null), "\u5206\u4EAB(\u5E26\u540D\u79F0)")), mode !== 'day' && /*#__PURE__*/React__default['default'].createElement("a", {
      className: 'togglec',
      variant: "danger",
      onClick: function onClick() {
        setData([]);
        setRandomAnswerKey(Math.floor(Math.random() * chartsData.length));
      }
    }, "\u25B6\uFE0F \u65B0\u7684\u6E38\u620F"), msg && /*#__PURE__*/React__default['default'].createElement("span", {
      className: "global-tooltiptext"
    }, msg)));
  }

  function bootstrap() {} // 挂载

  function mount(container, props) {
    console.log(props, 'props');
    ReactDOM__default['default'].render( /*#__PURE__*/React.createElement(Home, props, null), container);
  } // 更新

  function updated(attrName, value, container, props) {
    ReactDOM__default['default'].render( /*#__PURE__*/React.createElement(Home, props, null), container);
  }
  window.App = {
    bootstrap: bootstrap,
    mount: mount,
    updated: updated
  };

  exports.bootstrap = bootstrap;
  exports.mount = mount;
  exports.updated = updated;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
