import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";

interface Props{
  duration:string,
  datetime:string,
  name:string,
}
const TracksHistoryItem:React.FC<Props> = ({datetime,duration,name}) => {
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          When:{dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
           Duration:{duration}
        </Typography>
        <Typography variant="body2">
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </React.Fragment>
  );
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
      </Box>
    </div>
  );
};

export default TracksHistoryItem;