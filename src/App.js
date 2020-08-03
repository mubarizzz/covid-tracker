import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
	const [ countries, setCountries ] = useState([]);
	const [ country, setCountry ] = useState('worldwide');

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json()).then((data) => {
				const countries = data.map((country) => ({
					name: country.country,
					value: country.countryInfo.iso2
				}));
				setCountries(countries);
			});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>

					<FormControl className="app__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={country}>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => <MenuItem value={country.value}>{country.name}</MenuItem>)}
						</Select>
					</FormControl>
				</div>

				{/* Header */}
				{/* Title + Select input dropdown */}

				{/* infoboxer * 3 */}
				<div className="app__stats">
					<InfoBox title="Recent" cases={222} total={2432} />
					<InfoBox title="Recent" cases={222} total={2432} />
					<InfoBox title="Recent" cases={222} total={2432} />
				</div>

				{/* Map */}
				<Map />
			</div>
			<Card className="app__right">
				<CardContent>
					<h3>Live Cases BY Country</h3>
					<h3>World Wide New Cases</h3>
				</CardContent>
				{/* Table */}
				{/* Graph */}
			</Card>
		</div>
	);
}

export default App;
