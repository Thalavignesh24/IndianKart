const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const TemplateModel = require('../../Models/TemplateSchema/TemplateModel');
const TimezoneModel = require('../../Models/AdminSchema/TimezoneModel');
const CountryModel = require('../../Models/AdminSchema/CountryModel');
const StateModel = require('../../Models/AdminSchema/StateModel');
const excel = require('exceljs');
const Utlis = require('../../Helpers/Utils');
const fs = require('fs');
const path = require('path');
const { isNumberObject } = require('util/types');
require('mongoose-pagination');


function AdminManagement() {

    this.CustomerExcel = async (req, res) => {
        try {
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet("customers");
            const path = '/Users/apple/Desktop/IndianKart/OnlineShopping/ExcelSheets';
            worksheet.columns = [
                { header: "S.No", key: "sno" },
                { header: "CustomerName", key: "CustomerName" },
                { header: "CustomerEmail", key: "CustomerEmail" },
                { header: "MobileNumber", key: "CustomerMobile" }
            ];
            let count = 1;
            const ct = await (CustomerModel.find());
            ct.forEach((ct) => {
                ct.sno = count;
                worksheet.addRow(ct);
                count++;
            });
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            });

            const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
                .then(() => {
                    res.send({
                        status: "success",
                        message: "file successfully downloaded",
                        path: `${path}/users.xlsx`,
                    });
                });
        } catch (exception) {
            console.log(exception.message);
        }

    }

    this.addTemplates = async (req, res) => {
        try {
            const { FileName, EmailSubject, EmailType } = req.body;
            const Template = new TemplateModel({
                FileName, EmailSubject, EmailType
            });
            const TemplatesFile = await Template.save();
            if (!TemplatesFile)
                return res.send("Failed To Add Templates");
            else
                return res.send("Template Added SuccessFully");

        } catch (error) {
            console.log(error.message);
        }
    }

    this.addTimeZone = async (req, res) => {

        try {
            const TimezoneData = JSON.parse(fs.readFileSync(path.join('./timezones.json'), 'utf-8'));
            let data_count = TimezoneData.length;
            let Data_Id = TimezoneData.map(values => { return delete values._id });
            let data = await TimezoneModel.create(TimezoneData);
            if (data) {
                res.send("data added successFully");
            }
            res.send("Failed To add data");

        } catch (error) {
            res.send(error);
            console.log(error.message);
        }

    }

    this.timezoneList = async (data, res) => {

        try {
            let page = (parseInt(data.page) === 0) || (isNaN(parseInt(data.page)) === true) ? 1 : parseInt(data.page);
            let limit = (parseInt(data.page) == 0) || (isNaN(parseInt(data.limit)) === true) ? 10 : parseInt(data.limit);
            let search_type = "string" === typeof data.search_type ? (String(data.search_type).trim().length > 0 ? String(data.search_type).trim() : "") : "";
            let search_term = "string" === typeof data.search_term ? (String(data.search_term).trim().length > 0 ? String(data.search_term).trim() : "") : "";

            let selected = { _id: 0, __v: 0 };
            let sorted = { createdAt: -1 };

            let find = [search_type];
            let searchQuery = [];
            let searchData = {};
            searchData[find] = { $regex: new RegExp(search_term, "i") };
            searchQuery.push(searchData);
            data['$or'] = searchQuery;
            data['delete_status'] = { $ne: 1 }

            let result = await TimezoneModel.find(data, selected).sort(sorted).paginate(page, limit);
            if (Utlis.empty(result)) {
                return res.send("No records found");
            }
            let totalCount = 0;
            totalCount = await TimezoneModel.count({ delete_status: 0 })
            let totalPages = Number.isInteger(totalCount / limit) ? (totalCount / limit) : (parseInt((totalCount / limit)) + 1);
            let timezoneLookups = {
                timezonelookup: result,
                total_pages: totalPages,
                total_count: totalCount,
                page: page,
            };
            return res.send(timezoneLookups);

        } catch (err) {
            console.log(err);
            return res.send('Something went wrong');
        }
    }

    this.countryCode = async (req, res) => {
        let x = countryCodeToFlagEmoji('US');
        console.log(x);
    }

    this.addCountry = async (req, res) => {
        let addCountryData = JSON.parse(fs.readFileSync(path.join('./countries.json'), 'utf-8'));
        let data = addCountryData.map(values => {
            return delete values._id,
                delete values.createdAt,
                delete values.updatedAt,
                values.countryId = Utlis.uuid(),
                delete values.status,
                values.flag = values.twoDigtCode
        });
        let added = await CountryModel.create(addCountryData);
        if (added) {
            res.send("Country Added SuccessFully");
        }
        else {
            res.send("Failed To Add Country");
        }

    }

    this.addState = async (req, res) => {
        let countryData = await CountryModel.findOne({ countryId: "7314eb4d-1f1d-47b7-be0e-565ea6d5b96a" });
        let stateFile = JSON.parse(fs.readFileSync(path.join('./state.json'), 'utf-8'));

        let stateData = stateFile.map(values => {
            return values = {
                "country.id": countryData.countryId,
                "country.name": countryData.countryName,
                "stateName": values.name,
                "stateCode": values.code,
                "stateId": Utlis.uuid()
            };
        });
        let state = await StateModel.create(stateData);
        if (state) {
            res.send("State Data inserted");
        }

    }

}

module.exports = new AdminManagement();