import HedgehogTextField from "./Components/HedgehogTextField";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  coordinates: number[];
}

export function HedgehogForm({ coordinates }: Props) {
  console.log(coordinates);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "age") {
      const parsedAge = parseInt(value, 10);
      parsedAge >= 0 ? setAge(parsedAge) : setAge(undefined);
    }
  };

  const submitForm = () => {
    console.log(name + " " + age);
  };
  const clearForm = () => {
    setName("");
    setAge(undefined);
  };

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
        <Typography sx={{ color: "darkslategrey" }}>
          Ilmoita siilihavainto
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "1em",
          flexDirection: "column",
          display: "flex",
          gap: 2,
        }}
      >
        <HedgehogTextField
          name="name"
          label="Nimi"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <HedgehogTextField
          name="age"
          label="Ikä"
          type="number"
          value={age}
          onChange={handleChange}
        />
        {/* TODO: M/F Sukupuoli radiobutton */}
        {/* TODO: Disabled textfield joka näyttää valitut koordinaatit */}
        {/* TODO: Varoitus jos kaikkia bokseja ei täytetty koordinaatteja valittu */}
      </Box>
      <Box
        sx={{
          padding: "1em",
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={clearForm}>
          Tyhjennä
        </Button>
        <Button variant="contained" color="primary" onClick={submitForm}>
          Tallenna havainto
        </Button>
      </Box>
      {/* <Typography>
        TODO: Luo tähän lomake painikkeineen, jonka avulla uusia siilihavaintoja
        saa lisättyä palveluun.
      </Typography>
      <br />
      <Typography>
        Siililtä kysyttävät tiedot: nimi, ikä, sukupuoli. Lisäksi
        siilin havainnon yhteydessä merkitään havainnon sijainti kartalla.
        Kartalta saadaan koordinaattipiste tälle HedgehogForm:lle klikkaamalla
        karttaa (kts. consolin logit). Tämä koordinaattipiste tulee tallentaa
        tietokantaan muiden tietojen oheen. PostGIS tarjoaa koordinaateille
        sopivan tietokantatyypin koordinaattien tallennukseen. Yllä olevat
        tiedot tulee tallentaa tietokantaan sopivalla HTTP pyynnöllä siilien
        tietokantaan.
      </Typography> */}
    </Paper>
  );
}
