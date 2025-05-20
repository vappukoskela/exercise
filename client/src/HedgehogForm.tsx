import HedgehogTextField from "./Components/HedgehogTextField";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  coordinates: number[];
  setCoordinates: (coordinates: number[] | undefined) => void;
  refreshHedgehogs: () => void;
}

const StyledFormControlLabel = styled(FormControlLabel)(() => {
  return {
    ".MuiTypography-root": {
      fontSize: "0.875rem",
      color: "darkslategrey",
    },
    marginLeft: 0,
    marginRight: '1.5em',
  }
});

export function HedgehogForm({
  coordinates,
  setCoordinates,
  refreshHedgehogs,
}: Props) {
  console.log(coordinates);
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [gender, setGender] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "age") {
      const parsedAge = parseInt(value, 10);
      parsedAge >= 0 ? setAge(parsedAge) : setAge(undefined);
    } else if (name === "gender") {
      setGender(value);
    }
  };

  const submitForm = async () => {
    if (!name || !age || !gender || coordinates.length === 0) {
      setErrorMsg("Täytä kaikki kentät ja valitse siilin sijainti kartalta");
      return;
    }
    setErrorMsg(null);
    try {
      const res = await fetch("/api/v1/hedgehog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          longitude: coordinates[0],
          latitude: coordinates[1],
        }),
      });
      if (!res.ok) return;
      refreshHedgehogs(); //re-fetch hedgehogs
      clearForm();
    } catch (err) {
      console.error(`Error while adding a hedgehog: ${err}`);
    }
  };

  const clearForm = () => {
    setName(undefined);
    setAge(undefined);
    setCoordinates([]);
    setGender("");
    setErrorMsg(null);
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
          label="Ikä vuosina"
          type="number"
          value={age}
          onChange={handleChange}
        />
        <FormControl sx={{  }}>
          <FormLabel
            id="gender-radio-label"
            sx={{
              fontSize: "0.875rem",
              color: "darkslategrey",
              display: "block",
              marginLeft: "1em",
              marginTop: "1em",
            }}
          >
            Sukupuoli
          </FormLabel>
          <RadioGroup row name="gender" value={gender} onChange={handleChange}>
            <StyledFormControlLabel
              value="F"
              control={<Radio size="small" />}
              label="Naaras"
            />
            <StyledFormControlLabel
              value="M"
              control={<Radio size="small" />}
              label="Uros"
            />
          </RadioGroup>
        </FormControl>
        <Typography color="error">{errorMsg}</Typography>
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
