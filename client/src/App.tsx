import { useEffect } from "react";
import { load } from "webfontloader";
import { Routes, Route } from "react-router-dom";

// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Footer, Header } from "./components";
import { Home } from "./pages";

const App = () => {
   useEffect(() => {
      load({
         google: {
            families: ["Poppins", "Josefin Sans", "Josefin Slab", "Roboto"],
         },
      });
   }, []);

   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
         <Footer />
      </>
   );
};

export default App;
