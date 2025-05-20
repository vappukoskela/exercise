import { Box, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
  hedgehog: Hedgehog | null;
}

export function HedgehogInfo({ hedgehog }: Props) {

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
        {/* <Typography>
        TODO: Esitä tässä komponentissa haluamallasi tavalla yksittäisen, tällä
        hetkellä valittuna olevan, siilin tiedot. Siili valitaan
        vasemmanpuoleisesta listauksesta. Kartalla esitetään valitun siilin
        sijainti karttamerkin avulla.
      </Typography>
      <br />
      <Typography>
        Komponentille välitetään React propertynä yksittäisen siilin ID, jonka
        muuttuessa ko. siilin tiedot haetaan rajapinnalta.
      </Typography> */}
        <br />
      </Box>
    </Paper>
  );
}
