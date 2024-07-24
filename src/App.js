import { Navigate, Route, Routes } from "react-router-dom";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import Troubles from "./containers/Troubles/Troubles";
import moment from "moment/moment";
import 'moment/locale/ru';
import './App.css';

moment.locale('ru');

const App = () => {
  return (
    <div className='App'>
      <LeftMenu/>
      <Routes>
        <Route path='*' element={<Navigate to='/troubles' replace/>}/>
        <Route path='troubles' element={<Troubles/>}/>
      </Routes>
    </div>
  )
};

export default App;
