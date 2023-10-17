import { Routes, Route, } from "react-router-dom";


import { LandingPage } from './pages/LandingPage/main';


function App() {
  return (
    <Routes>
    <Route path="/">
      <Route index element={<LandingPage />} />
      
    </Route>
  </Routes>
  )
}

export default App
