var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1'
    , user: 'root'
    , password: ''
    , database: 'facturation'
});
connection.connect();
var express = require('express');
var app = express();
app.use('/style', express.static(__dirname + '/apps/style'));
app.use('/js', express.static(__dirname + '/apps/js'));
app.use('/pages', express.static(__dirname + '/apps/pages'));
//parser en JSON
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/apps/index.html');
});
app.get('/api/liste', function (req, res) {
    var etudiant = 'SELECT*FROM et';
    connection.query(etudiant, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
        }
    });
});
app.post('/api/login', function (req, res) {
    var users = req.body.users;
    var password = req.body.password;
    // insertion des elements dans la BDD
    var user = 'SELECT * FROM utilisateurs WHERE login_utilisateurs= "' + users + '" AND motdepasse_utilisateurs = "' + password + '" ';
    connection.query(user, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            console.log(rows);
        }
    });
});
app.get('/api/listeClient', function (req, res) {
    // insertion des elements dans la BDD
    var listeClient = 'SELECT * FROM client';
    connection.query(listeClient, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            console.log(rows);
        }
    });
});
app.post('/api/ajouterClient', function (req, res) {
    var nomClient = req.body.nom_client;
    var prenomClient = req.body.prenom_client;
    var entrepriseClient = req.body.entreprise_client;
    // insertion des elements dans la BDD
    var ajoutClient = 'INSERT INTO client(nom_client, prenom_client, entreprise_client) VALUES ("' + nomClient + '","' + prenomClient + '","' + entrepriseClient + '")';
    connection.query(ajoutClient, function (err) {
        if (err) {
            res.send('table inexistante');
            console.log('err');
        }
    });
});
// Afficher la liste des Articles 
app.get('/api/listeArticle', function (req, res) {
    // insertion des elements dans la BDD
    var listeArticle = 'SELECT * FROM article';
    connection.query(listeArticle, function (err, rows, fields) {
        if (err) {
            res.send('table inexistante');
        }
        else {
            res.json(rows);
            console.log(rows);
        }
    });
});

// Modification Client 
app.post('/api/modifierClient', function (req, res) {
    var id_mod = req.body.id_client,
        nom_mod = req.body.nom_client,
        prenom_mod = req.body.prenom_client,
        entreprise_mod = req.body.entreprise_client;
    var modifClient = 'UPDATE client SET nom_client="'+ nom_mod +'",prenom_client="'+ prenom_mod +'",entreprise_client="'+ entreprise_mod +'" WHERE id_client ="'+ id_mod +'"';
    connection.query(modifClient, function (err) {
        if (err) {
            res.send('table inexistante');
            console.log('err');
        }
    });
});

//Suppression Client
app.get('/api/supprimerClient/:id', function (req, res) {
   var id_supp = req.params.id;
   var suppClient = 'DELETE FROM client WHERE id_client="'+ id_supp +'"';
   connection.query(suppClient, function (err) {
       if (err) {
            res.send('table inexistante');
            console.log('err');
        }
    });
});

app.listen(7070);