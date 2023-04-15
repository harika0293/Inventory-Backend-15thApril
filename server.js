"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express/lib/response");

const request = require("request").defaults({ rejectUnauthorized: false });
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9009;

// //Base64
// const base64 = require("base64topdf");

// let decodedBase64 = base64.base64Decode(
//   "c3RhY2thYnVzZS5jb20=",
//   "PdfFileNameToWrite"
// );
// //console.log("object", decodedBase64);
// // method 1
// let data = "c3RhY2thYnVzZS5jb20=";
// let buff = new Buffer.from(data, "base64");
// let text = buff.toString("ascii");
// //console.log(text);
// // method2
// let token = "ewphOiAiMDA4MDc4ODg4NjU4OTM2IiwKYjogIlJFQSIKfQ==";
// let decoded = Buffer.from(token, "base64").toString();
// //console.log(decoded);


//Coding app.use
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const myURL = new URL("http://192.168.1.102:8082");
app.listen(port, "0.0.0.0", () => {
  console.log(`server started on port ${port}`);
});

// app.get("/", (req, res) => {
//   res.send("Hello, This is the server Port of Inventory Distribution");
// });
//Authorization APIs
//1. PRD Authorization APIs
app.post("/api/authorizePRD", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let prdAuthStatus = req.body.AoneStatusPrd;
  let loginDate = req.body.LoginDate;
  let loginTime = req.body.LoginTime;
  let moduleName = "ProductionOrder";
  //Apply Filter Data
  let ApplyFilterDate = req.body.ApplyFilterDate;
  let ApplyFilterTime = req.body.ApplyFilterTime;
  let status = req.body.status;
  let warehouse = req.body.whsid;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  let fromDateOne = req.body.fromDateOne5;
  let toDateTwo = req.body.toDateTwo6;
    //Add ITR Data
    let AddITRDate = req.body.AddITRDate;
    let AddITRTime = req.body.AddITRTime;
    let docNum1 = req.body.docNum1;

  if (fromDateOne === "" || fromDateOne === undefined || fromDateOne === null) {
    fromDateOne = "string";
  }
  if (toDateTwo === "" || toDateTwo === undefined || toDateTwo === null) {
    toDateTwo = "string";
  }
  if (status === "" || status === undefined || status === null) {
    status = "";
  }
  if (warehouse === "" || warehouse === undefined || warehouse === null) {
    warehouse = "";
  }
  if (series === "" || series === undefined || series === null) {
    series = 0;
  }
  if (docNum === "" || docNum === null || docNum === undefined) {
    docNum = 0;
  }
  if (prdAuthStatus == true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Production Order",
    });
    console.log(
      `"WeaveTech UserName ${name} with email ${email} is using Production Order Module"`
    );
  }
  if (prdAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use Production Order",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Production Order Module..Please Contact Him"`
    );
  }
  if(ApplyFilterDate){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
  if(docNum1){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }

});
//2. GRN Authorization APIs
app.post("/api/authorizeGRN", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let grnAuthStatus = req.body.BtwoStatusGrn;
  //
  let loginDate = req.body.LoginDate;
  let loginTime = req.body.LoginTime;
  //
  let ApplyFilterDate = req.body.ApplyFilterDate;
  let ApplyFilterTime = req.body.ApplyFilterTime;
  //
  let AddITRDate = req.body.AddITRDate;
  let AddITRTime = req.body.AddITRTime;
  let docNum1 = req.body.docNum1;
  //

  if (grnAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use GRN",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using GRN Module"`
    );
  }
  if (grnAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use GRN",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using GRN Module..Please Contact Him"`
    );
  }
  if(ApplyFilterDate){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
  if(docNum1){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
});
//3. ITR Manual Authorization APIs
app.post("/api/authorizeITRManual", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ITRManualAuthStatus = req.body.CthreeStatusITRManual;
   //
   let loginDate = req.body.LoginDate;
   let loginTime = req.body.LoginTime;
   //
   let ApplyFilterDate = req.body.ApplyFilterDate;
   let ApplyFilterTime = req.body.ApplyFilterTime;
   //
   let AddITRDate = req.body.AddITRDate;
   let AddITRTime = req.body.AddITRTime;
   let docNum = req.body.docNum;
   //

  if (ITRManualAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use ITR Manual",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using ITR Manual"`
    );
  }
  if (ITRManualAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use ITR Manual",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using ITR Manual...Please Contact Him"`
    );
  }
  if(docNum){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
});
//4. ITR Authorization APIs
app.post("/api/authorizeITR", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ITRAuthStatus = req.body.DfourStatusITR;
     //
     let loginDate = req.body.LoginDate;
     let loginTime = req.body.LoginTime;
     //
     let ApplyFilterDate = req.body.ApplyFilterDate;
     let ApplyFilterTime = req.body.ApplyFilterTime;
     //
     let AddITRDate = req.body.AddITRDate;
     let AddITRTime = req.body.AddITRTime;
     let docNum1 = req.body.docNum1;
     //
  if (ITRAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use ITR",
    });
    console.log(`"WeaveTech User ${name} with email ${email} is using ITR"`);
  }
  if (ITRAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use ITR",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using ITR...Please Contact Him"`
    );
  }
  if(ApplyFilterDate){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
  if(docNum1){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
});
//5. IT Authorization APIs
app.post("/api/authorizeIT", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ITAuthStatus = req.body.EfiveStatusIT;
   //
   let loginDate = req.body.LoginDate;
   let loginTime = req.body.LoginTime;
   //
   let ApplyFilterDate = req.body.ApplyFilterDate;
   let ApplyFilterTime = req.body.ApplyFilterTime;
   //
   let AddITRDate = req.body.AddITRDate;
   let AddITRTime = req.body.AddITRTime;
   let docNum1 = req.body.docNum1;
   //
  if (ITAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use IT",
    });
    console.log(`"WeaveTech User ${name} with email ${email} is using IT"`);
  }
  if (ITAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use IT",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using IT...Please Contact Him"`
    );
  }
  if(ApplyFilterDate){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
  if(docNum1){
    res.send({
      statusCode: "200",
      status: "Success...Inserted",
    });
  }
});
//6. Reports Authorization APIs
app.post("/api/authorizeReports", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ReportsAuthStatus = req.body.FsixStatusReports;
  if (ReportsAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Reports",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using Reports"`
    );
  }
  if (ReportsAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use Reports",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Reports...Please Contact Him"`
    );
  }
});
//6.1. Reports-ITR Print Layout Authorization APIs
app.post("/api/authorizeReportsITRPrintLayout", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ReportsITRPrintLayoutAuthStatus = req.body.GsixAReportsITRPrintLayout;
  if (ReportsITRPrintLayoutAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Reports-ITR Print Layout",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using Reports-ITR Print Layout"`
    );
  }
  if (ReportsITRPrintLayoutAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use Reports-ITRPrintLayoutAuthStatus",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Reports-ITRPrintLayout...Please Contact Him"`
    );
  }
});
//6.2. Reports-ITR Print Layout with BarCode Authorization APIs
app.post("/api/authorizeReportsITRPLwithBarcode", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ReportsITRPLwithBarCodeAuthStatus = req.body.HsixBReportsITRPLwithBarcode;
  if (ReportsITRPLwithBarCodeAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Reports-ITR Print Layout with BarCode",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using Reports-ITR Print Layout with BarCode"`
    );
  }
  if (ReportsITRPLwithBarCodeAuthStatus === false) {
    res.send({
      statusCode: "500",
      status:
        "You are not authorized to use Reports-ITRPrintLayout with BarCode",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Reports-ITRPrintLayout with BarCode...Please Contact Him"`
    );
  }
});
//6.3. Reports-IT Layout Authorization APIs
app.post("/api/authorizeReportsITLayout", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ReportsITLayoutAuthStatus = req.body.IsixCReportsITLayout;
  if (ReportsITLayoutAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Reports-IT Layout",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using Reports-IT Layout"`
    );
  }
  if (ReportsITLayoutAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use Reports-IT Layout",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Reports-IT Layout...Please Contact Him"`
    );
  }
});
//6.4. Reports-Issue Delivery Challan Authorization APIs
app.post("/api/authorizeReportsIssueDC", (req, res) => {
  console.log("request.body", req.body);
  let email = req.body.userEmail;
  let name = req.body.userName;
  let ReportsIssueDCAuthStatus = req.body.JsixDReportsIssueDC;
  if (ReportsIssueDCAuthStatus === true) {
    res.send({
      statusCode: "200",
      status: "You are authorized to use Reports-IssueDC",
    });
    console.log(
      `"WeaveTech User ${name} with email ${email} is using Reports-Issue Delivery Challan"`
    );
  }
  if (ReportsIssueDCAuthStatus === false) {
    res.send({
      statusCode: "500",
      status: "You are not authorized to use Reports-IssueDC",
    });
    console.log(
      `"WeaveTech User ${email}${name} tried using Reports-IssueDC...Please Contact Him"`
    );
  }
});
//Warehouse API
app.get("/api/getWarehouse", (req, res) => {
  request.get(
    `${myURL.origin}/api/Warehouses/N`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Warehouse API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//Get Items API
app.post("/api/getItemsITRManual", (req, res) => {
  //console.log("request.body ITR Manual Items API -", req.body);
  let whsid = req.body.fromWhsCode;
  //console.log("whsid", whsid);
  request.get(
    `${myURL.origin}/api/Items/ItemDet/${whsid}`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("Warehouse API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//Get Items Details API
app.post("/api/getItemsDetailITRManual", (req, res) => {
  console.log("request.body", req.body);
  let itemCode = req.body.ItemCode4;
  request.post(
    `${myURL.origin}/api/Items/ItemDet`,
    {
      json: {
        itemCode: itemCode,
      },
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("Success in Item Detail API by Code");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//Series APIs
app.get("/api/getPRDSeries", (req, res) => {
  request.get(
    `${myURL.origin}/api/Seriess/GetSeriesByObject/202`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      // console.log("PRD Series API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getGRNSeries", (req, res) => {
  request.get(
    `${myURL.origin}/api/Seriess/GetSeriesByObject/59`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("GRN Series API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getITRSeries", (req, res) => {
  request.get(
    `${myURL.origin}/api/Seriess/GetSeriesByObject/1250000001`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("ITR Series API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getITSeries", (req, res) => {
  request.get(
    `${myURL.origin}/api/Seriess/GetSeriesByObject/67`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      // console.log("GRN Series api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getDeliveryChallanSeries", (req, res) => {
  request.get(
    `${myURL.origin}/api/Seriess/GetSeriesByObject/15`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("GRN Series api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//Business Partner APIs
app.get("/api/getBusinessPartnerAPIbyType", (req, res) => {
  request.get(
    `${myURL.origin}/api/BusinessPartners/GetBusinessPartnerByType/S`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      // console.log("Success in Business Partner API by Type");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/getBusinessPartnerAPIbyCode", (req, res) => {
  //console.log("request.body", req.body);
  let BPCardCode = req.body.CardCode4;

  request.get(
    `${myURL.origin}/api/BusinessPartners/GetBusinessPartnerByCode/${BPCardCode}`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("Success in Business Partner API by Code");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//Get Document By Series
app.post("/api/getDocumentNumberBySeries", (req, res) => {
  // console.log("request.body", req.body);
  let docNumber = req.body.Series4;

  request.get(
    `${myURL.origin}/api/DocNumBySeriess/1250000001/${docNumber}`,
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      //console.log("Success in getDocumentNumberBySeries");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//1. PRD APIs
app.post("/api/ProductionOrderFilters", (req, res) => {
   //console.log("1.1 ProductionOrderFilters Client Data", req.body);
  let fromDateOne = req.body.fromDateOne5;
  let toDateTwo = req.body.toDateTwo6;
  let status = req.body.status;
  let warehouse = req.body.whsid;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (fromDateOne === "" || fromDateOne === undefined || fromDateOne === null) {
    fromDateOne = "string";
  }
  if (toDateTwo === "" || toDateTwo === undefined || toDateTwo === null) {
    toDateTwo = "string";
  }
  if (status === "" || status === undefined || status === null) {
    status = "";
  }
  if (status === "Planned") {
    status = "P";
  }
  if (status === "Released") {
    status = "R";
  }
  if (warehouse === "" || warehouse === undefined || warehouse === null) {
    warehouse = "";
  }
  if (series === "" || series === undefined || series === null) {
    series = 0;
  }
  if (docNum === "" || docNum === null || docNum === undefined) {
    docNum = 0;
  }
  request.post(
    `${myURL.origin}/api/ProductionOrders`,
    {
      json: {
        fromDate: fromDateOne,
        toDate: toDateTwo,
        status: status,
        warehouse: warehouse,
        series: series,
        docNum: docNum,
      },
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/AddPRDITR", (req, res) => {
  console.log("1.2 ITR Drafts Client Data", req.body);
  const cardCode = req.body.cardCode;
  const refDocEntry = req.body.docEntry;
  const refObjType = req.body.objectType;
  const docDate = req.body.docDate5;
  const dueDate = req.body.dueDate6;
  const comments = req.body.comments1;
  const toWarehouse = req.body.whsid1;
  //Polines data
  const poLines = req.body.poLines;

  request.post(
    `${myURL.origin}/api/ProductionOrders/AddITR`,
    {
      json: {
        cardCode: cardCode,
        toWarehouse: toWarehouse,
        comments: comments,
        docDate: docDate,
        dueDate: dueDate,
        refDocEntry: refDocEntry,
        refObjType: refObjType,
        poLines: poLines,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("ITR ADD API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//2. GRN APIs
app.post("/api/GRNOrderFilters", (req, res) => {
  //console.log("2.1 GRNOrderFilters Client Data", req.body);
  let fromDateOne = req.body.fromDateOne5;
  let toDateTwo = req.body.toDateTwo6;
  let cardCode = req.body.vendorid;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (fromDateOne === "" || fromDateOne === undefined || fromDateOne === null) {
    fromDateOne = "";
  }
  if (toDateTwo === "" || toDateTwo === undefined || fromDateOne === null) {
    toDateTwo = "";
  }
  if (cardCode === "" || cardCode === undefined || cardCode === null) {
    cardCode = "string";
  }
  if (series === "" || series === undefined || series === null) {
    series = 0;
  }
  if (docNum === "" || docNum === undefined || docNum === null) {
    docNum = 0;
  }
  // console.log("from date", fromDateOne);
  // console.log("to date", toDateTwo);
  // console.log("cardCode", cardCode);
  // console.log("series", series);
  // console.log("docNum", docNum);
  request.post(
    `${myURL.origin}/api/GRNs`,
    {
      json: {
        fromDate: fromDateOne,
        toDate: toDateTwo,
        cardCode: cardCode,
        series: series,
        docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("GRN Order Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/AddGRNITR", (req, res) => {
  console.log("2.2 GRN Add ITR Client Data", req.body);
  const cardCode = req.body.cardCode;
  const refDocEntry = req.body.docEntry;
  const refObjType = "GRN";
  const docDate = req.body.docDate7;
  const dueDate = req.body.dueDate8;
  const comments = req.body.comments1;
  const toWarehouse = req.body.whsid1;
  const grnLines = req.body.grnLines;
  request.post(
    `${myURL.origin}/api/GRNs/AddITR`,
    {
      json: {
        cardCode: cardCode,
        toWarehouse: toWarehouse,
        comments: comments,
        docDate: docDate,
        dueDate: dueDate,
        refDocEntry: refDocEntry,
        refObjType: refObjType,
        grnLines: grnLines,
      },
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("GRN ADD ITR api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//3. ITR Manual APIs
app.post("/api/AddITRManual", (req, res) => {
  console.log("3.1 Add ITR Manual Client Data", req.body);
  const cardCode = req.body.vendorid;
  const docNum = req.body.docNum;
  const series = req.body.seriesid;
  const postingDate = req.body.postingDate1;
  const docDate = req.body.docDate1;
  const fromWarehouse = req.body.whsid;
  const toWarehouse = req.body.whsid1;
  const comments = req.body.remarks;
  const itrDet = req.body.itrDet;

  request.post(
    `${myURL.origin}/api/AddITRManuals/AddITR`,
    {
      json: {
        cardCode: cardCode,
        docNum: `${docNum}`,
        series: series,
        postingDate: postingDate,
        docDate: docDate,
        fromWarehouse: fromWarehouse,
        toWarehouse: toWarehouse,
        comments: comments,
        "itrDet": itrDet
      },
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("GRN ADD ITR api Success");
      //console.log("Response", response);
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//4. ITR APIs
app.post("/api/ITRFilters", (req, res) => {
  //console.log("4. ITR Client Data", req.body);
  let fromDate = req.body.fromDateOne5;
  let toDate = req.body.toDateTwo6;
  let fromWhs = req.body.whsid;
  let toWhs = req.body.whsid1;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;

  if (fromDate === "" || fromDate === undefined || fromDate === null) {
    fromDate = "string";
  }
  if (toDate === "" || toDate === undefined || toDate === null) {
    toDate = "string";
  }
  if (fromWhs === "" || fromWhs === undefined || fromWhs === null) {
    fromWhs = "string";
  }
  if (toWhs === "" || toWhs === undefined || toWhs === null) {
    toWhs = "string";
  }
  if (series === "" || series === null || series === undefined) {
    series = 0;
  }
  if (docNum === "" || docNum === null || docNum === undefined) {
    docNum = 0;
  }
  request.post(
    `${myURL.origin}/api/ITRs`,
    {
      json: {
        fromDate: fromDate,
        toDate: toDate,
        fromWhs: fromWhs,
        toWhs: toWhs,
        series: series,
        docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/AddITRtoIT", (req, res) => {
  console.log("4.2 Add ITR Drafts Client Data", req.body);
  const itrDocEntry = req.body.docEntry1;
  const docDate = req.body.docDate11;
  const dueDate = req.body.dueDate12;
  const fromWhsCode = req.body.fromWhs1;
  const toWhsCode = req.body.toWhs1;
  const comments = req.body.comments1;
  const itLines = req.body.itLines;

  request.post(
    `${myURL.origin}/api/ITs/AddIT`,
    {
      json: {
        itrDocEntry: itrDocEntry,
        docDate: docDate,
        dueDate: dueDate,
        fromWhsCode: fromWhsCode,
        toWhsCode: toWhsCode,
        comments: comments,
        itLines: itLines,
      },
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("ITR ADD API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//5. IT APIs
app.post("/api/ITFilters", (req, res) => {
  //console.log("4. IT Client Data", req.body);
  let fromDate = req.body.fromDateOne5;
  let toDate = req.body.toDateTwo6;
  let fromWhs = req.body.whsid;
  let toWhs = req.body.whsid1;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;

  if (fromDate === "" || fromDate === undefined || fromDate === null) {
    fromDate = "string";
  }
  if (toDate === "" || toDate === undefined || toDate === null) {
    toDate = "string";
  }
  if (fromWhs === "" || fromWhs === undefined || fromWhs === null) {
    fromWhs = "string";
  }
  if (toWhs === "" || toWhs === undefined || toWhs === null) {
    toWhs = "string";
  }
  if (series === "" || series === null || series === undefined) {
    series = 0;
  }
  if (docNum === "" || docNum === null || docNum === undefined) {
    docNum = 0;
  }
  request.post(
    `${myURL.origin}/api/ITs`,
    {
      json: {
        fromDate: fromDate,
        toDate: toDate,
        fromWhs: fromWhs,
        toWhs: toWhs,
        series: series,
        docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/AddITtoIT", (req, res) => {
  console.log("4.2 Add IT Drafts Client Data", req.body);
  const itrDocEntry = req.body.docEntry1;
  const docDate = req.body.docDate11;
  const dueDate = req.body.dueDate12;
  const fromWhsCode = req.body.fromWhs1;
  const toWhsCode = req.body.toWhs1;
  const comments = req.body.comments1;
  const itLines = req.body.itLines;

  request.post(
    `${myURL.origin}/api/ITs/AddIT`,
    {
      json: {
        itrDocEntry: itrDocEntry,
        docDate: docDate,
        dueDate: dueDate,
        fromWhsCode: fromWhsCode,
        toWhsCode: toWhsCode,
        comments: comments,
        itLines: itLines,
      },
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      // console.log("ITR ADD API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});

//6. Series Reports APIs
app.post("/api/Reports1", (req, res) => {
  console.log("Reports1", req.body);
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (series === "" || series === null || series === undefined) {
    series = 0;
  }
  if (docNum === "" || docNum === null || docNum === undefined) {
    docNum = 0;
  }
  // console.log("series", series);
  //console.log("docNum", docNum);
  request.post(
    `${myURL.origin}/api/Reports1`,
    {
      json: {
        series: 0,
        docNum: 0,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/Reports2", (req, res) => {
  console.log("Reports2", req.body);
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (series === "") {
    series = 0;
  }
  if (docNum === "") {
    docNum = 0;
  }
  // console.log("series", series);
  //console.log("docNum", docNum);
  request.post(
    `${myURL.origin}/api/Reports2`,
    {
      json: {
        series: 0,
        docNum: 0,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/Reports3", (req, res) => {
  console.log("Reports3", req.body);
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (series === "") {
    series = 0;
  }
  if (docNum === "") {
    docNum = 0;
  }
  // console.log("series", series);
  //console.log("docNum", docNum);
  request.post(
    `${myURL.origin}/api/Reports3`,
    {
      json: {
        series: 0,
        docNum: 0,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/Reports4", (req, res) => {
  console.log("Reports4", req.body);
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (series === "") {
    series = 0;
  }
  if (docNum === "") {
    docNum = 0;
  }
  request.post(
    `${myURL.origin}/api/Reports4`,
    {
      json: {
        series: 0,
        docNum: 0,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      //console.log("Production Order Filter API Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
//6. Handle Reports APIs
