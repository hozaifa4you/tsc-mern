import { useEffect } from "react";
import { load } from "webfontloader";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Footer, Header, Protect, Guest } from "./components";
import { Home, Login } from "./pages";

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
            <Route
               path="/login"
               element={
                  <Guest>
                     <Login />
                  </Guest>
               }
            />
         </Routes>
         <Footer />
      </>
   );
};

export default App;
