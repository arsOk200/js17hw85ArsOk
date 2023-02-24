import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import {Link} from "react-router-dom";
import notImageAvailable from "../../assets/noImageAvailibleImages/No_Image_Available (1).jpg";
import {apiUrl} from "../../constants";
interface Props{
  name:string;
  image:string
  id:string;
  year:number;
}

const AlbumItem:React.FC<Props> = ({name,year,id,image}) => {

  let cardImage = notImageAvailable;
  if(image) {
    cardImage = apiUrl + '/' + image;
  }
  return (
    <Card sx={{ width: 250, bgcolor:'#a6a6a6', margin:'20px'}}>
      <CardActionArea>
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
        <Link to={'/tracks/'+id} style={{padding:'10px', color:'white' ,backgroundColor:'red', borderRadius:'10px', textDecoration:'none'}}>
          Show tracks
        </Link>
      </CardActions>
    </Card>
  )
};

export default AlbumItem;