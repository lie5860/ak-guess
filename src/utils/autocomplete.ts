import {MAIN_KEY} from "../const";

export const filterDataByInputVal = (val: string, chartList: Character[], aliasData: Alias[]) => {
  let inputVal = val.toUpperCase().trim()
  // 平假名转换成片假名去匹配结果
  inputVal = inputVal.replace(/[\u3041-\u3096]/g, function (match) {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
  const dealModal = [] as string[]
  aliasData.forEach(v => {
    new RegExp(`^(${v.regexp})$`).exec(inputVal) && (dealModal.push(...v.values))
  })
  const nameMatchItems = [];
  const aliasMatchItems = [];
  for (let i = 0; i < chartList.length; i++) {
    // 英文首字母的判断 todo 是否必要？
    const chartName = chartList[i]?.[MAIN_KEY];
    if (chartName.split(' ').map(v => !!v ? v[0] : '').join('').toUpperCase().startsWith(inputVal)) {
      nameMatchItems.push(chartList[i])
    } else if (chartName.toUpperCase().indexOf(inputVal) !== -1) {
      nameMatchItems.push(chartList[i])
    } else if (chartList[i].en.toUpperCase().startsWith(inputVal)) {
      nameMatchItems.push(chartList[i])
    } else if (dealModal.some(v => chartName.toUpperCase() === v.toUpperCase())) {
      aliasMatchItems.push(chartList[i])
    }
  }
  return [...nameMatchItems, ...aliasMatchItems]
}
export default function autocomplete(inp: Element, arr: string[], chartsData: Character[], aliasData: Alias[]) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus: number;
  const inputCb = function () {
    let a, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    const inputVal = val.toUpperCase().trim()
    if (!inputVal) {
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
    const data = filterDataByInputVal(inputVal, chartsData, aliasData).map((v) => {
      let b;
      /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      /*make the matching letters bold:*/
      b.innerHTML = v?.[MAIN_KEY];
      /*insert a input field that will hold the current array item's value:*/
      const value = v?.[MAIN_KEY].toString().replace(/'/g, "&#39;")
      b.innerHTML += "<input type='hidden' value='" + value + "'>";
      /*execute a function when someone clicks on the item value (DIV element):*/
      b.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        inp.value = this.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        closeAllLists();
      });
      return b;
    })
    a.append(...data);
    // [...nameMatchItems,...aliasMatchItems].forEach(v=>a.appendChild(v));
  }
  const keydownCb = function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
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
  }
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", inputCb);
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", keydownCb);

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  const clickCb = function (e) {
    closeAllLists(e.target);
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", clickCb);
  return function () {
    inp.removeEventListener("input", inputCb);
    inp.removeEventListener("keydown", keydownCb);
    document.removeEventListener("click", clickCb);
  }
}


