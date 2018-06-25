export interface Temperature {
    value: string;
    unit: string;
}

export interface Forecast {
    city: string;
    headline: string;
    currentTemperature: Temperature;
    high: Temperature;
    low: Temperature;
    day: string;
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
    var apiKey = 'tTTPtHCg4ewmsUnd8tjN5HbPyhg4VGWq';
        return fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/32512_PC?apikey=${apiKey}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                var temperature = data.DailyForecasts[0].Temperature;
                return {
                    city: "I don't know the city!",
                    headline: data.Headline.Text,
                    currentTemperature: { 
                        value: "I don't know the current temp!",
                        unit: 'F'
                    },
                    high: {
                        value: temperature.Maximum.Value,
                        unit: temperature.Maximum.Unit
                    },
                    low: {
                        value: temperature.Minimum.Value,
                        unit: temperature.Minimum.Unit
                    },
                    day: dayMap[new Date().getDay()],
                }
            });
}