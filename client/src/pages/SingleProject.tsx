import React from "react";
import { useParams } from "react-router-dom";

const SingleProject = () => {
   const params = useParams();

   console.log(params);

   return <div>SingleProject</div>;
};

export default SingleProject;
