export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const api = {
    //https://vtback.herokuapp.com/
    buyPost: "http://localhost:5000/trade/buy",
    limitPost: "http://localhost:5000/trade/limit",
    sellPost: "http://localhost:5000/trade/sell",
    limitOrderGet: "http://localhost:5000/trade/limit/",
    homeImage: "https://www.thebalance.com/thmb/rGYupd8oJE9RBXD2y7KM2X5vOLM=/5000x3400/filters:fill(auto,1)/technical-financial-graph-on-technology-abstract-background-926051128-5aa5794fae9ab80037388c0c.jpg",
    leaderboardGet: "http://localhost:5000/trade/leaderboard",
    loginPost: "http://localhost:5000/login",
    userGet: "http://localhost:5000/user",
    registerPost: "http://localhost:5000/register",
    logoutGet: "http://localhost:5000/logout",
}