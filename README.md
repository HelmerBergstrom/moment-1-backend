## Moment 1 - Serverbaserad webbutveckling

#### Av Helmer Bergström

## Verktyg

#### GitHub, Visual Studio Code, Ejs, Nodemon, Express, Pg, Env-fil, Render, PostgreSQL.

## Utförande

##### Startade först med att göra ett enkelt ER-diagram och bestämde mig för att köra MySQL som databas, då vi använde denna under tidigare kurs. Skapade databasen via SQL-frågor i mina JavaScript-filer, database.js först och där skapas själva skelettet av tabellen via CREATE TABLE, och kopplade sedan den filen till server.js där raderna läggs in via INSERT, för att skilja på koden. Denna kopplingen gjordes via koden "module.exports" följt av variabelnamnet som jag angett databasens require-kod("client"). Använde view-engine "ejs" och implementerade JavaScript-kod direkt i min HTML-kod för att visa kurser och för att skriva ut error-meddelanden vid fel inmatning i formuläret under addcourse-sidan.

#### Env-fil användes för att lagra känslig information om inloggning/inställningar till databasen. Dessa värden i env-filen skrevs sedan ut till filer med hjälp av "process.env." + namnet på variabeln som jag angett.

#### App.get och app.post användes för att hämta och skicka information mellan och genom sidorna på hemsidan. 

#### Tabellen courses, där informationen om kurser lagras, har en primärnyckel som heter "id", som hjälper till att kontrollera vilken kurs som användaren vill radera vid klick på "Radera"-knappen som är lokaliserad bredvid varje kurs på startsidan. Denna funktion körs även den via app.post, men kör också med res.redirect till samma sida för att visa den uppdaterade listan. I denna funktion körs "DELETE FROM courses WHERE id = $1" vilket gör att den raderar id:t som använder klickat på.

#### Tillslut ändrades databasen från MySQL till PostgreSQL för att enklare kunna publicera hemsidan med Render.