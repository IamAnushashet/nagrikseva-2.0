import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import AccessibilitySettings from './pages/AccessibilitySettings.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AssistantPage from './pages/AssistantPage.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import ComplaintPortal from './pages/ComplaintPortal.jsx';
import DigiLockerPage from './pages/DigiLockerPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import TrackPage from './pages/TrackPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/complaints" element={<ComplaintPortal />} />
        <Route path="/digilocker" element={<DigiLockerPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/accessibility" element={<AccessibilitySettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
