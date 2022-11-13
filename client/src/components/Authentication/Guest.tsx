import { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";

interface Children {
   children?: JSX.Element;
}

const Guest: FC<Children> = ({ children }): JSX.Element => {
   const { isAuth, token, user } = useAppSelector(selectLogin);

   if (isAuth || token || user) return <Navigate to="/" replace />;

   return <>{children}</>;
};

export default Guest;
