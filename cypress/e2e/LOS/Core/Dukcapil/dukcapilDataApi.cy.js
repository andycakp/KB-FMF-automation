import config from '../config.json'
import { faker } from '@faker-js/faker'

const BODY_REQUEST   = require('../../../../fixtures/LOS/Core/Dukcapil/Verify_Data/bodyRequest.json')

describe('Dukcapil Verify Data API ', function () {

    it('C6032 : Pengecekan NIK, Nama Lengkap, Tanggal Lahir, dan Nama Ibu Kandung memenuhi Kriteria (Treshold 100)', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['valid_data']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.valid_data.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.valid_data.threshold);
            expect(result.nama_lgkp).equal(100);
            expect(result.nama_lgkp_ibu).equal(100);
            expect(result.tgl_lhr).equal("Sesuai");
            expect(result.nik).equal("Sesuai");

        })
    })

    it('C6034 : Pengecekan dengan NIK yg tidak terdaftar di Dukcapil', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_nik']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.invalid_nik.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.invalid_nik.threshold);
            expect(result.is_valid).equal(false);
            expect(result.reason).equal("Data Not Found");
        })
    })

    it('C6035 : Pengecekan Ibu Kandung Tidak Sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_mother_name']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.invalid_mother_name.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.invalid_mother_name.threshold);
            expect(result.nama_lgkp).equal(100);
            expect(result.nama_lgkp_ibu).equal(40);
            expect(result.tgl_lhr).equal("Sesuai");
            expect(result.nik).equal("Sesuai");

        })
    })

    it('C6036 : Pengecekan Nama Tidak Sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_name']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.invalid_name.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.invalid_name.threshold);
            expect(result.nama_lgkp).equal(40);
            expect(result.nama_lgkp_ibu).equal(100);
            expect(result.tgl_lhr).equal("Sesuai");
            expect(result.nik).equal("Sesuai");

        })
    })

    it('C6038 : Pengecekan Tanggal Lahir Tidak Sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_birth_date']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.invalid_birth_date.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.invalid_birth_date.threshold);
            expect(result.nama_lgkp).equal(100);
            expect(result.nama_lgkp_ibu).equal(100);
            expect(result.tgl_lhr).equal("Tidak Sesuai");
            expect(result.nik).equal("Sesuai");

        })
    })

    it('C6039 : Pengecekan data yg NIK ditemukan namun pemilik meninggal dunia', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['pemilik_meninggal']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.pemilik_meninggal.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.pemilik_meninggal.threshold);
            expect(result.is_valid).equal(false);
            expect(result.reason).equal("Customer Meninggal Dunia");
        })
    })

    it('C6040 : Pengecekan data yg NIK ditemukan namun data ganda', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['data_ganda']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.data_ganda.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.data_ganda.threshold);
            expect(result.is_valid).equal(false);
            expect(result.reason).equal("Data Ganda");
        })
    })
    
    it('C6041 : Pengecekan data yg NIK ditemukan namun data tidak aktif', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['inactive_nik']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(200);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data");
            expect(response.body).property("errors").to.eq(null);
            expect(result.transaction_id).equal(BODY_REQUEST.inactive_nik.transaction_id);
            expect(result.threshold).equal(BODY_REQUEST.inactive_nik.threshold);
            expect(result.is_valid).equal(false);
            expect(result.reason).equal("Data Inactive");
        })
    })

    it('C6042 : Pengecekan data dengan payload tidak lengkap', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['payload_tidak_lengkap']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - Parameter Tidak Lengkap / Tidak Valid");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6044 : Pengecekan data Login gagal', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['login_gagal']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - Login Gagal");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6045 : Pengecekan data IP Tidak Sesuai', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['invalid_ip']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - IP Tidak Sesuai");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6046 : Pengecekan data Kuota Telah Habis', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['kuota_habis']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - Kuota Akses Hari Ini Telah Habis");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6047 : Pengecekan data user id tidak aktif', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['userid_tidak_aktif']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - User ID Tidak Aktif");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6048 : Pengecekan user, password, IP kosong', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['user_password_kosong']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - User, password dan IP tidak boleh kosong");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

    it('C6049 : Pengecekan data instansi tidak aktif', () => {
        cy.request({
            method: 'POST',
            url: `${config.Dukcapil_url.URL_API_DEV_VD_DUKCAPIL}`,
            failOnStatusCode: false,   
            body : BODY_REQUEST['instansi_tidak_aktif']
        }).as('payload')

        cy.get('@payload').then((response) => {
            let result = response.body.data
            expect(response.status).to.eq(503);
            expect(response.body).property("messages").to.eq("LOS - DUKCAPIL Verify Data - Instansi Tidak Aktif");
            expect(response.body).property("errors").to.eq("service_unavailable");
        })
    })

})