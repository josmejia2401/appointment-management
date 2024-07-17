import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import { AuthProvider, RouteComponent } from './lib/context';

import SignInPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

import Error403Page from './pages/errors/403';
import Error404Page from './pages/errors/404';
import Error500Page from './pages/errors/500';

import CustomersViewPage from './pages/customers/view';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/auth/login" element={<RouteComponent children={SignInPage}></RouteComponent>} />
          <Route exact path="/auth/register" element={<RouteComponent children={RegisterPage}></RouteComponent>} />
          <Route exact path="/error/403" element={<RouteComponent children={Error403Page}></RouteComponent>} />
          <Route exact path="/error/404" element={<RouteComponent children={Error404Page}></RouteComponent>} />
          <Route exact path="/error/500" element={<RouteComponent children={Error500Page}></RouteComponent>} />
          <Route exact path="/customers/view" element={<RouteComponent children={CustomersViewPage}></RouteComponent>} />
          <Route path="*" element={<Navigate to={"/auth/login"} replace></Navigate>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


*/