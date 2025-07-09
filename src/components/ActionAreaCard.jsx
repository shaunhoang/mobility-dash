import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';


export default function ActionAreaCard({ 
  image, 
  title, 
  description, 
  altText = "image", 
  maxWidth = 345, 
  onClick 
}) {
  return (
    <Card sx={{ maxWidth, height: 280}} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={altText}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ color: 'roseShades.main', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box
            sx={{
              maxHeight: 80,
              overflow: 'hidden',
              position: 'relative',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
