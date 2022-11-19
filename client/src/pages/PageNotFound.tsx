import { Button, Result } from "antd";
import { useNavigate, NavigateFunction } from "react-router-dom";

const PageNotFound = () => {
   const navigate: NavigateFunction = useNavigate();

   return (
      <div
         style={{
            height: "62vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
               <Button type="primary" onClick={() => navigate("/")}>
                  Back Home
               </Button>
            }
         />
      </div>
   );
};

export default PageNotFound;
