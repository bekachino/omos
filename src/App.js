import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import LeftMenu from "./components/LeftMenu/LeftMenu";

const App = () => {
  return (
    <div className='App'>
      <LeftMenu/>
      <Routes>
        <Route path='*' element={<Navigate to='/troubles' replace/>}/>
        <Route path='troubles' element={<></>}/>
      </Routes>
    </div>
  )
};

export default App;
