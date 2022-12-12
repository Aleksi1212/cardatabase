'use strict';

const toiminnot = {
    menu: {
        lang: "en",
        title: "Menu",
        subject: "Menu",
        menuscreen: '',
        info: '',
        forminfo: '',
        options: [
           { path: "/searchAll", text: "Search all cars" },
           { path: "/search", text: "Search car" },
           { path: "/add", text: "Add car" },
            {path: "/update", text: "Update cars data" },
            {path: "/remove", text: "Remove cars data" }
        ]
    },

    searchOne : {
        lang: "en",
        title: "Hae",
        subject: "Search car",
        info: '',
        forminfo: 'Search one car from database',
        func: "/searchOne",
        menuscreen: "Menu",
        send: "Search car",
        fields: [
            {
                label: "Production number",
                name: "productionNumber",
                id: "productionNumber",
                value: "",
                readonly: ""
            }
        ]
    },

    add: {
        lang: "en",
        title: "Input form",
        subject: "New car",
        info: '',
        forminfo: 'Add new car into database',
        func: "/addData",
        menuscreen: "Menu",
        send: "Add data",
        fields: [
            {
                label: "Production number",
                name: "productionNumber",
                id: "productionNumber",
                value: "",
                readonly: ""
            },
            {
                label: "Brand",
                name: "brand",
                id: "brand",
                value: "",
                readonly: ""
            },
            {
                label: "Licence number",
                name: "licence",
                id: "licence",
                value: "",
                readonly: ""
            },
            {
                label: "Annual model",
                name: "annualModel",
                id: "annualModel",
                value: "",
                readonly: ""
            },
            {
                label: "High speed",
                name: "highSpeed",
                id: "highSpeed",
                value: "",
                readonly: ""
            }
        ]
    },

    update: {
        lang: "en",
        title: "Change form",
        subject: "Update cars information",
        info: '',
        forminfo: 'Insert cars annual model',
        func: "/searchUpdatable",
        menuscreen: "Menu",
        send: "Update data",
        fields: [
            {
                label: "Production number",
                name: "productionNumber",
                id: "productionNumber",
                value: "",
                readonly: ""
            },
            {
                label: "Brand",
                name: "brand",
                id: "brand",
                value: "*****",
                readonly: "readonly"
            },
            {
                label: "Licence number",
                name: "licence",
                id: "licence",
                value: "*****",
                readonly: "readonly"
            },
            {
                label: "Annual model",
                name: "annualModel",
                id: "annualModel",
                value: "*****",
                readonly: "readonly"
            },
            {
                label: "High speed",
                name: "highSpeed",
                id: "highSpeed",
                value: "*****",
                readonly: "readonly"
            }
        ]
    },

    remove: {
        lang: "en",
        title: "Remove",
        subject: "Remove car",
        info: '',
        forminfo: '',
        func: "/removeCar",
        menuscreen: "Menu",
        send: "Remove data",
        fields: [
            {
                label: "Production number",
                name: "productionNumber",
                id: "productionNumber",
                value: "",
                readonly: ""
            }
        ]
    }
}

module.exports = toiminnot