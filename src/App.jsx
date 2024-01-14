import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
           <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </div>
     </BrowserRouter>
    </>
  );
}

export default App;
