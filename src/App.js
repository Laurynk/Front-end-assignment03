import "./styles.css";
import data from "./data/countries.json";
import Country from "./components/Country";
import { useState } from "react";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function filter(list, option) {
  if (option === "all") {
    return list;
  } else {
    return list.filter(function (item) {
      return item.continent.toLowerCase() === option.toLowerCase();
    });
  }
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const countries = data.countries;
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOption(e.target.value);
    // alert(sortOption);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries(e) {
    let func;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else {
      func = descCompare;
    }
    return sort(countries.slice(), func);
  }

  const sortedCountries = sortCountries();
  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <h1>World's Largest Countries By Population</h1>
      <div className="filters">
        <label>
          sort by:
          <select onChange={handleSort}>
            <option value="aplha">Alphabetically</option>
            <option value="<">Population asc</option>
            <option value=">">Population desc</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select onChange={handleFilter} value={filterOption}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>

            <optgroup label="By Population Size">
              <option value="1">Less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B of more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
