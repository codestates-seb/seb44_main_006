/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const markers = [];
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
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

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '100vw',
          height: '500px',
        }}
      />
      <div id="result-list">
        {places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination" />
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

const App = () => {
  return <LandingPage />;
};

export default App;
