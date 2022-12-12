'use strict';

const { statuscodes, statusmessages} = require('./statusCodes')

const Database = require('./database')
const options = require('./connection')

const sqlQuerys = require('./sqlQuerys')
const getAllFromDatabase = sqlQuerys.searchAll
const getOneFromDatabase = sqlQuerys.search
const addToDatabase = sqlQuerys.add
const updateDatabase = sqlQuerys.update
const removeFromDatabase = sqlQuerys.remove
const primaryKey = sqlQuerys.primaryKey

const { insertParams, updateParams } = require('./parameters')


module.exports = class Datastorage {
    constructor() {
        this.db = new Database(options)
    }

    get statuscodes() {
        return statuscodes
    }

    searchAll() {
        return new Promise(async (res, rej) => {
            try {
                const result = await this.db.performQuery(getAllFromDatabase)
                res(result.queryResult)
            }
            catch(err) {
                console.error(err)
                rej(statusmessages.PROGRAM_ERROR())
            }
        })
    }

    search(productionNumber) {
        return new Promise(async (res, rej) => {
            // tarkistetaan onko productionNumber validi
            if (!productionNumber) {
                rej(statusmessages.NOT_FOUND('--empty--'))
            }
            else {
                try {
                    // suoritetaan kysely
                    const result = await this.db.performQuery(getOneFromDatabase, [productionNumber])
                    if (result.queryResult.length > 0) {
                        res(result.queryResult[0])
                    } else {
                        rej(statusmessages.NOT_FOUND(productionNumber))
                    }
                }
                catch (err) {
                    console.error(err)
                    rej(statusmessages.PROGRAM_ERROR())
                }
            }
        })
    }

    add(newCar) {
        return new Promise(async (res, rej) => {
            // tarkistetaan onko uusi auto validi
            if (!newCar) {
                rej(statusmessages.ADD_ERROR())
            }
            else {
                try {
                    // tarkistetaan onko pääavain validi
                    if (!newCar[primaryKey]) {
                        rej(statusmessages.ADD_ERROR())
                    }
                    else {
                        // suoritetaan kysely pääavaimella
                        const searchresult = await this.db.performQuery(getOneFromDatabase ,newCar[primaryKey])

                        // tarkistetaan onko pääavain jo käytössä
                        if (searchresult.queryResult.length > 0) {
                            rej(statusmessages.ALREADY_IN_USE(newCar[primaryKey]))
                        } else {
                            // suoritetaan kysely
                            const result = await this.db.performQuery(addToDatabase, insertParams(newCar))
                            res(statusmessages.ADD_SUCCESSFUL())
                        }
                    }
                }
                catch(err) {
                    console.error(err)
                    rej(statusmessages.ADD_ERROR())
                }
            }
        })
    }

    update(carsInfo) {
        return new Promise(async (res, rej) => {
            if(carsInfo) {
                try {
                    const status = await this.db.performQuery(updateDatabase, updateParams(carsInfo))

                    if (status.queryResult.affectedRowCount === 0) {
                        res(statusmessages.UPDATE_ERROR())
                    }
                    else {
                        res(statusmessages.UPDATE_SUCCESSFUL())
                    }
                }
                catch(err) {
                    console.error(err)
                    rej(statusmessages.UPDATE_ERROR())
                }
            }
            else {
                rej(statusmessages.UPDATE_ERROR())
            }
        })
    }

    remove(productionNumber) {
        return new Promise(async (res, rej) => {
            if (!productionNumber) {
                rej(statusmessages.REMOVE_ERROR())
            }
            else {
                try {
                    const result = await this.db.performQuery(removeFromDatabase, [productionNumber])

                    if (result.queryResult.affectedRowCount === 0) {
                        rej(statusmessages.REMOVE_ERROR())
                    } else {
                        res(statusmessages.REMOVE_SUCCESSFUL())
                    }
                }
                catch(err) {
                    console.error(err)
                    rej(statusmessages.REMOVE_ERROR())
                }
            }
        })
    }
}