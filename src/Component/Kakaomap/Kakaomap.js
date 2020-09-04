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

    //마커가 표시 될 위치
    const markerPosition = new kakao.maps.LatLng(
      37.458895, 126.653758
    );

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  return <div id="map" style={{ width: "100vw", height: "70vh" }}></div>;
}