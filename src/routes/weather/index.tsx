import { Component, h, ComponentProps } from "preact";
import * as style from "./style.css";

interface Forecast {
    Temperature: {
        Maximum: {
            Value: string;
        }
    }
}

interface DailyForecast {
    DailyForecasts: [Forecast];
}

interface WeatherState {
    forecast: Forecast;
}

export default class Weather extends Component<ComponentProps, WeatherState> {

    componentDidMount() {
        this.fetchWeather();
    }

    fetchWeather() {
        var apiKey = 'tTTPtHCg4ewmsUnd8tjN5HbPyhg4VGWq';
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/32512_PC?apikey=${apiKey}`)
            .then(res => res.json())
            .then((data: DailyForecast) => {
                this.setState({
                    forecast: data.DailyForecasts[0],
                });
            });
    }

    public render() {
        return (
            <div class={style.home}>
                <h1>Weather</h1>
                <p>This is the Weather component.</p>
                {this.state.forecast && 
                    <p>
                        <strong>High:</strong>
                        <span>{this.state.forecast.Temperature.Maximum.Value}</span>
                    </p>
                }

            </div>
        );
    }
}
