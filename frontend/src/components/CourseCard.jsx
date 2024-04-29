import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CourseCard({ title, code, id }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/courses/${id}`); // Route to the course details where `id` is a unique identifier for the course
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {code}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
