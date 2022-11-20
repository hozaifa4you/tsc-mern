import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo = () => {
   const navigate = useNavigate();

   return (
      <>
         <img
            src="/logo.png"
            alt="logo"
            width={50}
            style={{ cursor: "pointer", marginRight: 8 }}
            onClick={() => navigate("/")}
         />
         <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            sx={{
               display: { cursor: "pointer" },
            }}
            fontFamily="Josefin Slab"
            fontWeight="bold"
            textTransform="uppercase"
            onClick={() => navigate("/")}
         >
            Dev Projects
         </Typography>
      </>
   );
};

export default Logo;
