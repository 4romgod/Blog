const express = require("express");
const router = express.Router();
const https = require("https");


// POST OF SIGNIN DETAILS
router.post("/newsletter", function (req, res) {
    const fname = req.body.fname;
    const surname = req.body.surname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname, LNAME: surname
            }
        }]
    };
    const membersJson = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/21979571f7";

    const options = {
        method: "POST",
        auth: "4romgod:" + process.env.API_KEY
    }

    const requestApi = https.request(url, options, function (responseApi) {
        if (responseApi.statusCode === 200) {
            // get the data from the response
            responseApi.on("data", function (data) {
                const dataRes = JSON.parse(data);

                // the data has an error
                if (dataRes.errors.length > 0) {
                    console.log("ERROR: " + dataRes.errors[0].error);
                    res.render("newsletter/failure");
                }
                else {
                    res.render("newsletter/success");
                }

            });

        }
        else {
            res.render("newsletter/failure");
        }

    });

    requestApi.write(membersJson);
    requestApi.end();

});


// POST RETRY NEWSLETTER SIGNUP
router.post("/retry", function (req, res) {
    res.redirect("/newsletter");
});


module.exports = router;
