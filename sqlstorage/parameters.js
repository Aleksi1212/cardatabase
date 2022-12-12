const insertParams = car => [
    +car.productionNumber, car.brand, car.licence, +car.annualModel, +car.highSpeed 
]

const updateParams = car => [
    car.brand, car.licence, +car.annualModel, +car.highSpeed, +car.productionNumber
]

module.exports = {
    insertParams,
    updateParams
}