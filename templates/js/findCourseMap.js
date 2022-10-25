//지도 불러오기

//마커를 담을 배열
var markers = [];
let customoverlays = [];

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

//현재 위치 가져오기
function locationLoadSuccess(pos) {
  // 현재 위치 받아오기
  var currentPos = new kakao.maps.LatLng(
    pos.coords.latitude,
    pos.coords.longitude
  );

  // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
  map.panTo(currentPos);

  // 마커를 생성하고 지도에 표시합니다
  var placePosition = new kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    ),
    marker = addMarker(placePosition, null); // 검색 결과 항목 Element를 생성합니다

  // 기존에 마커가 있다면 제거
  marker.setMap(null);

  // 이상하게 뜨는 건 여전함
  // marker.setMap(map);

  // 내위치 기준으로 선택했을 경우의 레스토랑, 카페 검색 이벤트 시작
  let resButton = document.getElementsByClassName("res-button");
  let cafeButton = document.getElementsByClassName("cafe-button");

  // 레스토랑 검색
  for (let i = 0; i < resButton.length; i++) {
    resButton[i].addEventListener("click", () => {
      marker.setMap(null);
      var places = new kakao.maps.services.Places();

      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);

          if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(result);
          }
        }
      };
      places.categorySearch("FD6", callback, {
        // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
        location: new kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        ),
        radius: resButton[i].value,
      });
    });
  }
  // 카페 검색
  for (let i = 0; i < cafeButton.length; i++) {
    cafeButton[i].addEventListener("click", () => {
      marker.setMap(null);
      var places = new kakao.maps.services.Places();

      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);

          if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(result);
          }
        }
      };
      places.categorySearch("CE7", callback, {
        // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
        location: new kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        ),
        radius: cafeButton[i].value,
      });
    });
  }
  // 내위치 기준으로 선택했을 경우의 레스토랑, 카페 검색 이벤트 끝
}

function locationLoadError(pos) {
  alert("위치 정보를 가져오는데 실패했습니다.");
}

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn() {
  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  navigator.geolocation.getCurrentPosition(
    locationLoadSuccess,
    locationLoadError
  );
}
// 현재위치 가져오기 끝

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
  var keyword = document.getElementById("find-course__searchbar").value;

  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    // alert("키워드를 입력해주세요!");
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    // 잠깐 숨어있어 형이 너 때문에 눈물이 난다.
    // displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }

  // 아이템을 클릭했을 때 y, x 좌표가 뜬다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let items = document.getElementsByClassName("item");
  for (let i = 0; i < data.length; i++) {
    items[i].addEventListener("click", () => {
      console.log(data[i].place_name);
      console.log(data[i].road_address_name);
      console.log(data[i].address_name);
      console.log(data[i].y + ", " + data[i].x);

      // 마커
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementsByClassName("find-course-list__container"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, data[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);
      map.panTo(placePosition);

      let resButton = document.getElementsByClassName("res-button");
      let cafeButton = document.getElementsByClassName("cafe-button");
      // 레스토랑 검색
      for (let j = 0; j < resButton.length; j++) {
        resButton[j].addEventListener("click", () => {
          console.log(data[i].y + ", " + data[i].x);
          var places = new kakao.maps.services.Places();

          var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              console.log(result);

              if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(result);
              }
            }
          };
          places.categorySearch("FD6", callback, {
            // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
            location: new kakao.maps.LatLng(data[i].y, data[i].x),
            radius: resButton[j].value,
          });
        });
      }
      // 카페 검색
      for (let k = 0; k < cafeButton.length; k++) {
        cafeButton[k].addEventListener("click", () => {
          console.log(data[i].y + ", " + data[i].x);
          var places = new kakao.maps.services.Places();

          var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              console.log(result);

              if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(result);
              }
            }
          };
          places.categorySearch("CE7", callback, {
            // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
            location: new kakao.maps.LatLng(data[i].y, data[i].x),
            radius: cafeButton[k].value,
          });
        });
      }
    });
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  var listEl = document.getElementById("placesList"),
    menuEl = document.getElementsByClassName("find-course-list__container"),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = "";

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title) {
      let message = title;
      let first = places[i].y;
      let second = places[i].x;
      let markerPosition = new kakao.maps.LatLng(first, second);
      let roadAddress = places[i].road_address_name;
      let address = places[i].address_name;
      var content =
        '<div class="custom_content">' +
        '<div class="place_name">' +
        "<span>" +
        message +
        "</span>" +
        "</div>" +
        "<div class='address_name'>" +
        "<span>" +
        roadAddress +
        "</span>" +
        ", " +
        "<span>" +
        address +
        "</span>" +
        "</div>" +
        "</div>";

      // // 커스텀 오버레이가 표시될 위치입니다
      function customOverlayee() {
        var customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          position: markerPosition,
          content: content,
          yAnchor: 1,
        });
        customOverlay.setMap(map);
        customoverlays.push(customOverlay);
      }

      function removeCustomOverlayee() {
        for (let i = 0; i < customoverlays.length; i++) {
          customoverlays[i].setMap(null);
        }
        customoverlays = [];
      }

      kakao.maps.event.addListener(marker, "click", function () {
        // customOverlay.setMap(map);
        customOverlayee();
      });

      kakao.maps.event.addListener(map, "click", function () {
        // customOverlay.setMap(null);
        removeCustomOverlayee();
      });

      itemEl.onclick = function () {
        // displayInfowindow(marker, title);
        removeCustomOverlayee();
        customOverlayee();
        // customOverlay.setMap(map);
        // 지도 중심을 이동 시킵니다
        map.panTo(markerPosition);
      };
    })(marker, places[i].place_name);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement("li"),
    itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      "   <h5 id='title'>" +
      places.place_name +
      "</h5>";

  if (places.road_address_name) {
    itemStr +=
      "    <span class='road_address'>" +
      places.road_address_name +
      "</span>" +
      " / " +
      '   <span class="jibun gray">' +
      places.address_name +
      "</span>";
  } else {
    itemStr += "    <span>" + places.address_name + "</span>";
  }

  itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc = "../images/marker_img.png",
    imageSize = new kakao.maps.Size(52, 57),
    imageOption = { offset: new kakao.maps.Point(27, 69) };

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

  return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px; z-index:1;">' + title + "</div>";

  infowindow.setContent(content);
  infowindow.open(map, marker);
  // const moveLatLon = new window.kakao.maps.LatLng(places[i].y, places[i].x);
  // map.panTo(moveLatLon); //지도를 부드럽게 이동
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
