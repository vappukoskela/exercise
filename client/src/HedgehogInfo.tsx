import { Box, Paper, Typography } from "@mui/material";
import { Hedgehog } from "@shared/hedgehog";
import { useEffect, useState } from "react";

interface Props {
  hedgehogId: number | null;
}

export function HedgehogInfo({ hedgehogId }: Props) {
  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);

  console.log(hedgehogId);
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
        padding: "1em",
      }}
    >
      {hedgehog ? (
        <Box>
          <Typography>{hedgehog?.name}</Typography>
          <Typography>{hedgehog?.age}</Typography>
          <Typography>{hedgehog?.gender}</Typography>
        </Box>
      ) : (
        <Typography>Valitse siili vasemmanpuoleisesta listauksesta</Typography>
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
    </Paper>
  );
}
