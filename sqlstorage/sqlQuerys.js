'use strict';

const querys = {
    searchAll: "SELECT * FROM cars",
    search: "SELECT * FROM cars WHERE productionNumber=?",
    add: "INSERT INTO cars VALUES(?, ?, ?, ?, ?)",
    update: "UPDATE cars SET brand=?, licence=?, annualModel=?, highSpeed=? WHERE productionNumber=?",
    remove: "DELETE FROM cars WHERE productionNumber=?",
    primaryKey: "productionNumber"
}

module.exports = querys