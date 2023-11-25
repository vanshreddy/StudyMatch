import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/main';
import { LoginPage } from "./pages/loginPage/main";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
