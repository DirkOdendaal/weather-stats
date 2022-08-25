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
import updateMapLocation from "../js/Map";

export default function Search() {
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
      <SearchAddress />
    </li>
  );
}

function SearchAddress() {
  const [selected, setSelected] = useState(null);

  return <PlacesAutocomplete setSelected={setSelected} />;
}

const PlacesAutocomplete = ({ setSelected }) => {
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
    console.log(results);
    const { lat, lng } = await getLatLng(results[0]);
    // setSelected({ lat, lng });
    updateMapLocation(lat, lng);
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
