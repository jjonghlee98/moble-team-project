// test
const data = [
  {
    documents: [
      {
        place_url: "http://place.map.kakao.com/287484837",
        place_name: "그레이츄",
        category_group_name: "카페",
        road_address_name: "충남 천안시 서북구 오성7길 42",
        category_name: "음식점 > 카페 > 테마카페 > 디저트카페",
        distance: "386",
        phone: "",
        category_group_code: "CE7",
        x: "127.13256939448158",
        y: "36.832239894673286",
        address_name: "충남 천안시 서북구 두정동 749",
        id: "287484837",
      },
    ],
  },
];

const h1 = document.querySelector("h1");

h1.innerText = data[0]["documents"][0]["place_name"];

const cafeInfo = data[0]["documents"];

let locPosition = new kakao.maps.LatLng(cafeInfo[0]["y"], cafeInfo[0]["x"]),
  message = cafeInfo[0]["place_name"];

displayMarker(locPosition, message);

// 반경 설정
const radiusButton = document.querySelectorAll("button");
var circle = new kakao.maps.Circle();

radiusButton.forEach((event) => {
  event.addEventListener("click", () => {
    radiusButton.forEach((e) => {
      e.classList.remove("active-color");
      circle.setMap(null);
    });
    event.classList.add("active-color");
    console.log(event.value);
    radius = Number(event.value);

    // 지도에 표시할 원을 생성합니다
    circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(cafeInfo[0]["y"], cafeInfo[0]["x"]), // 원의 중심좌표 입니다
      radius: radius, // 미터 단위의 원의 반지름입니다
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: "#FF5757", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      // fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillColor: "#FF5757", // 채우기 색깔입니다
      fillOpacity: 0.6, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(map);
  });
});
// 반경 설정
