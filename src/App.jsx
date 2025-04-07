import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CreateProduct from "./components/products/createProduct";
import ListProduct from "./components/products/listProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevos-productos" element={<CreateProduct />} />
        <Route path="/lista-productos" element={<ListProduct />} />
      </Routes>
    </Router>
  );
}

export default App;

