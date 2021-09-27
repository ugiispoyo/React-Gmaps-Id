import React, { useEffect, useState } from "react";

function ReactMapsId({
  width,
  height,
  keyGoogle,
  defaultMap = "",
  zoom = 8,
  onDrag
}) {
  const [checkScript, setCheckScript] = useState(false);

  let myLat = { lat: -6.196309372048864, lng: 106.8804765624999 };
  let geocoder,
    marker,
    google,
    map,
    myOpt = {
      zoom: 8,
      center: myLat
    },
    address = "";

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
  }, [defaultMap]);

  const initMap = () => {
    defaultMap = address;
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
      onDrag(getLangLot.latLng.toJSON());
    });
  };

  let setDefault = (defaultAddress = undefined, defaultZoom = undefined) => {
    address = defaultAddress ? defaultAddress : "";
    myOpt = {
      ...myOpt,
      zoom: defaultZoom ? parseInt(defaultZoom) : 8
    };
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

          myOpt = {
            ...myOpt,
            center: results[0].geometry.location
          };

          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
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

          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
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

export default ReactMapsId;