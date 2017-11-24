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
        console.log('received')
        let punteggio = {
            nome: req.body.nome,
            score: req.body.score,
            modalita: req.body.modalita
        }
        db('talpa')
            .insert(punteggio)
            .then((id) => {
                console.log(id)
                res.redirect('/leaderboard')
            })
    })
    .get('/', (req, res) => {
        res.send('ok')
    })
    .get('/leaderboard', (req, res) => {

        db('talpa')
            .where('modalita', '30 sec')
            .then((trenta) => {
                trenta.sort(dynamicSort('score'))
                db('talpa')
                    .where('modalita', '60 sec')
                    .then((sessanta) => {
                        sessanta.sort(dynamicSort('score'))
                        db('talpa')
                            .where('modalita', 'unlimited')
                            .then((unlimited) => {
                                unlimited.sort(dynamicSort('score'))
                                db('talpa')
                                    .where('modalita', 'hardcore')
                                    .then((hardcore) => {
                                        hardcore.sort(dynamicSort('score'))

                                        res.render('classifica', {
                                            trenta,
                                            sessanta,
                                            unlimited,
                                            hardcore
                                        })
                                    })
                            })
                    })
            })
    })


    .listen(3300)
