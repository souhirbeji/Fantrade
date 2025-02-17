import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
      <Box style={{ color, fontSize: "32px", marginBottom: "8px" }}>{icon}</Box>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" style={{ color: "#888" }}>
        {title}
      </Typography>
    </Paper>
  );
};

export default StatCard;
