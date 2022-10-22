const items = document.getElementsByClassName("my-fav-list");
const cafeRoadAddress = document.getElementsByClassName("road_address");
const cafeAddress = document.getElementsByClassName("address");
const phoneNum = document.getElementsByClassName("phone");

//마커를 담을 배열
let markers = [];
let polylines = [];

//페이지 접속하자마자 실행할 수 있도록 DOMContentLoaded 이벤트 생성
window.addEventListener("DOMContentLoaded", () => {

  console.log('바로실행');

  // 미완
  const req = { u_id: "로그인할 때 세션에 저장되어지는 u_id값" };
  const arrReq = [];
  arrReq.push(req);

  console.log(req);
  console.log(JSON.stringify(req));

  fetch("/myCourse/myCourseSite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arrReq),
  })
    .then((response) => response.json())
    .then((myFavoriteData) => {
      console.log("response : " + myFavoriteData);

      addItems(myFavoriteData);
    });

})

// 지도에 표시할 선을 생성합니다
function addPolyline(firstPosition, secondPosition, idx) {
  linePath = [firstPosition, secondPosition];

  let polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FF5757", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });
  polyline.setMap(map);
  polylines.push(polyline);

  return polyline;
}

function removePolyline() {
  for (let i = 0; i < polylines.length; i++) {
    polylines[i].setMap(null);
  }
  markers = [];
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc = "../images/marker_img.png",
    imageSize = new kakao.maps.Size(52, 57),
    imageOption = { offset: new kakao.maps.Point(25, 55) };

  var markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  marker = new kakao.maps.Marker({
    position: position, // 마커의 위치
    image: markerImage,
  });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  map.panTo(position);
  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function addItems(dateInfo) {
  for (let i = 0; i < dateInfo.length; i++) {
    // 끼야아아아악 힘들어 죽는줄~~~~~~~~~~~~~~~
    let r_address =
      dateInfo[i].r_do +
      " " +
      dateInfo[i].r_si +
      " " +
      dateInfo[i].r_gu +
      " " +
      dateInfo[i].r_dong;

    let c_address =
      dateInfo[i].c_do +
      " " +
      dateInfo[i].c_si +
      " " +
      dateInfo[i].c_gu +
      " " +
      dateInfo[i].c_dong;

    let choiceEl = document.createElement("div"),
      itemStr =
        "<div>" +
        "<div class='my-fav-list__description'>" +
        "<h5 class='first'>" +
        dateInfo[i].r_name +
        "</h5>" +
        "<div class='first__item'>" +
        "<span class='first__description'>" +
        r_address +
        "</span>";

    if (dateInfo[i].r_phone) {
      itemStr += "<span class='tel'>" + dateInfo[i].r_phone + "</span>";
    }
    itemStr +=
      "</div>" +
      "</div>" +
      "</div>" +
      "<div>" +
      "<div class='my-fav-list__description'>" +
      "<h5 class='second'>" +
      dateInfo[i].c_name +
      "</h5>" +
      "<div class='second__item'>" +
      "<span class='second__description'>" +
      c_address +
      "</span>";

    if (dateInfo[i].c_phone) {
      "<span class='tel'>" + dateInfo[i].c_phone + "</span>";
    }

    itemStr += "</div>" + "</div>" + "</div>";

    choiceEl.innerHTML = itemStr;
    choiceEl.className = "my-fav-list";

    const area = document.getElementById("items");
    area.appendChild(choiceEl);
    // 아이템 띄우기 끝

    // 아이템 클릭 이벤트 시작
    const favList = document.getElementsByClassName("my-fav-list");
    favList[i].addEventListener("click", () => {
      removeMarker();
      removePolyline();
      // 레스트랑 마커 시작
      console.log("레스토랑: " + dateInfo[i].r_lat + ", " + dateInfo[i].r_lon);
      let firstPosition = new kakao.maps.LatLng(
        dateInfo[i]["r_lat"],
        dateInfo[i]["r_lon"]
      ),
        firstMessage = dateInfo[i]["r_name"];

      console.log(firstPosition, firstMessage);
      addMarker(firstPosition, i);
      // displayMarker(firstPosition, firstMessage);
      // 레스트랑 마커 끝

      // 카페 마커 시작
      console.log("카페: " + dateInfo[i].c_lat + ", " + dateInfo[i].c_lon);
      let secondPosition = new kakao.maps.LatLng(
        dateInfo[i]["c_lat"],
        dateInfo[i]["c_lon"]
      ),
        secondMessage = dateInfo[i]["c_name"];

      console.log(secondPosition, secondMessage);
      addMarker(secondPosition, i);
      // displayMarker(secondPosition, secondMessage);
      // 카페 마커 끝
      console.log("first: " + firstPosition + ", second: " + secondPosition);

      // 식당, 카페 폴리라인 연결
      addPolyline(firstPosition, secondPosition, i);
    });
    // 아이템 클릭 이벤트 끝
  }
}