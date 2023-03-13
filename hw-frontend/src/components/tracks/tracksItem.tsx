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
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/user/userSlice";
import {Button, Grid} from "@mui/material";
interface Props {
  addTrack:React.MouseEventHandler,
  number:number,
  duration:string,
  name:string,
  isPublished:boolean;
  deletingFunction:React.MouseEventHandler;
  publishingFunction:React.MouseEventHandler;
  publishing:false|string;
  deleting:false|string;
  id:string;
}
const TracksItem:React.FC<Props> = ({number,duration,name,addTrack,isPublished,deletingFunction,publishingFunction,deleting,publishing,id}) => {
  const theme = useTheme();
  const user =  useAppSelector(selectUser);
  let button;

  if(user?.role === 'admin') {
    button = (<Grid container flexDirection={'column'}  padding={'10px'} width={'80%'}>
      {isPublished ? (<Button onClick={publishingFunction} disabled={publishing ? publishing === id : false} type={'button'} color={'warning'} variant={'contained'}>Not publish</Button>) :
        <Button type={'button'} onClick={publishingFunction} disabled={publishing ? publishing === id : false} color={'success'} variant={'contained'}>Publish</Button>}

      <Button type={'button'} sx={{marginTop:'10px'}} disabled={deleting ? deleting === id : false} color={'error'} onClick={deletingFunction} variant={'contained'}>Delete</Button>
    </Grid>);
  }
    return (
      <Card sx={{ display: 'flex', m:3 ,border:'1px solid #252525', width:'200px'}}>

        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems:'center'}} width={'100%'}>

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
          {button}
        </Box>
      </Card>
    );
};

export default TracksItem;
