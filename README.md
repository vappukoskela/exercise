# Ubigu koodiharjoitustyö

## Sovelluksen osat

Sovellus koostuu kolmesta komponentista: serveri/api-rajapinta (Node.js / Fastify), tietokanta (PostgreSQL / PostGIS) sekä käyttöliittymä (React, MUI, OpenLayers).

## Sovelluksen käynnistäminen

`server` -kansion juuresta löytyy ympäristömuuttujille varattu tiedosto `.template.env`. Tästä tiedostosta tulee luoda koptio samaiseen kansioon nimellä `.env`, jotta sovellus saa tarvittavat ympäristömuuttujat käyttöönsä.

Buildaa sovellus dockerilla (komentoriviltä ajettaessa)

```
docker compose build
```

Käynnistä sovellus:

```
docker compose up -d
```

Näiden jälkeen tulisi olla kullekin sovelluksen komponentille (server, client, db) oma docker-kontti ajossa. Yksittäisen kontin saa käynnistettyä uudelleen komennolla. Esimerkiksi serverin tapauksessa:

```
docker compose restart server
```

Sovelluksen ollessa käynnissä, voidaan tietokantamigraatiot ajaa komennolla:

```
docker compose exec server npm run db-migrate
```

Ajettavat migraatiot löytyvät kansiosta `/server/db_migrations`. Mikäli teet muutoksia tietokantaan, tee se luomalla uusi migraatiotiedosto johon sisällytät SQL-koodit, jonka jälkeen voit ajaa ylläolevan migraatioajon uudelleen.

Konttien logeja voi seurailla ajamalla komennon:

```
docker compose logs -f <kontin nimi>
```

## Harjoitustyön tavoite

Tehtävänantona on täydentää jo olemassa olevaa siili-tietomallia kattamaan yksilöivän id:n lisäksi siilin nimi, ikä, sukupuoli sekä sijainti, jossa siili havaittiin.
Sovelluksen käyttämä siili-tyyppi löytyy `/shared/` -kansion alta. Tätä tyyppiä tulee laajentaa käsittämään uudet kentät.

Kun olet laajentanut siilien tietomallia vaadituilta osin, muuta siilien listausta siten, että listalla esitetään siilin nimi, ja nimeä klikkaamalla ko. siilin ID tulee valituksi. Tämä ID tulee välittää täältä komponentista komponentille `<HedgehogInfo>`, jossa valitun siilin tiedot esitetään. Mikäli yksittäisen siilin tiedot on valittuna, näytetään ko. siilin sijainti kartalla.

Toteuta komponetti `<HedgehogForm>`, jossa uusia siilihavaintoja voidaan rekisteröidä. Siilin koordinaatit saadaan välittyvät tälle komponentille karttaa klikatessa.
