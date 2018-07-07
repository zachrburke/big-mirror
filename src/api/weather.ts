export interface Forecast {
    city: string;
    headline: string;
    currentTemperature: number;
    high: number;
    low: number;
    day: string;
    icon: string;
    hourly: [HourlyForecast];
}

export interface HourlyForecast {
    temperature: number;
    time: Date;
    icon: string;
}


const dayMap = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const fetchDailyForecast = () => {
    return fetch(`/forecast`)
        .then(res => res.json())
        .then((data): Forecast => {
            console.log(data);
            let todaysForecast = data.daily.data[0];
            return {
                city: "I don't know the city!",
                headline: data.currently.summary,
                currentTemperature: data.currently.temperature,
                high: todaysForecast.temperatureHigh,
                low: todaysForecast.temperatureLow,
                day: dayMap[new Date().getDay()],
                icon: data.currently.icon,
                hourly: data.hourly.data.map((forecast: any) => ({
                    temperature: forecast.temperature,
                    time: new Date(forecast.time * 1000),
                    icon: forecast.icon,
                })),
            };
        });
}