import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
  selectHedgehog: (id: number | null) => void;
  hedgehogs: Hedgehog[];
}

export default function HedgeHogList({ selectHedgehog, hedgehogs }: Props) {
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
        <Box sx={{ overflow: "auto", height: "100%" }} id="hedgehog-list">
          {/* <Box sx={{ overflowY: "scroll", height: "100%" }}> */}
          {hedgehogs.map((hedgehog, index: number) => (
            <MenuItem
              onClick={() => selectHedgehog(hedgehog.id)}
              key={`hedgehog-index-${index}`}
            >
              {hedgehog.name}
            </MenuItem>
          ))}
        </Box>
      ) : (
        <Typography sx={{ padding: "1em" }}>
          Ei siilejä tietokannassa. Lisää siili lomakkeella!
        </Typography>
      )}
    </Paper>
  );
}
