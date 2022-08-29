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
import $ from "jquery";

export default function Search({
  setLocationName,
  setLatLng,
  setWeatherInfo,
  locationName,
}) {
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
      <SearchAddress
        setLocationName={setLocationName}
        setLatLng={setLatLng}
        setWeatherInfo={setWeatherInfo}
        locationName={locationName}
      />
    </li>
  );
}

function SearchAddress({
  setLocationName,
  setLatLng,
  setWeatherInfo,
  locationName,
}) {
  return (
    <PlacesAutocomplete
      setLocationName={setLocationName}
      setLatLng={setLatLng}
      setWeatherInfo={setWeatherInfo}
      locationName={locationName}
    />
  );
}

const PlacesAutocomplete = ({
  setLocationName,
  setLatLng,
  setWeatherInfo,
  locationName,
}) => {
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
    console.log(address);
    setLocationName(address);
    setLatLng(getLatLng(results[0]));
    getWeatherInfo({ locationName, setWeatherInfo });
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

function getWeatherInfo({ locationName, setWeatherInfo }) {
  if (locationName !== null || locationName !== undefined) {
    $.ajax({
      url: `https://api.weatherapi.com/v1/current.json?key=d6059cb8972940258c182934222908&q=${locationName}&aqi=no`,
      type: "GET",
      success: function (result) {
        setWeatherInfo(result.current);
        console.log(result.current);
      },
    });
  }
}
