export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
const url = "https://vtback.herokuapp.com/"
// 
//https://vtback.herokuapp.com/

export const api = {
    buyPost: url + "trade/buy",
    limitPost: url + "trade/limit",
    sellPost: url + "trade/sell",
    limitOrderGet: url + "trade/limit/",
    homeImage: "https://www.thebalance.com/thmb/rGYupd8oJE9RBXD2y7KM2X5vOLM=/5000x3400/filters:fill(auto,1)/technical-financial-graph-on-technology-abstract-background-926051128-5aa5794fae9ab80037388c0c.jpg",
    leaderboardGet: url + "trade/leaderboard",
    loginPost: url + "login",
    userGet: url + "user",
    registerPost: url + "register",
    logoutGet: url + "logout",
}