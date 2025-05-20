import { HedgehogForm } from "./HedgehogForm";
import { HedgehogInfo } from "./HedgehogInfo";
import HedgeHogList from "./HedgehogList";
import { Map } from "./Map";
import { Box, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B2A0",
      contrastText: "white",
    },
    secondary: {
      main: "#a1e6df",
    },
  },
});

export function App() {
  // Latest coordinates from the Map click event
  const [coordinates, setCoordinates] = useState<number[]>();
  // ID of the currently selected hedgehog
  const [selectedHedgehogId, setSelectedHedgehogId] = useState<number | null>(null);
  // Have all the hedgehogs here instead
  const [hedgehogs, setHedgehogs] = useState<Hedgehog[]>([]);
  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);

  useEffect(() => {
    getAllHedgehogs();
  }, []);

  const getAllHedgehogs = async () => {
    try {
      const res = await fetch("/api/v1/hedgehog");
      if (!res.ok) return;

      const json = await res.json();
      setHedgehogs(json?.hedgehogs || []);
    } catch (err) {
      console.error(`Error while fetching hedgehogs: ${err}`);
    }
  };

  const selectHedgehog = (id: number | null) => {
    setSelectedHedgehogId(id);
    const selectedHedgehog = hedgehogs.find((hedgehog) => hedgehog.id === id);
    if (selectedHedgehog) {
      setHedgehog(selectedHedgehog)
      setCoordinates([selectedHedgehog?.longitude, selectedHedgehog?.latitude]);
    }
  };

  const refreshHedgehogs = () => {
    getAllHedgehogs();
  };

  const mapClick = (coordinates: number[]) => {
    setCoordinates(coordinates)
    setHedgehog(null)
    setSelectedHedgehogId(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00B2A0",
            height: "40px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "white" }} variant="overline">
            Siilit kartalla
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridAutoColumns: "1fr 1.5fr 2fr",
            gridAutoFlow: "column",
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <HedgeHogList selectHedgehog={selectHedgehog} hedgehogs={hedgehogs} />
          <Box>
            <HedgehogInfo hedgehogId={selectedHedgehogId} />
            <HedgehogForm
              coordinates={coordinates || []}
              setCoordinates={setCoordinates}
              refreshHedgehogs={refreshHedgehogs}
            />
          </Box>
          <Paper elevation={3} sx={{ margin: "1em" }}>
            <Map
              onMapClick={(coordinates) => mapClick(coordinates)}
              // Esimerkki siitä, miten kartalle voidaan välittää siilien koordinaatteja GeoJSON -arrayssä
              features={
                coordinates
                  ? [
                      {
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: coordinates, // Move map marker when clicking map
                          //[2859167.020281517, 9632038.56757201],
                        },
                        properties: hedgehog ? {
                          name: hedgehog.name,
                          age: hedgehog.age,
                          gender: hedgehog.gender,
                        } : {},
                      },
                    ]
                  : []
              }
            />
          </Paper>
        </Box>
        <Box
          sx={{
            backgroundColor: "#00B2A0",
            height: "40px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography sx={{ color: "white" }} variant="overline">
            Powered by Ubigu Oy
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
