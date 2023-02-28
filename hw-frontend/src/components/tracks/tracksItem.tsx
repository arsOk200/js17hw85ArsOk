import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
interface Props {
  addTrack:React.MouseEventHandler,
  number:number,
  duration:string,
  name:string,
}
const TracksItem:React.FC<Props> = ({number,duration,name,addTrack}) => {
  const theme = useTheme();
    return (
      <Card sx={{ display: 'flex', m:3 ,border:'1px solid #252525', width:'200px'}}>
        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <b>#{number}</b>
            <Typography component="div" variant="h5" >
              {name}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {duration}
            </Typography>
          </CardContent>
          <Box  sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause"   onClick={addTrack}>
                 <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon  /> : <SkipNextIcon />}
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
};

export default TracksItem;
