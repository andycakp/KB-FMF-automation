import config from '../config.json'
import { faker } from '@faker-js/faker'

const BODY_REQUEST   = require('../../../../fixtures/LOS/Core/Faceplus/Compare/bodyRequest.json')

describe('Faceplus Compare Integrator API ', function () {

    var threshold = 50;
    var confidence = 0;

    it('C25981 : Success Compare - Same image', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['same_image']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            confidence = result.confidence > threshold
            
            expect(meta.code).to.eq(200);
            expect(meta.message).to.eq("Operation Successfully Executed");
            expect(confidence).equal(true);
            expect(result.face_token_1).not.null
            expect(result.face_token_2).not.null
        })
    })

    it('C25982 : Success Compare - Different image', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['different_image']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            confidence = result.confidence < threshold
            
            expect(meta.code).to.eq(200);
            expect(meta.message).to.eq("Operation Successfully Executed");
            expect(confidence).equal(true);
            expect(result.face_token_1).not.null
            expect(result.face_token_2).not.null
        })
    })

    it('C25983 : Image Format unsupported', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['image_format_unsupported']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.status).to.eq("Internal Server Error");
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C25984 : Concurrency Limit Exceeded', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['concurrency_limit']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.status).to.eq("Internal Server Error");
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C25985 : Image file size more than 2MB', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['image_more_than_2mb']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.message).to.eq("Validation Error");
            expect(meta.error).eq("Sorry Your Image Is Too Large, it cant be more than 2 MB or 2048 KB");
            expect(result).is.null
        })
    })

    it('C25986 : Internal Server Error', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['Internal_server_error']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.status).to.eq("Internal Server Error");
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C25987 : Error - one of the files is not image file', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_COMPARE_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['one_file_is_not_image']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.status).to.eq("Unprocessable Entity")
            expect(meta.message).to.eq("Validation Error");
            expect(meta.error).eq("One Of Your Image has no face, Please again check Your Image!");
            expect(result).is.null
        })
    })
   
})