/*global kakao */
import React, { useEffect, useState } from "react";
import './../../css/Kakaomap.css';

export default function Kakaomap(props) {
  const [ select, setSelect ] = useState({
    select: ''
  }); // useState 내부에 원래 state에 해당되는 데이터를 전달한다.

  useEffect(() => {
    console.log("useEffect 실행");
    mapscript();
  }, [props]);

  const mapscript = async () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.458895, 126.653758),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀 오버레이
    let placeOverlay = new kakao.maps.CustomOverlay({zIndex: 1}),
        contentNode = document.createElement('div'),    // 커스텀 오버레이 컨텐츠 엘리먼트
        markers = [],                                   // 마커를 담을 배열
        currCategory = '';                              // 현재 선택된 카테고리


    let ps = new kakao.maps.services.Places(map);   // 장소 검색 객체 생성

    kakao.maps.event.addListener(map, 'idle', searchPlaces);  // 지도에 idle 이벤트 등록

    contentNode.className = 'placeinfo_wrap';   // 커스텀 오버레이의 컨텐츠 노드에 css class 추가

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정
    placeOverlay.setContent(contentNode);

    // 각 카테고리에 클릭 이벤트를 등록
    addCategoryClickEvent();

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
          target.addEventListener(type, callback);
      } else {
          target.attachEvent('on' + type, callback);
      }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (props.selected.selected === '') {
          return;
      }
      
      // 커스텀 오버레이를 숨깁니다 
      placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      
      ps.categorySearch(props.selected.selected, placesSearchCB, {useMapBounds:true}); 
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

          // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
          displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

      } else if (status === kakao.maps.services.Status.ERROR) {
          // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
          
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {

      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      // var order = document.getElementById(props.selected.selected).getAttribute('data-order');

      for ( var i=0; i<places.length; i++ ) {

              // 마커를 생성하고 지도에 표시합니다
              var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x));

              // 마커와 검색결과 항목을 클릭 했을 때
              // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
              (function(marker, place) {
                  kakao.maps.event.addListener(marker, 'click', function() {
                      displayPlaceInfo(place);
                  });
              })(marker, places[i]);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(24, 35),  // 마커 이미지의 크기
          // imgOptions =  {
          //     spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          //     // spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          //     offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          // },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
              marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage 
          });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker);  // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo (place) {
      var content = '<div class="placeinfo">' +
                      '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

      if (place.road_address_name) {
          content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                      '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
      }  else {
          content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
      }                
    
      content += '    <span class="tel">' + place.phone + '</span>' + 
                  '</div>' + 
                  '<div class="after"></div>' + '<button id="goKakaomap">도착지 설정</button>' + '<button id="sendLink">링크 보내기</button>';

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
      let btnGo = document.getElementById('goKakaomap');
      let btnLink = document.getElementById('sendLink');
      btnGo.addEventListener('click', function() {
        document.location.href="https://map.kakao.com/link/to/" + place.id;
      });
      btnLink.addEventListener('click', function() {
        window.Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: place.place_name,
            description: place.road_address_name,
            imageUrl:
              'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
              mobileWebUrl: place.place_url,
              webUrl: place.place_url,
            },
          },
          social: {
            likeCount: 286,
            commentCount: 45,
            sharedCount: 845,
          },
          buttons: [
            {
              title: '웹으로 보기',
              link: {
                mobileWebUrl: place.place_url,
                webUrl: place.place_url,
              },
            },
            {
              title: '앱으로 보기',
              link: {
                mobileWebUrl: place.place_url,
                webUrl: place.place_url,
              },
            },
          ],
        })
      })
    }


    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
      console.log(document.getElementById('category'));
      var category = document.getElementById('category'),
          children = category.children;

      for (var i=0; i<children.length; i++) {
          children[i].onclick = onClickCategory;
      }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
      var id = this.id,
          className = this.className;

      placeOverlay.setMap(null);

      if (className === 'on') {
          currCategory = '';
          removeMarker();
      } else {
          currCategory = id;
          searchPlaces();
      }
    }

    //현재 내 위치를 마커로 표시해주는 함수
    const myPositionDisplayMarker = (locPosition, message) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

      // 인포윈도우를 생성
      const infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시
      infowindow.open(map, marker);
      
      // 지도 중심좌표를 접속위치로 변경
      map.setCenter(locPosition);
    }

    if (navigator.geolocation) {
    
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
      const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
          
      const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">Here is your position.</div>'; // 인포윈도우에 표시될 내용입니다
          
      // 마커와 인포윈도우를 표시합니다
      myPositionDisplayMarker(locPosition, message);
              
      });
      
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
            message = 'Can not use User Position'
          
      myPositionDisplayMarker(locPosition, message);
    }
  };    //mapscript 함수 종료지점

  return (
    <div className="mapWrapper">
      <div id="map" style={{ width: "80vw", height: "74vh" }}></div>
    </div>
  );
}