function getCMCKey() {
  const keys = (process.env.CMC_API_KEYS).split(",");
  return keys[Math.floor(Math.random() * keys.length)];
}

module.exports = {
  getCMCKey,
};
