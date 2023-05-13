import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

const hedgeHogs = Array(20).fill(6);

export default function HedgeHogList() {
  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/health");
        if (!res.ok) return;

        const json = await res.json();
        console.log(json);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: "1em", overflow: "hidden" }}>
      <Box
        sx={{
          backgroundColor: "#a1e6df",
          height: "3em",
          display: "flex",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "darkslategrey" }}>
          Rekisteröidyt siilit
        </Typography>
      </Box>
      <Box sx={{ overflowY: "scroll", height: "100%" }}>
        {hedgeHogs.map((hedgeHog, index) => (
          <MenuItem key={`hedgehog-index-${index}`}>{hedgeHog}</MenuItem>
        ))}
      </Box>
    </Paper>
  );
}
