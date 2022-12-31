import {FC} from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import {Grid} from "@mui/material";
import {AlarmOn, Celebration, CreateNewFolder, EventBusy} from "@mui/icons-material";

import {IEventTypes} from "../../pages/SingleProjectDisplay";
import moment from "moment";

interface IPropTypes {
	event: IEventTypes;
}

const Event: FC<IPropTypes> = ({event}) => {
	return (
		<Grid item xs={12} sm={12} display="flex" justifyContent="center">
			<Card variant="outlined" sx={{width: 320}}>
				<CardOverflow>
					<AspectRatio ratio="2">
						<img
							src={event.photo}
							srcSet={`${event.photo} 2x`}
							loading="lazy"
							alt={event.eventNames}
						/>
					</AspectRatio>
					<IconButton
						aria-label="Like minimal photography"
						size="md"
						variant="solid"
						sx={{
							position: "absolute",
							zIndex: 2,
							borderRadius: "50%",
							right: "1rem",
							bottom: 0,
							transform: "translateY(50%)",
						}}
					>
						<Celebration sx={{color: "#ebc000"}}/>
					</IconButton>
				</CardOverflow>
				<Typography level="h2" sx={{fontSize: "md", mt: 2}}>
					<Link href="#multiple-actions" overlay underline="none">
						{event.eventNames}
					</Link>
				</Typography>
				<Typography level="body2" sx={{mt: 0.5, mb: 2}}>
					<Link href="#multiple-actions" fontSize="sm" color="neutral">
						{event.creator.name}
					</Link>
				</Typography>
				<Divider inset="context"/>
				<CardOverflow
					variant="soft"
					sx={{
						display: "flex",
						gap: 1.5,
						py: 1.5,
						px: "var(--Card-padding)",
						bgcolor: "background.level1",
					}}
				>
					<Typography startDecorator={<CreateNewFolder sx={{fontSize: '12px'}}/>}
					            level="body5"
					            sx={{fontWeight: "md", color: "text.secondary"}}
					>
						{moment(event.createDate).fromNow()}
					</Typography>
					<Divider orientation="vertical"/>
					<Typography startDecorator={<AlarmOn sx={{fontSize: '12px'}}/>}
					            level="body5"
					            sx={{fontWeight: "md"}}
					            color="success"
					>
						{moment(event.startingDate).fromNow()}
					</Typography>
					<Divider orientation="vertical"/>
					<Typography startDecorator={<EventBusy sx={{fontSize: '12px'}}/>}
					            level="body5"
					            sx={{fontWeight: "md"}}
					            color="danger"
					>
						{moment(event.endDate).fromNow()}
					</Typography>
				</CardOverflow>
			</Card>
		</Grid>
	);
};

export default Event;
