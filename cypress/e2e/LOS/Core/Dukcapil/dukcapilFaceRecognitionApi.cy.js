import config from '../config.json'
import { faker } from '@faker-js/faker'

const BODY_REQUEST   = require('../../../../fixtures/LOS/Core/Dukcapil/FR/bodyRequest.json')

describe('Dukcapil Face Recognition API ', function () {

    it('C6129 : Response Valid (Data Valid - FR > 8)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['nik_dan_foto_sesuai']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.nik_dan_foto_sesuai.transaction_id);
            expect(result.rule_code).equal("6018");
            expect(result.reason).equal("EKYC Sesuai");
            expect(result.threshold).equal(BODY_REQUEST.nik_dan_foto_sesuai.threshold);

        })
    })

    it('C6131 : Pengecekan data fr dengan nik yg sesuai dan image yang salah (foto orang lain)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['nik_sesuai_foto_tidak']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.nik_sesuai_foto_tidak.transaction_id);
            expect(result.rule_code).equal("6019");
            expect(result.reason).equal("Foto Tidak Sesuai");
            expect(result.threshold).equal(BODY_REQUEST.nik_sesuai_foto_tidak.threshold);

        })
    })

    it('C6132 : Pengecekan data fr dengan nik (orang lain) dan image yang sesuai (.png)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['nik_beda_foto_sesuai']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.nik_beda_foto_sesuai.transaction_id);
            expect(result.rule_code).equal("6020");
            expect(result.reason).equal("NIK Tidak ditemukan");
            expect(result.threshold).equal(BODY_REQUEST.nik_beda_foto_sesuai.threshold);

        })
    })

    it('C6133 : Pengecekan data fr dengan user_id dan password tidak sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_user']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Akun Tidak Ditemukan.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })
    
    it('C6134 : Pengecekan data fr dengan ip tidak sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_ip']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - IP Tidak Sesuai.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6135 : Pengecekan data fr dengan treshold<5', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['threshold_tidak_sesuai']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Threshold tidak sesuai.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6137 : Pengecekan data fr melebihi kuota (>30)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['kuota_habis']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Kuota Hari Ini Habis, Silahkan Dicoba Esok Hari.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6138 : Pengecekan data fr dengan nik gagal didecrypt', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['nik_gagal_decrypt']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Data gagal didecrypt.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6139 : Pengecekan data fr dengan sistem sibuk', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['sistem_sibuk']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Sistem Sibuk.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6140 : Pengecekan data fr dengan parameter tidak sesuai (parameter tidak sesuai tipe data)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_FR_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['parameter_tidak_sesuai']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - Dukcapil Face Recognition - Parameter tidak sesuai.");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

})