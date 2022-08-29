import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import "../css/Search.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Search({ setLocationName, setLatLng }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCPrLDWy7O8v0kS-r0y01REB1H10l332gQ",
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <li>
        <div>Loading...</div>
      </li>
    );

  return (
    <li>
      <SearchAddress setLocationName={setLocationName} setLatLng={setLatLng} />
    </li>
  );
}

function SearchAddress({ setLocationName, setLatLng }) {
  return (
    <PlacesAutocomplete
      setLocationName={setLocationName}
      setLatLng={setLatLng}
    />
  );
}

const PlacesAutocomplete = ({ setLocationName, setLatLng }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    // const { lat, lng } = await getLatLng(results[0]);
    setLocationName(address);
    setLatLng(await getLatLng(results[0]));
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search Address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className="list-items"
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
