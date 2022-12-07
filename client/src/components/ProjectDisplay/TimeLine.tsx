import { FC } from "react";
import { Box, Divider, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { Timeline } from "antd";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { Scrollbars } from "react-custom-scrollbars";

interface IPropsTypes {
   open: boolean;
   setOpen: any;
}

const TimeLine: FC<IPropsTypes> = ({ open, setOpen }) => {
   return (
      <>
         <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Sheet
               variant="outlined"
               sx={{
                  minWidth: 700,
                  minHeight: 850,
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
               }}
            >
               <ModalClose
                  variant="outlined"
                  sx={{
                     top: "calc(-1/4 * var(--IconButton-size))",
                     right: "calc(-1/4 * var(--IconButton-size))",
                     boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                     borderRadius: "50%",
                     bgcolor: "background.body",
                  }}
               />
               <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="sm"
                  mb={1.5}
               >
                  Display all steps that all created!
               </Typography>
               <Divider sx={{ mb: 4 }} />
               <Box>
                  <Scrollbars style={{ height: 600 }}>
                     <Timeline mode="alternate" style={{ marginTop: 10 }}>
                        <Timeline.Item color="green">
                           Create a services site 2015-09-01
                        </Timeline.Item>
                        <Timeline.Item color="green">
                           Create a services site 2015-09-01
                        </Timeline.Item>
                     </Timeline>
                  </Scrollbars>
               </Box>
               <Divider />
               <Typography textAlign="center" my={2}>
                  You can update, delete and refactor timeline data.
               </Typography>
            </Sheet>
         </Modal>
      </>
   );
};

export default TimeLine;
