import { useEffect } from "react";
import { load } from "webfontloader";
import { Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";

import "./App.css";
import { Footer, Header, Guest } from "./components";
import {
   Home,
   Login,
   Contact,
   Peoples,
   Projects,
   NotFound,
   SingleProject,
} from "./pages";
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
            {/* <Route path={MenuUrls.Projects} element={<Projects />} />
            <Route
               path={`${MenuUrls.Projects}/:id`}
               element={<SingleProject />}
            /> */}

            <Route path={MenuUrls.Projects}>
               <Route path="" index element={<Projects />} />
               <Route path=":projectId" element={<SingleProject />} />
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
