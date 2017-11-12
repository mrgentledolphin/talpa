const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(express.static(__dirname + '/views'))
    .set('view engine', 'hjs')
    .post('/addNew', (req, res) => {
        let punteggio = {
            nome: req.body.nome,
            score: req.body.score
        }
        db('talpa')
            .insert(punteggio)
            .then((id) => {
                console.log(id)
                res.redirect('/leaderboard')
            })
    })

    .get('/leaderboard', (req, res) => {
        db('talpa')
            .then((classifica) => {
                classifica.sort(dynamicSort('score'))
                res.render('classifica', {
                    classifica
                })
            })
    })


    .listen(3300)
