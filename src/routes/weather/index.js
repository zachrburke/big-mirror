import { h, Component } from 'preact';
import style from './style';

const fetchWeather = () => {
	var apiKey = 'tTTPtHCg4ewmsUnd8tjN5HbPyhg4VGWq';

	fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/32512_PC?apikey=${apiKey}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
		});
}

class Weather extends Component {

	componentDidMount() {
		fetchWeather();
	}

	render() {
		return (
			<div class={style.weather}>
				<h1>Weather</h1>
				<p>This is the Weather component.</p>
			</div>
		);
	}
}

export default Weather;
