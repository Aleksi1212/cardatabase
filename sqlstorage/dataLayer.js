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
            // show error
            catch(err) {
                console.error(err)
                rej(statusmessages.PROGRAM_ERROR())
            }
        })
    }

    search(productionNumber) {
        return new Promise(async (res, rej) => {
            // check if production number is valid
            if (!productionNumber) {
                rej(statusmessages.NOT_FOUND('--empty--'))
            }
            else {
                try {
                    // perform query
                    const result = await this.db.performQuery(getOneFromDatabase, [productionNumber])
                    if (result.queryResult.length > 0) {
                        res(result.queryResult[0])
                    } else {
                        rej(statusmessages.NOT_FOUND(productionNumber))
                    }
                }
                // show error
                catch (err) {
                    console.error(err)
                    rej(statusmessages.PROGRAM_ERROR())
                }
            }
        })
    }

    add(newCar) {
        return new Promise(async (res, rej) => {
            // check if new car is valid
            if (!newCar) {
                rej(statusmessages.ADD_ERROR())
            }
            else {
                try {
                    // check if cars primary key is valid
                    if (!newCar[primaryKey]) {
                        rej(statusmessages.ADD_ERROR())
                    }
                    else {
                        // perform query with primary key
                        const searchresult = await this.db.performQuery(getOneFromDatabase ,newCar[primaryKey])

                        // tcheck if primary key is already in use
                        if (searchresult.queryResult.length > 0) {
                            rej(statusmessages.ALREADY_IN_USE(newCar[primaryKey]))
                        } else {
                            // perform query with new cars data
                            const result = await this.db.performQuery(addToDatabase, insertParams(newCar))
                            res(statusmessages.ADD_SUCCESSFUL())
                        }
                    }
                }
                // show error
                catch(err) {
                    console.error(err)
                    rej(statusmessages.ADD_ERROR())
                }
            }
        })
    }

    update(carsInfo) {
        return new Promise(async (res, rej) => {
            // check if cars information is valid
            if(carsInfo) {
                try {
                    // perform query
                    const status = await this.db.performQuery(updateDatabase, updateParams(carsInfo))

                    // check if update changed database
                    if (status.queryResult.affectedRowCount === 0) {
                        res(statusmessages.UPDATE_ERROR())
                    }
                    else {
                        res(statusmessages.UPDATE_SUCCESSFUL())
                    }
                }
                // show error
                catch(err) {
                    console.error(err)
                    rej(statusmessages.UPDATE_ERROR())
                }
            }
            // if cars information isn't valid show error
            else {
                rej(statusmessages.UPDATE_ERROR())
            }
        })
    }

    remove(productionNumber) {
        return new Promise(async (res, rej) => {
            // check if production number is valid
            if (!productionNumber) {
                rej(statusmessages.REMOVE_ERROR())
            }
            else {
                try {
                    // perform query
                    const result = await this.db.performQuery(removeFromDatabase, [productionNumber])

                    // see if query changed database
                    if (result.queryResult.affectedRowCount === 0) {
                        rej(statusmessages.REMOVE_ERROR())
                    } else {
                        res(statusmessages.REMOVE_SUCCESSFUL())
                    }
                }
                // show error
                catch(err) {
                    console.error(err)
                    rej(statusmessages.REMOVE_ERROR())
                }
            }
        })
    }
}