'use strict';

const path = require('path')

const expresss = require('express')
const app = expresss()

const Datastorage = require('./sqlstorage/dataLayer')
const storage = new Datastorage()
const commands = require('./commands')

const port = 8000
const host = 'localhost'


app
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'models'))

    .use(expresss.urlencoded({ extended: false }))
    .use(expresss.static(path.join(__dirname, 'public')))

    .get('/', (req, res) => {
        res.render('menu', commands.menu)
    })

    // search all cars from database and create a table with gotten information
    .get('/searchAll', (req, res) => storage.searchAll()
        .then(resultTable => res.render('table', {
            lang: 'fi',
            title: 'Search all',
            subject: 'Cars',
            info: 'Every car in the database',
            forminfo: '',
            columnTitles: ['Production number', 'Brand', 'Licence', 'Annual model', 'High speed'],
            resultTable,
            send: 'Send data',
            menuscreen: 'Menu'
        }))
        .catch(error => sendStateMessage(res, error)))
    
    // create a form on the page
    .get('/search', (req, res) => {
        res.render('form', commands.searchOne)
    })

    // search one car and show information on the page
    .post('/searchOne', async (req, res) => {
        try {
            const productionNumber = req.body.productionNumber
            const result = await storage.search(productionNumber)
            const fields = []

            for(const [key, data] of Object.entries(result)) {
                const [first,...rest] = key
                const name = first.toUpperCase()+rest.join('')
                fields.push({ name, data, })
            }

            res.render('resultpage', {
                lang: 'fi',
                title: 'Search',
                subject: 'Searched car',
                info: '',
                forminfo: '',
                menuscreen: 'Menu',
                fields
            })
        }
        catch(err) {
            console.error(err)
            sendStateMessage(res, err)
        }
    })

    // create a form on the page that can add a new car to database
    .get('/add', (req, res) => {
        res.render('form', commands.add)
    })

    // save information to database and show status
    .post('/addData', async (req, res) => {
        try {
            const newCar = req.body
            const result = await storage.add(newCar)
            sendStateMessage(res, result)
        }
        catch(err) {
            console.error(err)
            sendStateMessage(res, err)
        }
    })

    // create a form on the page that can update cars information
    .get('/update', (req, res) => {
        res.render('form', commands.update)
    })

    .post('/searchUpdatable', async (req, res) => {
        try {
            console.log(req.body);
            const number = req.body.productionNumber
            const car = await storage.search(number)
            const results = {
                lang: 'en',
                title: 'Change form',
                subject: 'Update cars information',
                info: '',
                forminfo: 'Change cars information',
                func: '/saveData',
                fields : [
                    {
                        label: 'ProductionNumber',
                        name: 'productionNumber',
                        id: 'productionNumber',
                        value: car.productionNumber,
                        readonly: 'readonly'
                    },
                    {
                        label: 'Brand',
                        name: 'brand',
                        id: 'brand',
                        value: car.brand,
                        readonly: ''
                    },
                    {
                        label: 'Licence number',
                        name: 'licence',
                        id: 'licence',
                        value: car.licence,
                        readonly: ''
                    },
                    {
                        label: 'Annual model',
                        name: 'annualModel',
                        id: 'annualModel',
                        value: car.annualModel,
                        readonly: ''
                    },
                    {
                        label: 'High speed',
                        name: 'highSpeed',
                        id: 'highSpeed',
                        value: car.highSpeed,
                        readonly: ''
                    }
                ],
                send: 'Send data',
                menuscreen: 'Menu'

            }

            res.render('form', results)
        }
        catch(err) {
            sendStateMessage(res, err)
        }
    })

    // save changed information to database and show state
    .post('/saveData', (req, res) => storage.update(req.body)
        .then(status => sendStateMessage(res, status))
        .catch(error => sendStateMessage(res, error)))

    // create a form on the page that can remove car from database
    .get('/remove', (req, res) => {
        res.render('form', commands.remove)
    })

    // remove car from database and show state
    .post('/removeCar', (req, res) => storage.remove(req.body.productionNumber)
        .then(status => sendStateMessage(res, status))
        .catch(error => sendStateMessage(res, error)))

    .listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
    })

function sendStateMessage(res, status) {
    res.render('statepage', {
        lang: 'en',
        title: 'Status',
        subject: status.type === 'error'?'Error':'State',
        info: '',
        forminfo: '',
        menuscreen: 'Menu',
        status
    })
}