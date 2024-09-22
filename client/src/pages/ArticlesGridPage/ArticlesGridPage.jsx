import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useCurrentContentQuery } from "../../api";

const ArticlesGridPage = () => {
  const { data: content, isLoading } = useCurrentContentQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Learn Gloving
      </Typography>
      <Grid container spacing={4}>
        {!isLoading &&
          content?.learn?.articles.map(article => (
            <Grid item xs={12} sm={6} md={4} key={article.slug}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image ? article.image.url : "/placeholder-image.jpg"}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.subtitle}
                  </Typography>
                  <Button component={Link} to={`/learn/${article.slug}`} sx={{ mt: 2 }}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ArticlesGridPage;
