/*global kakao */
import React, { useEffect } from "react";

export default function Kakaomap() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.458895, 126.653758),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    let ps = new kakao.maps.services.Places(map);   //장소 검색 객체 생성

    //키워드 검색 완료 시 호출되는 콜백함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i=0; i < data.length; i++) {
          placesSearchDisplayMarker(data[i]);
        }
      }
    }

    ps.categorySearch('BK9', placesSearchCB, {useMapBounds: true});   //카테고리로 은행을 검색

    //현재 내 위치를 마커로 표시해주는 함수
    const myPositionDisplayMarker = (locPosition, message) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      const iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);
      
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    //카테고리 검색 결과 장소들을 마커로 표시해주는 함수
    const placesSearchDisplayMarker = (place) => {
      // 마커를 클릭하면 장소명을 표출할 인포윈도우
      let infowindow = new kakao.maps.InfoWindow({zIndex:1});

      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      //마커에 클릭이벤트 등록
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      })
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
  };

  return <div id="map" style={{ width: "100vw", height: "70vh" }}></div>;
}