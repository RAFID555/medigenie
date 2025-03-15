
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Prescriptions from "@/pages/Prescriptions";
import Reminders from "@/pages/Reminders";
import Settings from "@/pages/Settings";
import Order from "@/pages/Order";
import HealthTracker from "@/pages/HealthTracker";
import AboutUs from "@/pages/AboutUs";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
          <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/health-tracker" element={<ProtectedRoute><HealthTracker /></ProtectedRoute>} />
          <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
