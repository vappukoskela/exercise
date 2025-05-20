import { Box, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
  hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {
  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);

  useEffect(() => {
    const getHedgehog = async () => {
      try {
        const res = await fetch(`/api/v1/hedgehog/${hedgehogId}`);
        if (!res.ok) return;

        const json = await res.json();
        setHedgehog(json?.hedgehog || null);
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getHedgehog();
  }, [hedgehogId]);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        overflow: "hidden",
      }}
    >
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
        <Typography sx={{ color: "darkslategrey" }}>Siilin tiedot</Typography>
      </Box>
      <Box
        sx={{
          padding: "1em",
          flexDirection: "column",
          display: "flex",
          gap: 2,
        }}
      >
        {hedgehog ? (
          <Box>
            <Typography variant="h6">Siili #{hedgehog.id}</Typography><br />
            <Typography >Nimi: {hedgehog?.name}</Typography>
            <Typography>Ikä: {hedgehog?.age}v</Typography>
            <Typography>
              Sukupuoli: {hedgehog?.gender === "M" ? "Uros" : "Naaras"}
            </Typography>
          </Box>
        ) : (
          <Typography>
            Valitse siili vasemmanpuoleisesta listauksesta tai rekisteröi uusi
            siili
          </Typography>
        )}
        <br />
      </Box>
    </Paper>
  );
}
