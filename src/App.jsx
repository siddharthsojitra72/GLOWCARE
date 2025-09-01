import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Home";
import Announcementbar from "../src/components/announcementbar";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import Contact from "./contact";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Account from "./Account.jsx";
import NotFound from "./NotFound";
import Faq from "./faq";
import ProductPage from "./productPage.jsx";
import Cartpage from "./Cartpage.jsx";
import BestSeller from "./BestSeller.jsx";
import AllProducts from "./AllProducts.jsx";
import NewArrivals from "./NewArrivals.jsx";
import SkincareKits from "./SkincareKits.jsx";
import OurStory from "./OurStory.jsx";
import Learn from "./Learn.jsx";

const App = () => {
  return (
    <Router>
      <Announcementbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/best-sellers" element={<BestSeller />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/skincare-kits" element={<SkincareKits />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
