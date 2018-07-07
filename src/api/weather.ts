export interface Forecast {
    city: string;
    headline: string;
    currentTemperature: number;
    high: number;
    low: number;
    day: string;
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
            return {
                city: "I don't know the city!",
                headline: data.currently.summary,
                currentTemperature: data.currently.temperature,
                high: 999.9,
                low: 999.9,
                day: dayMap[new Date().getDay()],
                icon: data.currently.icon,
            }
        });
}