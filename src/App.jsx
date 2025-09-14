import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Header from './component/header/Header'
import Home from './component/home/Home'
import Order from './component/order/Order'

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
