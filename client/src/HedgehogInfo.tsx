import { Paper, Typography } from "@mui/material";

interface Props {
  hedgehogId: number;
}

export function HedgehogInfo({ hedgehogId }: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    >
      <Typography>
        TODO: Esitä tässä komponentissa haluamallasi tavalla yksittäisen siilin
        tiedot.
      </Typography>
      <br />
      <Typography>
        Komponentille välitetään React propertynä yksittäisen siilin ID, jonka
        muuttuessa ko. siilin tiedot haetaan rajapinnalta.
      </Typography>
      <br />
      <Typography>Valitun siilin ID: {hedgehogId}</Typography>
    </Paper>
  );
}
