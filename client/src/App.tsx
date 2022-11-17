import { useEffect } from "react";
import { load } from "webfontloader";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Footer, Header, Guest } from "./components";
import { Home, Login, Contact, Peoples, Projects } from "./pages";
import Test from "./pages/Test";
import { MenuUrls } from "./utils/urls";

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
            <Route path={MenuUrls.Home} element={<Home />} />
            <Route
               path={MenuUrls.Login}
               element={
                  <Guest>
                     <Login />
                  </Guest>
               }
            />
            <Route path={MenuUrls.Projects} element={<Projects />} />
            <Route path={MenuUrls.Peoples} element={<Peoples />} />
            <Route path={MenuUrls.Contact} element={<Contact />} />
            <Route path={MenuUrls.Test} element={<Test />} />
         </Routes>
         <Footer />
      </>
   );
};

export default App;
