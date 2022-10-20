// 반경 설정
const radiusButton = document.querySelectorAll("button");
// var circle = new kakao.maps.Circle();
//
// radiusButton.forEach((event) => {
//   event.addEventListener("click", () => {
//     radiusButton.forEach((e) => {
//       e.classList.remove("active-color");
//       circle.setMap(null);
//     });
//     event.classList.add("active-color");
//     console.log(event.value);
//     radius = Number(event.value);
//
//     // 지도에 표시할 원을 생성합니다
//     circle = new kakao.maps.Circle({
//       center: new kakao.maps.LatLng(cafeInfo[0]["y"], cafeInfo[0]["x"]), // 원의 중심좌표 입니다
//       radius: radius, // 미터 단위의 원의 반지름입니다
//       strokeWeight: 2, // 선의 두께입니다
//       strokeColor: "#FF5757", // 선의 색깔입니다
//       strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//       strokeStyle: "dashed", // 선의 스타일 입니다
//       // fillColor: "#CFE7FF", // 채우기 색깔입니다
//       fillColor: "#FF5757", // 채우기 색깔입니다
//       fillOpacity: 0.6, // 채우기 불투명도 입니다
//     });
//
//     // 지도에 원을 표시합니다
//     circle.setMap(map);
//   });
// });
// 반경 설정

// 마커 커스텀 인데여;;
var imageSrc = "../images/marker_img.png",
    imageSize = new kakao.maps.Size(64, 69),
    imageOption = { offset: new kakao.maps.Point(27, 69) };

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
// 마커 커스텀 인데여;;

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
    image: markerImage,
  });

  var content =
      '<div class="custom_content">' + "<span>" + message + "</span>" + "</div>";

  // 커스텀 오버레이가 표시될 위치입니다
  var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: locPosition,
    content: content,
    yAnchor: 1,
  });
  customOverlay.setMap(null);

  // 마커가 최상단에서만 마우스를 인식함,,,
  kakao.maps.event.addListener(marker, "click", () => {
    customOverlay.setMap(map);
  });

  kakao.maps.event.addListener(marker, "mouseout", () => {
    customOverlay.setMap(null);
  });

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}