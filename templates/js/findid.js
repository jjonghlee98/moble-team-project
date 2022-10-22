const findIdNick = document.getElementById("findId-nick")
const birthYear = document.getElementById("birth-year");
const birthMonth = document.getElementById("birth-month");
const birthDay = document.getElementById("birth-day");
const findIdBtn = document.getElementById("findId__button")


findIdBtn.addEventListener("click", () => {
  
  const req = {
    u_nick: findIdNick.value,
    birth: birthYear.value + "-" + birthMonth.value + "-" + birthDay.value,
  };
  const arrReq = [];
  arrReq.push(req);

  console.log(arrReq);
  console.log(JSON.stringify(arrReq));
  fetch("/login/findMyId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arrReq),
  })
    .then((response) => response.json())
    .then((findIddata) => {
      //서버에서 u_id 보내줌
    });

})

// select -> year
const birthYearEl = document.querySelector("#birth-year");
isYearOptionExisted = false;
birthYearEl.addEventListener("focus", () => {
  if (!isYearOptionExisted) {
    isYearOptionExisted = true;
    for (let i = 1940; i <= 2022; i++) {
      const YearOption = document.createElement("option");
      YearOption.setAttribute("value", i);
      YearOption.innerText = i;
      birthYearEl.appendChild(YearOption);
    }
  }
});

// select -> month
const birthMonthEl = document.querySelector("#birth-month");
isMonthOptionExisted = false;
birthMonthEl.addEventListener("focus", () => {
  if (!isMonthOptionExisted) {
    isMonthOptionExisted = true;
    for (let i = 1; i <= 12; i++) {
      const MonthOption = document.createElement("option");
      if (i < 10) {
        MonthOption.setAttribute("value", "0" + i);
      } else {
        MonthOption.setAttribute("value", i);
      }
      MonthOption.innerText = i;
      birthMonthEl.appendChild(MonthOption);
    }
  }
});

// select -> day
const birthDayEl = document.querySelector("#birth-day");
isDayOptionExisted = false;
birthDayEl.addEventListener("focus", () => {
  if (!isDayOptionExisted) {
    isDayOptionExisted = true;
    for (let i = 1; i <= 31; i++) {
      const DayOption = document.createElement("option");
      if (i < 10) {
        DayOption.setAttribute("value", "0" + i);
      } else {
        DayOption.setAttribute("value", i);
      }
      DayOption.innerText = i;
      birthDayEl.appendChild(DayOption);
    }
  }
});
