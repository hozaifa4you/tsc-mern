import { useEffect } from "react";
import { load } from "webfontloader";
import { Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";

import "./App.css";
import { Footer, Header, Guest, Protect } from "./components";
import {
   Home,
   Login,
   Contact,
   Peoples,
   Projects,
   NotFound,
   SingleProject,
   CreateProject,
} from "./pages";
import Test from "./pages/Test"; // FIXME: should be remove at the time of production
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

            <Route path={MenuUrls.Projects}>
               <Route path="" index element={<Projects />} />
               <Route path=":slug" element={<SingleProject />} />
               <Route
                  path="create"
                  element={
                     <Protect>
                        <CreateProject />
                     </Protect>
                  }
               />
            </Route>

            <Route path={MenuUrls.Peoples} element={<Peoples />} />
            <Route path={MenuUrls.Contact} element={<Contact />} />
            <Route path={MenuUrls.Test} element={<Test />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
         <Footer />
      </>
   );
};

export default App;
