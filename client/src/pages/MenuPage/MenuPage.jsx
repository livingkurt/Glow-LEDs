import React from "react";
import { useParams } from "react-router-dom";
import * as API from "../../api";
import { Box, Container, Grid, Typography } from "@mui/material";
import MenuPageHead from "./components/MenuPageHead";
import MenuItemCard from "./components/MenuItemCard";
import MenuPageSkeletons from "./components/MenuPageSkeletons";

const MenuPage = () => {
  const params = useParams();
  const pathname = params.pathname;

  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  if (isLoading) return <MenuPageSkeletons />;

  const menus = currentContent?.menus || [];
  const menu = menus.find(menu => menu.pathname === pathname);

  if (!menu) return <Typography>{"Menu not found"}</Typography>;

  return (
    <Box>
      <Container maxWidth="xl">
        <MenuPageHead name={menu.name} />
        <Typography variant="h4" align="center" py={2}>
          {menu.name}
        </Typography>
        {menu.description && (
          <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
            {menu.description}
          </Typography>
        )}
        <Grid container spacing={2}>
          {menu.menu_items.length > 0 ? (
            menu.menu_items.map(item => (
              <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                <MenuItemCard item={item} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
              {"No items found in this menu"}
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MenuPage;
