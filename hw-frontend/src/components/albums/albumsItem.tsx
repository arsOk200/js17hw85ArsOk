import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import {Link} from "react-router-dom";
import notImageAvailable from "../../assets/noImageAvailibleImages/No_Image_Available (1).jpg";
import {apiUrl} from "../../constants";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/user/userSlice";

interface Props {
  name: string;
  image: string
  id: string;
  year: number;
  isPublished: boolean;
  deleting: false | string;
  publishing: false | string;
  publishFunction: React.MouseEventHandler;
  deleteFunction: React.MouseEventHandler;
}

const AlbumItem: React.FC<Props> = ({name, year, id, image, isPublished, deleting, publishing, publishFunction, deleteFunction}) => {
  let cardImage = notImageAvailable;
  if (image) {
    cardImage = apiUrl + '/' + image;
  }
  const user = useAppSelector(selectUser);
  let button;

  if (user?.role === 'admin') {
    button = (<Grid container justifyContent={'space-around'} alignItems={'center'}>
      {isPublished ? (
          <Button onClick={publishFunction} disabled={publishing ? publishing === id : false} type={'button'}
                  color={'warning'} variant={'contained'}>Not publish</Button>) :
        <Button type={'button'} onClick={publishFunction} disabled={publishing ? publishing === id : false}
                color={'success'} variant={'contained'}>Publish</Button>}

      <Button type={'button'} disabled={deleting ? deleting === id : false} color={'error'} onClick={deleteFunction}
              variant={'contained'}>Delete</Button>
    </Grid>);
  }
  return (<Card sx={{width: 250, bgcolor: '#a6a6a6', margin: '20px'}}>
      <CardActionArea component={Link} to={'/tracks/' + id}>
        <CardMedia
          component="img"
          height="250"
          image={cardImage}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button}
      </CardActions>
    </Card>)
};

export default AlbumItem;