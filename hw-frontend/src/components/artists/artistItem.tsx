import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import {Link} from "react-router-dom";
import {apiUrl} from "../../constants";
import notImageAvailable from '../../assets/noImageAvailibleImages/No_Image_Available (1).jpg';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/user/userSlice";

interface Props{
  name:string;
  description:string;
  id:string;
  image:string;
  isPublished:boolean;
  publish:React.MouseEventHandler;
  deleting:React.MouseEventHandler;
  publishing:false | string;
  deletingForDis:false | string;
}

const ArtistItem:React.FC<Props> = ({name,description,id,image,isPublished,publish,deleting,publishing,deletingForDis}) => {
  const user =  useAppSelector(selectUser);
  let cardImage = notImageAvailable;
  if(image) {
    cardImage = apiUrl+'/'+image;
  }

  let buttons;

  if(user?.role === 'admin') {
    buttons = (<Grid container justifyContent={'space-around'}  alignItems={'center'}>
      {isPublished ? (<Button onClick={publish} disabled={publishing ? publishing === id : false} type={'button'} color={'warning'} variant={'contained'}>Not publish</Button>) :
        <Button type={'button'} onClick={publish} disabled={publishing ? publishing === id : false} color={'success'} variant={'contained'}>Publish</Button>}

      <Button type={'button'} disabled={deletingForDis ? deletingForDis === id : false} color={'error'} onClick={deleting} variant={'contained'}>Delete</Button>
    </Grid>);
  }
    return (
      <Card sx={{ width: 250, bgcolor:'#a6a6a6', margin:'20px'}}>
        <CardActionArea component={Link} to={'/'+id}>
          <CardMedia
            component="img"
            height="200"
            image={cardImage}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
    )
};

export default ArtistItem;