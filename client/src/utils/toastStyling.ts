const toastDuration: number = 2500;

export const toastErrorStyle = {
   style: {
      border: "1px solid #d32f2f",
      padding: "20px",
      color: "#d32f2f",
      backgroundColor: "rgba(251, 233, 231, 0.5)",
      marginTop: "65px", // FIXME: fix the margin top
      fontFamily: "Josefin Sans",
   },
   iconTheme: {
      primary: "#d32f2f",
      secondary: "#FFFAEE",
   },
   duration: toastDuration,
};

export const toastSuccessStyle = {
   style: {
      border: "1px solid #0f5d26",
      padding: "20px",
      color: "#0f5d26",
      backgroundColor: "#d7f5dd",
      marginTop: "65px", // FIXME: fix the margin top
      fontFamily: "Josefin Sans",
   },
   iconTheme: {
      primary: "#0f5d26",
      secondary: "#FFFAEE",
   },
   duration: toastDuration,
};

export const toastWarningStyle = {
   style: {
      border: "1px solid #4d2d00",
      padding: "20px",
      color: "#4d2d00",
      backgroundColor: "#fff8c5",
      marginTop: "65px", // FIXME: fix the margin top
      fontFamily: "Josefin Sans",
   },
   iconTheme: {
      primary: "#4d2d00",
      secondary: "#FFFAEE",
   },
   duration: toastDuration,
   icon: "⚠️",
};

export const toastInfoStyle = {
   style: {
      border: "1px solid #5f35ae",
      padding: "20px",
      color: "#5f35ae",
      backgroundColor: "#f4eaff",
      marginTop: "65px", // FIXME: fix the margin top
      fontFamily: "Josefin Sans",
   },
   iconTheme: {
      primary: "#5f35ae",
      secondary: "#FFFAEE",
   },
   duration: toastDuration,
   icon: "🛈",
};
