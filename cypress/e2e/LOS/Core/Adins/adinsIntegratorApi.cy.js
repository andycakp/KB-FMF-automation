import config from '../config.json'
import { faker } from '@faker-js/faker'

const BODY_REQUEST   = require('../../../../fixtures/LOS/Core/Adins/bodyRequest.json')

describe('Adins Integrator API ', function () {

    it('C13501: Response Valid (Data Valid - FR > 8)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['valid_data']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('registered');
            expect(result.name).equal(true);
            expect(result.birth_date).equal(true);
            expect(result.selfie_similarity).equal(9);
            expect(result.selfie_check).equal(true);
            expect(result.liveness).equal(true);
            expect(result.verif_status).equal(true);

            //Create Log
            /* let nik = result.nik
            let name = result.name
            let selfie_similarity = result.selfie_similarity
            let liveness = result.liveness
            let verif_status = result.verif_status
            cy.log('nik : ' + nik )
            cy.log('name : ' + name  )
            cy.log('Selfie Similarity : ' + selfie_similarity )
            cy.log('liveness : ' + liveness  )
            cy.log('verif status : ' + verif_status ) */

        })
    })

    it('C13503: Nik Valid & Full Name Invalid', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_name']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('registered');
            expect(result.name).equal(false);
            expect(result.birth_date).equal(true);
            expect(result.selfie_similarity).equal(9);
            expect(result.selfie_check).equal(true);
            expect(result.liveness).equal(true);
            expect(result.verif_status).equal(false);
        })
    })

    it('C13506: Nik Invalid', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_nik']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('invalid');
            expect(result.name).equal(false);
            expect(result.birth_date).equal(false);
            expect(result.selfie_similarity).equal(0);
            expect(result.selfie_check).equal(false);
            expect(result.liveness).equal(false);
            expect(result.verif_status).equal(false);
        })
    })

    it('C13507: Nik Valid & Birth Date Invalid', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_birth_date']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('registered');
            expect(result.name).equal(true);
            expect(result.birth_date).equal(false);
            expect(result.selfie_similarity).equal(9);
            expect(result.selfie_check).equal(true);
            expect(result.liveness).equal(true);
            expect(result.verif_status).equal(false);
        })
    })

    it('C13515: Error Response from authoritative source', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['unauthoritative_source']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq("upstream_service_error");
            expect(response.body).property("data").to.eq(null);
        })
    })

    it('C13519: Error Invalid response data from authoritative source', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_response_data']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq("upstream_service_error");
            expect(response.body).property("data").to.eq(null);
        })
    })

    it('C13520: Error Quota Exhausted', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['quota_exhausted']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq("access_limited");
            expect(response.body).property("data").to.eq(null);
        })
    })

    it('C13521: Error Gateway timeout', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['gateway_timeout']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(504);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq("upstream_service_timeout");
            expect(response.body).property("data").to.eq(null);
        })
    })

    it('C25133: Error outside access hours', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['outside_access_hour']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq("upstream_service_error");
            expect(response.body).property("data").to.eq(null);
        })
    })

    it('C25134: Nik Inactive', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['inactive_nik']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('inactive');
            expect(result.name).equal(false);
            expect(result.birth_date).equal(false);
            expect(result.selfie_similarity).equal(0);
            expect(result.selfie_check).equal(false);
            expect(result.liveness).equal(false);
            expect(result.verif_status).equal(false);
        })
    })

    it('C25135: Error Deceased user', () => {
        cy.request({
            method: 'POST',
            url: `${config.Adins_url.URL_API_DEV_ADINS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['deceased_user']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - ADINS Verify");
            expect(response.body).property("errors").to.eq(null);
            expect(result.nik).equal('invalid');
            expect(result.name).equal(false);
            expect(result.birth_date).equal(false);
            expect(result.selfie_similarity).equal(0);
            expect(result.selfie_check).equal(false);
            expect(result.liveness).equal(false);
            expect(result.verif_status).equal(false);
        })
    })

})