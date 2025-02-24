import { useState } from "react";
import './App.css';
import Error from './error/error.js';
import Login from './login/login.js'
import NavBar from './navbar/NavBar.js';
import LogicManager from "./businesslogic/LogicManager.js";
import MainPage from "./mainpage/main.js";
import SettingPage from "./settings/settingpage.js";


function App() {
  const [news, setNews] = useState([]);
  const [view, setView] = useState('login');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalView, setModalView] = useState('');

  const refreshError = (option) => {    
    if (option === 1) {
      const newError = LogicManager.getInstance().getExceptionManager().getMessage();
      
      if (newError.length > 0){
        
        setNews(prev => [...prev, newError]);
        setTimeout(() => {refreshError(-1)}, 3000);
      }
    }
    else if (option === -1) {
      setNews(prev => prev.slice(1));
    }
    else{}
  };

  return (
    <div className="App">
      <header>
        <NavBar setNews={(err) => refreshError(err)} setView={(view) => setView(view)}/>
      </header>
      {(news && news.length > 0) && <Error message={news} setError={(err) => refreshError(err)}/>}
      {view === 'login' && <Login setView={(view) => setView(view)} setError={(err) => refreshError(err)}/>}
      {view === 'mainpage' && <MainPage />}
      {view === 'settings' && <SettingPage refreshError={(err) => refreshError(err)}/>}
    </div>
  );
}

export default App;
