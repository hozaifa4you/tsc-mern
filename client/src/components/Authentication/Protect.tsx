import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";

interface Children {
   children?: React.ReactChild | React.ReactChildren;
}

const Protect: FC<Children> = ({ children }) => {
   const { isAuth, token, user } = useAppSelector(selectLogin);

   if (!isAuth || !token || !user) return <Navigate to="/login" replace />;

   return <>{children}</>;
};

export default Protect;
