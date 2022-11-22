import React, { FocusEvent } from "react";
import { TextField } from "@mui/joy";

const Test = () => {
   const afterFocusChanged = (event: FocusEvent<HTMLInputElement, Element>) => {
      console.log(event);
   };

   return (
      <div>
         <TextField
            type="text"
            placeholder="Enter something..."
            // onFocus={afterFocusChanged}
            onBlur={afterFocusChanged}
         />
      </div>
   );
};

export default Test;
