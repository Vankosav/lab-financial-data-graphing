const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*router.get("/financial-data", async (req, res, next) => {
  try {
    const response = await axios.get("http://api.coindesk.com/v1/bpi/historical/close.json");
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});
*/
module.exports = router;
