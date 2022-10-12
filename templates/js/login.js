const loginId = document.getElementById("loginid");
const loginPw = document.getElementById("loginpw");
const loginBtn = document.getElementById("loginbtn");

// 로그인 버튼 클릭시
// window.onload = () => {
//   const el = document.getElementById("loginBtn");
//   el.onclick = loginBtn;
//   ``;
// };

//로그인 버튼 클릭시
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const req = {
    u_id: loginId.value,
    u_pw: loginPw.value,
  };

  console.log(req);
  console.log(JSON.stringify(req));

  if (loginId.value == "") {
    alert("아이디를 입력해주세요");
  } else if (loginPw.value == "") {
    alert("비밀번호를 입력해주세요");
  } else {
    alert("로그인되었습니다.");
    console.log("로그인 성공");

    fetch("192.168.0.107/login/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then((response) => response.json())
      .then((data) => {
        //fetch 이후 작동할 코드
        console.log("response: " + data + "TYPE: " + typeof data);
        console.log(data);
        if (data.msg == "SUCCESS") {
          // form.submit();
          alert("'${response.u_id}'님 환영합니다");
          // location.href = "./main.html";
        } else {
          alert("아이디와 비밀번호를 확인해주세요.");
        }
      });
  }
});
