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
  const url = 'https://whispr-api.onrender.com';
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
           <Route exact path="/" element={<Login url={url} />}></Route>
            <Route exact path="/signup" element={<SignUp url={url} />}/>
            <Route exact path="/dashboard" element={<Dashboard url={url}/>}></Route>
        </Routes>
      </div>
     </BrowserRouter>
    </>
  );
}

export default App;
