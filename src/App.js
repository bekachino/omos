import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='*' element={<Navigate to='/troubles' replace/>}/>
        <Route path='troubles' element={<></>}/>
      </Routes>
    </div>
  )
};

export default App;
