import { Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage/main';
import { LoginPage } from "./pages/loginPage/main";
import { CoursesPage } from "./pages/coursesPage/main";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
