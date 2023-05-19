const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');



app.set('view engine', 'ejs');
app.use('/public', express.static("public"))



const logged = false;

app.get("/", (req, res) => {

res.render("index" , {logged : logged} );


});

app.post("/register", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  // Cesta k souboru JSON
  const filePath = path.join(__dirname, 'data.json');

  // Načtení stávajících dat ze souboru (pokud existují)
  let users = [];
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (!err) {
      try {
        users = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        // Zpracování chyby, pokud obsah souboru není platný JSON
        return res.status(500).send('Nastala chyba při analýze dat.');
      }
    }

    // Kontrola, zda již uživatel existuje
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).send('Uživatel s tímto uživatelským jménem již existuje.');
    }

    // Přidání nového uživatele
    const newUser = {
      username: username,
      password: password
    };
    users.push(newUser);

    // Zápis nových dat do souboru
    const jsonData = JSON.stringify(users);
    fs.writeFile(filePath, jsonData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        // Zpracování chyby, pokud nelze zapsat do souboru
        return res.status(500).send('Nastala chyba při zápisu dat.');
      }

      res.render("index", { logged: logged, username : username });
    });
  });
});


app.post("/login", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  // Cesta k souboru JSON
  const filePath = path.join(__dirname, 'data.json');

  // Načtení dat ze souboru
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      // Zpracování chyby, pokud soubor nelze přečíst
      return res.status(500).send('Nastala chyba při čtení dat.');
    }

    // Pokus o analýzu obsahu souboru jako JSON
    let users;
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      // Zpracování chyby, pokud obsah souboru není platný JSON
      return res.status(500).send('Nastala chyba při analýze dat.');
    }

    // Hledání uživatele podle uživatelského jména a hesla
    const foundUser = users.find(user => user.username === username && user.password === password);
     logged = Boolean(foundUser); // true, pokud byl uživatel nalezen, jinak false

    res.render("index", { logged: logged, username : username });
  });
});
  app.listen(200, function () {
    console.log('running');
  });


