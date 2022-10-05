const new_password = document.getElementById("new_password");
const re_new_password = document.getElementById("re-new_password");
const new_nickname = document.getElementById("new-nickname");
const save_data = document.getElementById("save_data");
const new_birth_year = document.getElementById("birth-box__year");
const new_birth_month = document.getElementById("birth-box__month");
const new_birth_day = document.getElementById("birth-box__day");

// new password checked
re_new_password.addEventListener("blur", () => {
  if (re_new_password.value != new_password.value) {
    console.log("불일치");
  } else {
    console.log("일치");
  }
});
// new password checked

// new nickname checked
new_nickname.addEventListener("blur", () => {
  const new_nick = {
    new_nick: new_nickname.value,
  };

  console.log(new_nick);
  console.log(JSON.stringify(new_nick));
  fetch("sts 그 어딘가...", {
    method: "POST",
    headers: { "Content-type": "application.json" },
    body: JSON.stringify(req),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("response : " + data + "TYPE : " + typeof data);
      if (Number(data) == 1) {
        alert("사용할 수 있는 닉네임입니다..");
      } else {
        alert("다시 확인하세요.");
      }
    });
});
// new nickname checked

// user info saved
save_data.addEventListener("click", () => {
  const req = {
    new_password: new_password.value,
    re_new_password: re_new_password.value,
    new_nickname: new_nickname.value,
    new_gender: document.querySelector('input[name="new-gender"]:checked')
      .value,
    new_birth:
      new_birth_year.value +
      "-" +
      new_birth_month.value +
      "-" +
      new_birth_day.value,
  };

  console.log(req);
  console.log(JSON.stringify(req));

  alert("회원정보가 수정되었습니다.");
  location.href = "./myInfo.html";
});
// user info saved

// select -> year
const birthYearEl = document.querySelector("#birth-box__year");
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
const birthMonthEl = document.querySelector("#birth-box__month");
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
const birthDayEl = document.querySelector("#birth-box__day");
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