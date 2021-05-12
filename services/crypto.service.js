const axios = require("axios");
const qs = require("qs");

const { getCMCKey } = require("../utils/get-cmc-key.util");

async function findAll(limit, skip) {
  try {
    const res = await axios(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?${qs.stringify(
        { symbol: "BTC,ETH,BNB,DOGE,ADA,XRP,DOT,LTC,UNI" }
      )}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": getCMCKey(),
        },
      }
    );

    const coins = res.data.data;
    const data = Object.keys(coins)
      .slice(
        skip ? Number(skip) : 0,
        limit ? Number(skip ?? 0) + Number(limit) : Object.keys(coins).length
      )
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: coins[key].quote.USD,
        }),
        {}
      );
    return {
      success: true,
      data,
    };
  } catch (e) {
    console.log(e);
    throw new Error(
      e?.response?.data?.status?.error_message ||
        "An unspecified error has occurred"
    );
  }
}

async function findOne(symbol) {
  console.log(getCMCKey())
  try {
    const res = await axios(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?${qs.stringify(
        { symbol }
      )}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": getCMCKey(),
        },
      }
    );

    const data = res.data.data[symbol.toUpperCase()]?.quote.USD;

    if (!data) {
      throw new Error();
    }

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    throw new Error(
      e?.response?.data?.status?.error_message ||
        "An unspecified error has occurred"
    );
  }
}

module.exports = {
  findAll,
  findOne,
};
