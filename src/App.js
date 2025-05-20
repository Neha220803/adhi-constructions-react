import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./404/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
