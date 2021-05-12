var express = require("express");
var router = express.Router();

const cryptoService = require("../services/crypto.service");

/**
 * @openapi
 * /crypto:
 *   get:
 *     description: Everything about prices of the top cryptocurrencies against USD
 *     parameters:
 *       - name: "limit"
 *         in: "query"
 *         description: "Number of currencies to return"
 *         required: false
 *         example: 8
 *       - in: "query"
 *         name: "skip"
 *         description: "Number of currencies to skip"
 *         required: false
 *         example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Denotes whether call to api was successful
 *                 data:
 *                   description: A map of cryptocurrency objects by symbol
 *                   type: object
 *                   example: {"BTC":{"price":56714.36776872506,"volume_24h":61177459674.44885,"percent_change_1h":0.46530708,"percent_change_24h":1.43563654,"percent_change_7d":6.24968748,"percent_change_30d":-5.69961263,"percent_change_60d":-1.14430387,"percent_change_90d":26.05503792,"market_cap":1060974110019.0646,"last_updated":"2021-05-11T23:52:02.000Z"},"DOGE":{"price":0.49445504638387,"volume_24h":14570011370.645235,"percent_change_1h":-1.29642007,"percent_change_24h":9.35697713,"percent_change_7d":-8.73707355,"percent_change_30d":564.27628994,"percent_change_60d":792.58596237,"percent_change_90d":579.99722367,"market_cap":64061121326.98588,"last_updated":"2021-05-11T23:52:03.000Z"}}
 *                   additionalProperties:
 *                     description: A cryptocurrency object
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         description: Price in USD
 *                       volume_24h:
 *                         type: number
 *                         description: Rolling 24 hour adjusted volume in USD
 *                       percent_change_1h:
 *                         type: number
 *                         description: 1 hour change in USD
 *                       percent_change_24h:
 *                         type: number
 *                         description: 24 hour change in USD
 *                       percent_change_7h:
 *                         type: number
 *                         description: 7 day change in USD
 *                       percent_change_30d:
 *                         type: number
 *                         description: 30 day change in USD
 *                       percent_change_60d:
 *                         type: number
 *                         description: 60 day change in USD
 *                       percent_change_90d:
 *                         type: number
 *                         description: 90 day change in USD
 *                       market_cap:
 *                         type: number
 *                         description: Market cap in USD
 *                       last_updated:
 *                         type: string
 *                         description: Timestamp (ISO 8601) of when the conversion currency's current value was referenced.
 */
router.get("/", async (req, res) => {
  const { limit, skip } = req.query;
  try {
    const data = await cryptoService.findAll(limit, skip);
    res.json(data);
  } catch (e) {
    res.status(400).send({ success: false, data: e.message });
  }
});

/**
 * @openapi
 * /crypto/{symbol}:
 *   get:
 *     description: Get price information of a particular coin by the coin symbol
 *     parameters:
 *       - name: "symbol"
 *         in: path
 *         description: Coin symbol
 *         required: true
 *         example: BTC
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {"success":true,"data":{"price":57030.642318698105,"volume_24h":61472474328.75788,"percent_change_1h":1.16837386,"percent_change_24h":1.14376056,"percent_change_7d":5.54665486,"percent_change_30d":-4.63224922,"percent_change_60d":0.80165117,"percent_change_90d":27.38942822,"market_cap":1066896064664.3746,"last_updated":"2021-05-12T00:29:02.000Z"}}
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Denotes whether call to api was successful
 *                 data:
 *                   description: Price information of cryptocurrency denoted by symbol in USD
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: number
 *                       description: Price in USD
 *                     volume_24h:
 *                       type: number
 *                       description: Rolling 24 hour adjusted volume in USD
 *                     percent_change_1h:
 *                       type: number
 *                       description: 1 hour change in USD
 *                     percent_change_24h:
 *                       type: number
 *                       description: 24 hour change in USD
 *                     percent_change_7h:
 *                       type: number
 *                       description: 7 day change in USD
 *                     percent_change_30d:
 *                       type: number
 *                       description: 30 day change in USD
 *                     percent_change_60d:
 *                       type: number
 *                       description: 60 day change in USD
 *                     percent_change_90d:
 *                       type: number
 *                       description: 90 day change in USD
 *                     market_cap:
 *                       type: number
 *                       description: Market cap in USD
 *                     last_updated:
 *                       type: string
 *                       description: Timestamp (ISO 8601) of when the conversion currency's current value was referenced.
 */
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const data = await cryptoService.findOne(symbol);
    res.json(data);
  } catch (e) {
    res.status(400).send({ success: false, data: e.message });
  }
});

module.exports = router;
