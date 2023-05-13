import { Paper, Typography } from "@mui/material";

export function HedgehogForm() {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        padding: "1em",
      }}
    >
      <Typography>
        TODO: Luo tähän lomake painikkeineen, jonka avulla uusia siilihavaintoja
        saa lisättyä palveluun.
      </Typography>
      <br />
      <Typography>
        Siililtä kysyttävät tiedot: nimi, ikä, sukupuoli. Lisäksi siilin
        havainnon yhteydessä merkitään havainnon sijainti kartalla. Kartalta
        saadaan koordinaattipiste tälle HedgehogForm:lle klikkaamalla karttaa.
        Tämä koordinaattipiste tulee tallentaa tietokantaan muiden tietojen
        oheen.{" "}
      </Typography>
    </Paper>
  );
}
