import './App.css';
import HomePage from './Pages/HomePage';
import MarketPlace from './Pages/MarketPlace';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import CoinPage from './Pages/CoinPage';
import { BrowserRouter, Route } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import LeaderBoard from './Pages/LeaderBoard';
import ProfilePage from './Pages/ProfilePage';


function App() {
  return (
    <BrowserRouter>
      <div className='bg-dark ' style={{ minHeight: '100vh' }} >
        <Route path="/" component={HomePage} exact />
        <Route path="/marketplace/" component={MarketPlace} exact />
        <Route path="/coin/:CoinName" component={CoinPage} />
        <Route path="/register/" component={RegisterPage} exact />
        <Route path="/login/" component={LoginPage} exact />
        <Route path="/leaderboard/" component={LeaderBoard} exact />
        <Route path="/profile/" component={ProfilePage} exact />
        {/* <Route path="/coins/:id" component={CoinPage} exact /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
