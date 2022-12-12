'use strict';

// statuskoodit
const statuscodes = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    ADD_SUCCESSFUL: 2,
    ADD_ERROR: 3,
    ALREADY_IN_USE: 4,
    REMOVE_SUCCESSFUL: 5,
    REMOVE_ERROR: 6,
    UPDATE_SUCCESSFUL: 7,
    UPDATE_ERROR: 8
}

// statusviestit
const statusmessages = {
    PROGRAM_ERROR: () => ({
        message: 'Error in program',
        statuscode: statuscodes.PROGRAM_ERROR,
        type: 'error'
    }),
    NOT_FOUND: productionNumber => ({
        message: `No data in database with the production number: ${productionNumber}`,
        statuscode: statuscodes.NOT_FOUND,
        type: 'error'
    }),
    ADD_SUCCESSFUL: () => ({
        message: 'Information added',
        statuscode: statuscodes.ADD_SUCCESSFUL,
        type: 'info'
    }),
    ADD_ERROR: () => ({
        message: 'Error adding information',
        statuscode: statuscodes.ADD_ERROR,
        type: 'error'
    }),
    ALREADY_IN_USE: productionNumber => ({
        message: `Production number: ${productionNumber} already in use`,
        statuscode: statuscodes.ALREADY_IN_USE,
        type: 'error'
    }),
    REMOVE_SUCCESSFUL: () => ({
        message: 'Data removed',
        statuscode: statuscodes.REMOVE_SUCCESSFUL,
        type: 'info'
    }),
    REMOVE_ERROR: () => ({
        message: 'Error removing data (data not found)',
        statuscode: statuscodes.REMOVE_ERROR,
        type: 'error'
    }),
    UPDATE_SUCCESSFUL: () => ({
        message: 'Information upadted successfully',
        statuscode: statuscodes.UPDATE_SUCCESSFUL,
        type: 'info'
    }),
    UPDATE_ERROR: () => ({
        message: 'Information not updated',
        statuscode: statuscodes.UPDATE_ERROR,
        type: 'error'
    })
}

module.exports = {
    statuscodes,
    statusmessages
}