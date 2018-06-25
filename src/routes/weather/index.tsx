import { Component, h, ComponentProps } from "preact";
import { fetchDailyForecast, Forecast } from '../../api/weather';
import * as style from "./style.css";

interface WeatherState {
    forecast: Forecast;
}

export default class Weather extends Component<ComponentProps, WeatherState> {
    componentDidMount() {
        this.fetchWeather();
    }
    fetchWeather() {
        fetchDailyForecast()
            .then((forecast: Forecast) => {
                this.setState({
                    forecast
                });
            })
    }
    public render() {
        let { forecast } = this.state;
        return (
            <div class={style.home}>
                {!forecast && <h1>Loading..</h1>}
                {forecast && 
                    <div>
                        <h2>{forecast.city}</h2>
                        <h1>{forecast.currentTemperature.value}&deg;{forecast.currentTemperature.unit}</h1>
                        <h2>{forecast.headline}</h2>
                        <div class={style.dayStats}>
                            <span>{forecast.day}</span>
                            <span>{forecast.high.value}&deg;{forecast.high.unit}</span>
                            <span>{forecast.low.value}&deg;{forecast.low.unit}</span>
                        </div>
                    </div>
                }

            </div>
        );
    }
}
