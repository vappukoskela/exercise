import { MenuItem, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

const hedgeHogs = Array(100).fill(6);

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
    <Paper
      elevation={3}
      sx={{ margin: "1em", padding: "1em", overflowY: "scroll" }}
    >
      {hedgeHogs.map((hedgeHog, index) => (
        <MenuItem key={`hedgehog-index-${index}`}>{hedgeHog}</MenuItem>
      ))}
    </Paper>
  );
}
