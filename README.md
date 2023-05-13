# Ubigu coding exercise

## Application components

The application consists of three main component: server (Node.js), database (PostgreSQL / PostGIS ) and client (React, OpenLayers)

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

## Harjoitustyön tavoite

Tehtävänantona on täydentää jo olemassa olevaa siili-tietomallia kattamaan yksilöivän id:n lisäksi siilin nimi, ikä sekä sukupuoli.
