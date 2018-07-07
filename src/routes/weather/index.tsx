import { Component, h, ComponentProps } from "preact";
import { fetchDailyForecast, Forecast } from '../../api/weather';
import * as style from "./style.css";
import Skycons from '../../skycons';

interface WeatherState {
    forecast: Forecast;
}

export default class Weather extends Component<ComponentProps, WeatherState> {
    componentDidMount() {
        this.fetchWeather();
    }
    componentDidUpdate() {
        let skycons = new Skycons({color: 'black'});
        skycons.add('icon', this.state.forecast.icon);
        this.state.forecast.hourly.forEach((data, i) => {
            skycons.add(`hourly-icon-${i}`, data.icon);
        })
        skycons.play();
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
                        {/* <h2>{forecast.city}</h2> */}
                        <h3>{forecast.headline}</h3>
                        <canvas id="icon" width="64" height="64" />
                        <h1>{forecast.currentTemperature.toFixed(0)}&deg;F</h1>
                        <div class={style.dayStats}>
                            <span>{forecast.day}</span>
                            <strong>{forecast.high.toFixed(0)}&deg;F</strong>
                            <strong>{forecast.low.toFixed(0)}&deg;F</strong>
                        </div>
                        <div class={style.hourly}>
                            {forecast.hourly.map((data, i) => 
                                <div>
                                    <div>{data.time.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</div>
                                    <canvas id={`hourly-icon-${i}`} width="24" height="24" />
                                    <h3>{data.temperature.toFixed(0)}&deg;F</h3>
                                </div>
                            )}
                        </div>
                    </div>
                }

            </div>
        );
    }
}
