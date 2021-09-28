import React, { useEffect, useState } from "react";

export default function ReactMapsId({
  width,
  height,
  keyGoogle,
  defaultMap = "",
  zoom = 8,
  onDrag
}) {
  let [myLat, setMyLat] = useState({
    lat: -6.196309372048864,
    lng: 106.8804765624999
  });
  const [checkScript, setCheckScript] = useState(false);
  let [myOpt, setOpt] = useState({
    zoom: parseInt(zoom),
    center: myLat
  });

  let geocoder, marker, google, map;

  useEffect(() => {
    let isSubbribe = true;

    if (isSubbribe && !checkScript) {
      const script = document.createElement("script");

      script.src = `https://maps.googleapis.com/maps/api/js?key=${keyGoogle}&callback=initMap&v=weekly`;
      script.async = true;
      document.body.appendChild(script);
      setCheckScript(true);
    }

    if (checkScript) {
      window.initMap = initMap;
      setDefault(defaultMap, zoom);
    }

    return () => {
      isSubbribe = false;
    };
  }, [checkScript]);

  const initMap = () => {
    google = window.google;

    if (defaultMap !== "") {
      geocode({ address: defaultMap });
    }

    map = new google.maps.Map(document.getElementById("map__"), myOpt);

    marker = new google.maps.Marker({
      map,
      draggable: true,
      position: myLat
    });

    marker?.addListener("dragend", (getLangLot) => {
      geocode({ location: getLangLot.latLng.toJSON() });
    });
  };

  useEffect(() => {
    if (checkScript) {
      google = window.google;
      geocode({ address: defaultMap });
      map = new google.maps.Map(document.getElementById("map__"), myOpt);

      marker = new google.maps.Marker({
        map,
        draggable: true,
        position: myLat
      });

      marker?.addListener("dragend", (getLangLot) => {
        geocode({ location: getLangLot.latLng.toJSON() });
      });
    }
  }, [defaultMap]);

  let setDefault = (defaultMap, zoom_) => {
    setOpt({ ...myOpt, zoom: zoom_ ? parseInt(zoom_) : 8 });
  };

  const clear = () => {
    if (defaultMap !== "") marker.setMap(null);
  };

  const geocode = (request) => {
    google = window.google;
    geocoder = new google.maps.Geocoder();
    if (defaultMap !== "") {
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;

          setOpt({
            ...myOpt,
            zoom: parseInt(zoom),
            center: results[0].geometry.location
          });
          setMyLat(results[0].geometry.location.toJSON());

          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);

          onDrag(results);
          return results;
        })
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
    } else {
      clear();
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          setOpt({
            ...myOpt,
            zoom: parseInt(zoom),
            center: results[0].geometry.location
          });
          setMyLat(results[0].geometry.location.toJSON());

          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
          onDrag(results);
          return results;
        })
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
    }
  };

  return (
    <>
      <div
        id={"map__"}
        style={{
          width: width ? width : "400px",
          height: height ? height : "230px"
        }}
      ></div>
    </>
  );
}
