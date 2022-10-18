const data = [
  {
    r_name: "마운틴피시텔 레스토랑",
    r_phone: "041-555-3612",
    r_lon: "127.148424",
    r_lat: "36.809057",
    r_do: "충남",
    r_si: "천안시",
    r_gu: "동남구",
    r_dong: "대흥동",
    r_cat: "인도음식",
    r_id: "13110298",
    r_url: "http://place.map.kakao.com/13110298",
    r_insert_time: null,
    r_update_time: null,
    c_name: "볼베어파크 천안점",
    c_phone: "",
    c_lon: "127.150594",
    c_lat: "36.807872",
    c_do: "충남",
    c_si: "천안시",
    c_gu: "동남구",
    c_dong: "문화동",
    c_cat: "키즈카페",
    c_id: "836565346",
    c_url: "http://place.map.kakao.com/836565346",
    c_insert_time: null,
    c_update_time: null,
    grade: 1,
    num: 13,
  },
  {
    r_name: "석산장숯불갈비",
    r_phone: "041-551-7230",
    r_lon: "127.151797",
    r_lat: "36.810311",
    r_do: "충남",
    r_si: "천안시",
    r_gu: "동남구",
    r_dong: "문화동",
    r_cat: "갈비",
    r_id: "10487761",
    r_url: "http://place.map.kakao.com/10487761",
    r_insert_time: null,
    r_update_time: null,
    c_name: "천안타운홀",
    c_phone: "",
    c_lon: "127.150602",
    c_lat: "36.807849",
    c_do: "충남",
    c_si: "천안시",
    c_gu: "동남구",
    c_dong: "문화동",
    c_cat: "카페",
    c_id: "1829503594",
    c_url: "http://place.map.kakao.com/1829503594",
    c_insert_time: null,
    c_update_time: null,
    grade: 2,
    num: 12,
  },
];

const first = document.getElementsByClassName("first");
const second = document.getElementsByClassName("second");
const myFavList = document.getElementsByClassName("my-fav-list");
const firstDescription = document.getElementsByClassName("first__description");
const secondDescription = document.getElementsByClassName(
  "second__description"
);
const items = document.getElementsByClassName("my-fav-list");

for (let i = 0; i < data.length; i++) {
  first[i].innerHTML = data[i].r_name;
  second[i].innerHTML = data[i].c_name;

  // 식당 주소
  let r_address =
    data[i].r_do +
    " " +
    data[i].r_si +
    " " +
    data[i].r_gu +
    " " +
    data[i].r_dong;

  // 카페 주소
  let c_address =
    data[i].c_do +
    " " +
    data[i].c_si +
    " " +
    data[i].c_gu +
    " " +
    data[i].c_dong;

  firstDescription[i].innerHTML = r_address;
  secondDescription[i].innerHTML = c_address;

  items[0].addEventListener("click", () => {
    // 지도이동
    let moveLatLon = new kakao.maps.LatLng(data[i].r_lat, data[i].r_lon);
    map.panTo(moveLatLon);

    var linePath = [
      new kakao.maps.LatLng(data[i].r_lat, data[i].r_lon),
      new kakao.maps.LatLng(data[i].c_lat, data[i].c_lon),
    ];

    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FF5757", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "shortdot", // 선의 스타일입니다
    });
    polyline.setMap(map);
  });
}
