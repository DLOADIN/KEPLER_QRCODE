import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './components/auth/Login';
import QRScanner from './components/scanner/QRScanner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Toaster position="top-center" />
      {isAuthenticated ? <QRScanner /> : <Login onLogin={handleLogin} />}
    </>
  );
}

export default App;