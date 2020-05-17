const { BitlyClient } = require('bitly');
const { BITLY_ACCESS_TOKEN } = process.env;
const bitly = new BitlyClient(BITLY_ACCESS_TOKEN, {});

module.exports = {
    shorten: async function(url) {
        try {
            const result = await bitly.shorten(url);
            return result.id;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};