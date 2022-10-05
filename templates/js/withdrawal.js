const wd_password = document.getElementById("wd_pw");
const wd_btn = document.getElementById("wd_btn");
var wd_select = document.getElementById("withdrawal_select");
var select_index =
  document.getElementById("withdrawal_select").options.selectedIndex;

wd_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const wd_pw = {
    wd_pw: wd_password.value,
  };
  // console.log([document.getElementById("withdrawal_select").selelctedIndex].text);

  //회원탈퇴 선택창 팝업
  var result = confirm("회원 탈퇴를 하시겠습니까?");
  if (result) {
    alert("탈퇴 처리되었습니다.");
    // location.href = "./main.html";
    console.log(wd_pw);
    console.log("탈퇴사유:" + wd_select.options[select_index].value);
    console.log(JSON.stringify(wd_pw));
    fetch("/myPage/myInfo/withdrawal", {
      method: "POST",
      headers: { "Content-type": "application.json" },
      body: JSON.stringify(wd_pw),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response : " + data + "TYPE : " + typeof data);
        if (Number(data) == 1) {
          alert("탈퇴하시겠습니까? ");
        } else {
          alert("다시 확인하세요.");
        }
      });
  } else {
    alert("탈퇴 취소되었습니다.");
  }
});
