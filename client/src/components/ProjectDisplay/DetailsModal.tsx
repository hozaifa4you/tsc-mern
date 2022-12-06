import { FC } from "react";
import { Chip, Modal, ModalClose, Sheet, Typography, useTheme } from "@mui/joy";
import { Avatar, Box, Container } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";

interface IPropsType {
   open: boolean;
   setOpen: any;
   project?: object;
}

const DetailsModal: FC<IPropsType> = ({ open, setOpen, project }) => {
   const theme = useTheme();

   return (
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
               borderRadius: "sm",
               boxShadow: "md",
            }}
            component={Container}
            maxWidth="lg"
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
            {/* HACK details header */}
            <Box
               display="flex"
               alignItems="center"
               justifyContent="space-between"
               mx={3}
               my={2}
            >
               <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                     variant="rounded"
                     sx={{ width: 56, height: 56 }}
                     src="/avatar.png"
                  />
                  <Box>
                     <Typography lineHeight={0.8} component="strong">
                        Yousuf Ahamad
                     </Typography>
                     <Typography level="body2" color="primary" fontWeight="lg">
                        Project Creator
                     </Typography>
                     <Typography
                        level="body2"
                        lineHeight={0.7}
                        component="code"
                     >
                        Satkhira, Bangladesh.
                     </Typography>
                  </Box>
               </Box>
               <Box display="grid" alignItems="center" gap={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                     <Typography component="span">Project number</Typography>
                     <Typography component="span" color="danger">
                        #367261
                     </Typography>
                     <Typography>and project type is </Typography>
                     <Chip color="warning" variant="soft" size="sm">
                        PUBLIC
                     </Chip>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                     <Chip variant="soft" color="danger" size="sm">
                        Web Development
                     </Chip>
                     <Chip variant="plain" color="primary" size="sm">
                        Projects Created
                     </Chip>
                     <Chip variant="outlined" size="sm" color="neutral">
                        Joined Projects
                     </Chip>
                  </Box>
               </Box>
            </Box>
            {/* HACK photo */}
            <Box
               display="flex"
               alignItems="center"
               justifyContent="center"
               mx={3}
               my={2}
               width="100%"
            >
               <img
                  src="/project.jpg"
                  alt="img"
                  style={{ maxHeight: "300px" }}
               />
            </Box>
            <Box
               display="flex"
               alignItems="center"
               justifyContent="space-between"
            >
               <Typography
                  textTransform="uppercase"
                  color="primary"
                  fontSize="sm"
               >
                  Instructor
               </Typography>
               <Typography
                  textTransform="uppercase"
                  color="primary"
                  textColor="text.secondary"
                  fontSize="sm"
                  sx={{ color: theme.palette.text.secondary }}
               >
                  Publish on 21-12-2022 4:32PM
               </Typography>
            </Box>
            <Typography id="modal-desc" level="h4">
               Make sure to use <code>aria-labelledby</code> on the modal dialog
               with an optional <code>aria-describedby</code>
               attribute.
            </Typography>
            <Box display="flex" gap={2} mb={2} mt={1}>
               <Typography textTransform="uppercase" color="info" fontSize="sm">
                  Manager
               </Typography>
               <Chip
                  size="sm"
                  variant="outlined"
                  sx={{ mb: 1, color: theme.palette.text.secondary }}
               >
                  Joined 102
               </Chip>
            </Box>
            <Scrollbars style={{ height: "350px" }}>
               <Typography
                  sx={{
                     overflowY: "auto",
                     fontFamily: "Josefin Sans",
                     color: "GrayText",
                  }}
               >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dignissimos delectus maxime consectetur magni voluptas
                  voluptatem adipisci officia assumenda quia nobis harum sed
                  quas voluptates ipsa officiis illum nemo dolor id cupiditate
                  quidem, nihil quis. Ipsam blanditiis iure neque consequuntur
                  beatae harum, aliquam dolorem sint maxime, deleniti amet,
                  nesciunt aperiam libero suscipit obcaecati? Facere ullam
                  inventore consectetur, mollitia, reprehenderit architecto
                  voluptatem autem rerum voluptatum minus quidem reiciendis
                  cumque tempore, doloribus delectus eos blanditiis labore
                  repellat accusamus minima dolorum perspiciatis? Corrupti
                  possimus itaque obcaecati debitis exercitationem quia suscipit
                  tenetur magni molestias, hic iusto aliquam? Esse ex voluptatem
                  quod quae aliquid facere ipsum, tempora ad sunt quas vitae id
                  corporis minus veritatis? Dolor, consequuntur! Possimus
                  consectetur neque nihil vitae eos velit excepturi quaerat
                  facere, deserunt necessitatibus, corrupti vel? Fugit assumenda
                  repellendus ducimus minus, voluptatem vitae adipisci tenetur
                  dignissimos ipsa blanditiis itaque earum nesciunt! Neque,
                  animi magni vel perferendis eos dolorum facere? Culpa suscipit
                  sunt itaque facilis at iste, reprehenderit numquam unde
                  voluptate sit, rerum recusandae voluptates quam magni commodi
                  in. Corporis ex quis nemo illum pariatur deserunt id odio
                  maxime dolor corrupti dolores harum, nam facere vitae repellat
                  tempore dignissimos, optio molestiae quas, illo fuga? Optio
                  quasi adipisci modi. Fugit, neque. Consequatur, et?Lorem ipsum
                  dolor sit amet consectetur, adipisicing elit. Dignissimos
                  delectus maxime consectetur magni voluptas voluptatem adipisci
                  officia assumenda quia nobis harum sed quas voluptates ipsa
                  officiis illum nemo dolor id cupiditate quidem, nihil quis.
                  Ipsam blanditiis iure neque consequuntur beatae harum, aliquam
                  dolorem sint maxime, deleniti amet, nesciunt aperiam libero
                  suscipit obcaecati? Facere ullam inventore consectetur,
                  mollitia, reprehenderit architecto voluptatem autem rerum
                  voluptatum minus quidem reiciendis cumque tempore, doloribus
                  delectus eos blanditiis labore repellat accusamus minima
                  dolorum perspiciatis? Corrupti possimus itaque obcaecati
                  debitis exercitationem quia suscipit tenetur magni molestias,
                  hic iusto aliquam? Esse ex voluptatem quod quae aliquid facere
                  ipsum, tempora ad sunt quas vitae id corporis minus veritatis?
                  Dolor, consequuntur! Possimus consectetur neque nihil vitae
                  eos velit excepturi quaerat facere, deserunt necessitatibus,
                  corrupti vel? Fugit assumenda repellendus ducimus minus,
                  voluptatem vitae adipisci tenetur dignissimos ipsa blanditiis
                  itaque earum nesciunt! Neque, animi magni vel perferendis eos
                  dolorum facere? Culpa suscipit sunt itaque facilis at iste,
                  reprehenderit numquam unde voluptate sit, rerum recusandae
                  voluptates quam magni commodi in. Corporis ex quis nemo illum
                  pariatur deserunt id odio maxime dolor corrupti dolores harum,
                  nam facere vitae repellat tempore dignissimos, optio molestiae
                  quas, illo fuga? Optio quasi adipisci modi. Fugit, neque.
                  Consequatur, et?
               </Typography>
            </Scrollbars>
         </Sheet>
      </Modal>
   );
};

export default DetailsModal;
