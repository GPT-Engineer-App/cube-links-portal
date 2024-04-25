import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/qa" element={<Index department="QA" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/shared/:id" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
