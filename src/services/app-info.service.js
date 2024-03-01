const cheerio = require('cheerio')
const axios = require('axios')

const googlePlayBaseUrl = 'https://play.google.com/store/apps/details'
const appStoreBaseUrl = 'https://itunes.apple.com/lookup'

async function getAppStoreAppInfo(appId) {
    const params = {
        id: appId,
        entity: 'software',
    }

    const response = await axios.get(appStoreBaseUrl, {params})
    const entity = response.data.results[0]

    return {
        title: entity.trackName,
        image: entity.artworkUrl512,
        category: entity.primaryGenreName,
    }
}

async function getGooglePlayAppInfo(appId) {
    const params = {
        id: appId,
    }
    const response = await axios.get(googlePlayBaseUrl, {params})

    const $ = cheerio.load(response.data)
    const title = $('h1[itemprop="name"]').text()
    const image = $('img[itemprop="image"]').first().attr().src
    const category = $('div[itemprop="genre"] span').first().text()

    return {
        title,
        image,
        category,
    }
}

module.exports = {
    getAppStoreAppInfo,
    getGooglePlayAppInfo,
}
