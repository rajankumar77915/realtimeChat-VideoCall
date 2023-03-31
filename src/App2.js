import React from 'react';
// import { createContext } from 'react';
import { BrowserRouter ,Link, Route, Routes } from 'react-router-dom';
import App from './App';
import App1 from './App1';
import Form from './form';
import Form2 from './form2';
import Form3 from './form3';
import Logout from './logout';
import SignIn from './signIn';
//const Login_user = React.createContext();
const App2 = () => {
    // const navigate = useNavigate();
    return (
        <>
         <BrowserRouter>
         {/* <Link to="/Logout">Logout</Link> */}
          <Routes>
            <Route path="/Logout" element={<Logout />} />
            <Route path="/app" element={<App />} />
            <Route path="/app1" element={<App1 />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/form" element={<Form />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/form3" element={<Form3 />} />
          </Routes>
        </BrowserRouter>
            
        </>
    )
}

export default App2;
// export { Login_user };
