import { FC } from "react";
import { List, ListItem, ListItemButton } from "@mui/joy";

interface ISingleListItemPropsTypes {
   title: string;
   icon: JSX.Element;
}

const SingleListItem: FC<ISingleListItemPropsTypes> = ({ title, icon }) => {
   return (
      <List size="sm" sx={{ borderRadius: "sm" }}>
         <ListItem startAction={icon} color="primary">
            <ListItemButton>{title}</ListItemButton>
         </ListItem>
      </List>
   );
};

export default SingleListItem;
