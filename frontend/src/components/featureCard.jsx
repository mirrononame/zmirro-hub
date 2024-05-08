import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function FeatureCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/feature-image.jpg"
        alt="feature"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Заголовок особенности
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Описание особенности.
        </Typography>
      </CardContent>
    </Card>
  );
}