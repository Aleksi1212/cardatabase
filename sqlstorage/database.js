'use strict';

const mariadb = require('mariadb')

module.exports = class Database {
    constructor(con) {
        this.con = con
    }

    performQuery(sql, params) {
        return new Promise(async (res, rej) => {
            let connection
            try {
                
                connection = await mariadb.createConnection(this.con) // connect to database with given constructor attribute
                let queryResult = await connection.query(sql, params) // query database with given information

                // check if query was successful
                if (typeof queryResult === 'undefined') {
                    rej('Query error')
                }
                else if (typeof queryResult.affectedRows === 'undefined') {
                    delete queryResult.meta
                    res({ queryResult, resultGroup: true})
                }
                else {
                    res({
                        queryResult: {
                            affectedRowCount: queryResult.affectedRows,
                            insertId: queryResult.insertId,
                            status: queryResult.warningStatus 
                        },
                        resultGroup: false
                    })
                }

            } catch (err) {
                rej(`SQL-error ${err}`)
            }
            finally {
                if (connection) {
                    connection.end()
                }
            }
        })
    }
}