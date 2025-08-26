import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Home";
import Announcementbar from "../src/components/announcementbar";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import Contact from "./contact";
import NotFound from "./NotFound";
import Faq from "./faq";
import ProductPage from "./productPage.jsx";
import Cartpage from "./Cartpage.jsx";
import BestSeller from "./BestSeller.jsx";

const App = () => {
  return (
    <Router>
      <Announcementbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/best-sellers" element={<BestSeller />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
