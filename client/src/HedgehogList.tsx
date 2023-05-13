import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function HedgeHogList() {
  const [hedgehogs, setHedgehogs] = useState<any>([]);

  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;

        const json = await res.json();
        json && setHedgehogs(json.hedgehogs);
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
      {hedgehogs.length ? (
        <Box sx={{ overflowY: "scroll", height: "100%" }}>
          {hedgehogs.map((hedgehog: any, index: number) => (
            <MenuItem key={`hedgehog-index-${index}`}>{hedgehog.id}</MenuItem>
          ))}
        </Box>
      ) : (
        <Typography sx={{ fontStyle: "italic", padding: "1em", color: "grey" }}>
          Ei rekisteröityjä siilejä
        </Typography>
      )}
    </Paper>
  );
}
