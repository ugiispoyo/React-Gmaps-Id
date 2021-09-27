# React Gmaps Id 

=== How To Use ===
```
npm install react-gmaps-id
```
=== Example Code ===
```
import ReactGmapsId from "react-gmaps-id";

export default function App() {
  const onDrag = (val) => {
    console.log(val);
  };

  return (
    <ReactGmapsId
      height="200px"
      width="200px"
      zoom="10"
      defaultMap="Dapur Rumaisha"
      onDrag={onDrag}
      keyGoogle="GOOGLE_KEY"
    />
  );
}

```
