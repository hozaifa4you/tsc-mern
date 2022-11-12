import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Children {
   children?: any;
}

const Protect: FC<Children> = ({ children }) => {
   // const { isAuth, token } = useSelector((state) => state.auth);

   // if (!isAuth || !token) return <Navigate to="/" />;

   return <>{children}</>;
};

export default Protect;
