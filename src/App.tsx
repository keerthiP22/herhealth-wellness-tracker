import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AddEntry from "./pages/addEntry";
import History from "./pages/history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;