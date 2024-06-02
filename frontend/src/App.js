import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
