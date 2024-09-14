// src/App.js
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Chat from './components/Chat/Chat'
import Reviews from './components/Reviews/Reviews';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {!isLoginPage && !isAdminPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/chat' element={<Chat></Chat>} />
          <Route path='/reviews' element={<Reviews></Reviews>}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;