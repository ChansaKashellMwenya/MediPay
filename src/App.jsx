import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPinPage from './pages/ForgotPinPage';
import WalletPage from './pages/WalletPage';
import InsurancePage from './pages/InsurancePage';
import MedicalLoansPage from './pages/MedicalLoansPage';
import TelemedicinePage from './pages/TelemedicinePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-pin" element={<ForgotPinPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div className="p-4">Welcome to your dashboard!</div>} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="insurance" element={<InsurancePage />} />
          <Route path="medical-loans" element={<MedicalLoansPage />} />
          <Route path="telemedicine" element={<TelemedicinePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;