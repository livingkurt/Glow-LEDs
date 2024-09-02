import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const DatabaseMigrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collection: "",
    method: "find",
    query: "{}",
    update: "{}",
  });
  const [result, setResult] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { collection, method, query, update } = formData;
      console.log("Sending request:", { collection, method, query, update });
      const response = await axios.put(`/api/all/${collection}`, {
        method,
        query: JSON.parse(query),
        update: JSON.parse(update),
      });
      console.log("Response:", response);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const collections = [
    "affiliates",
    "carts",
    "categorys",
    "chips",
    "contents",
    "emails",
    "expenses",
    "features",
    "filaments",
    "images",
    "orders",
    "palettes",
    "parcels",
    "paychecks",
    "products",
    "promos",
    "surveys",
    "teams",
    "tutorials",
    "users",
    "versions",
    "wholesalers",
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Database Migration
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Collection</InputLabel>
                <Select name="collection" value={formData.collection} onChange={handleChange} required>
                  {collections.map(col => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Method</InputLabel>
                <Select name="method" value={formData.method} onChange={handleChange} required>
                  <MenuItem value="updateMany">Update Many</MenuItem>
                  <MenuItem value="updateOne">Update One</MenuItem>
                  <MenuItem value="find">Find</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="query"
                label="Query (JSON)"
                value={formData.query}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="update"
                label="Update (JSON)"
                value={formData.update}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Execute
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate(-1)} sx={{ ml: 2 }}>
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              bgcolor: "grey.100",
              p: 2,
              borderRadius: 1,
            }}
          >
            {result}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default DatabaseMigrationPage;
