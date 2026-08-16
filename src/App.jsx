import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import AddTransaction from "./pages/AddTransaction";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <div className="bg-flow-aurora" aria-hidden="true" />
          <div className="bg-flow" aria-hidden="true" />
          <div className="ambient-blob blob-1" aria-hidden="true" />
          <div className="ambient-blob blob-2" aria-hidden="true" />
          <div className="ambient-blob blob-3" aria-hidden="true" />

          <AppNavbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/add" element={<AddTransaction />} />

            {/* Main Transaction Details page */}
            <Route path="/transaction" element={<TransactionDetail />} />

            {/* Individual Transaction Details page */}
            <Route
              path="/transaction/:id"
              element={<TransactionDetail />}
            />

            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
