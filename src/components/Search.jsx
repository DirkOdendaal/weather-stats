import "../css/Search.css";
import React from "react";
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

export default function Search({ setLocationName, setLatLng, isLoaded }) {
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
    setLocationName(address);
    setLatLng(getLatLng(results[0]));
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
