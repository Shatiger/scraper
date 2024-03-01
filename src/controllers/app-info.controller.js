const { getAppStoreAppInfo } = require('../services/app-info.service')
const { getGooglePlayAppInfo } = require('../services/app-info.service')

async function getAppInfo(req, res, next) {
    try {
        if (req?.body?.appId && req?.body?.platform) {
            const appId = req.body.appId
            const platform = req.body.platform

            if (platform === 'ios') {
                res.json(await getAppStoreAppInfo(appId))
            } else if (platform === 'android') {
                res.json(await getGooglePlayAppInfo(appId))
            } else {
                const err = 'Wrong platform parameter'
                console.error(err)
                next(err)
            }
        } else {
            const err = 'No params'
            console.error(err)
            next(err)
        }
    } catch (err) {
        console.error(`Error while getting app info`, err.message)
        next(err)
    }
}

module.exports = { getAppInfo }
