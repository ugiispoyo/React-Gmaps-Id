# React Gmaps Id 

=== How To Use ===
```
npm install react-gmaps-id
```
=== Example Code ===
```
import ReactGmapsId from "react-gmaps-id";

export default function App() {

  /* Get Data After Drag Marker */
  const onDrag = (val) => {
    console.log(val); // Get all data
    console.log(val[0].geometry.location.toJSON()); // Get LatLng 
  };

  return (
    <ReactGmapsId
      name="test" // Unique key of ReactGmapsId
      height="200px" // Height layout of maps
      width="200px" // Width layout of maps
      zoom="10" // Zoom maps
      defaultMap="Dapur Rumaisha" // Set default center of maps
      onDrag={onDrag} // Callback function Drag marker
      onError={(e) => {console.log(e)}} // Callback error function
      keyGoogle="GOOGLE_KEY" // Google key
    />
  );
}
```
<hr/>
<a href="https://codesandbox.io/s/clever-carlos-zp8sx" target="_blank">
Codesanbox
</a>
