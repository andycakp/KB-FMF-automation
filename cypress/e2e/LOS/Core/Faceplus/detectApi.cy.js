import config from '../config.json'
import { faker } from '@faker-js/faker'

const BODY_REQUEST   = require('../../../../fixtures/LOS/Core/Faceplus/Detect/bodyRequest.json')

describe('Faceplus Detect Integrator API ', function () {

    var threshold = 50;
    var value = 0;

    it('C25929 : Sukses Detect - image not blur', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['image_not_blur']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            value = result.blur_value < threshold
            
            expect(meta.code).to.eq(200);
            expect(meta.message).to.eq("Operation Successfully Executed");
            expect(value).equal(true);
            expect(result.face_token).not.null
        })
    })

    it('C25930 : Sukses Detect - Image Blur', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['image_blur']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            value = result.blur_value > threshold
            
            expect(meta.code).to.eq(200);
            expect(meta.message).to.eq("Operation Successfully Executed");
            expect(value).equal(true);
            expect(result.face_token).not.null
        })
    })

    it('C25931 : Image Format unsupported', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['image_format_unsupported']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C25932 : Concurrency Limit Exceeded', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['Concurrency_limit_exceeded']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C25933 : Image file size more than 2MB', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['file_more_than_2mb']
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

    it('C25934 : Internal Server Error', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['Internal_server_error']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(500);
            expect(meta.message).to.eq("Oops, Something Went Wrong");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })

    it('C26818 : Error - Foto Muka Terlalu Blur / Face not detected', () => {

        cy.request({
            method: 'POST',
            url: `${config.Faceplus_url.URL_API_DEV_DETECT_FACEPLUS}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['face_not_detected']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            let meta = response.body.meta
            
            expect(meta.code).to.eq(400);
            expect(meta.message).to.eq("Your Image has no face");
            expect(meta.error).eq("We are Sorry, The Service Is Not Available Right Now");
            expect(result).is.null
        })
    })
   
})