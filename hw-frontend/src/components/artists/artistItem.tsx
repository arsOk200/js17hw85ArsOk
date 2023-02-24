import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import {Link} from "react-router-dom";
interface Props{
  name:string;
  description:string;
  id:string;
  image:string;
}

const ArtistItem:React.FC<Props> = ({name,description,id,image}) => {
    return (
      <Card sx={{ maxWidth: 350, bgcolor:'#a6a6a6', margin:'20px'}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
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
          <Link to={'/'+id} style={{padding:'10px', color:'white' ,backgroundColor:'red', borderRadius:'10px', textDecoration:'none'}}>
            More
          </Link>
        </CardActions>
      </Card>
    )
};

export default ArtistItem;