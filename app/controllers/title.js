import titles from "../use_cases/titles/index.js"

export default Object.freeze({
    syncTitle: (httpRequest) => titles.syncTitle(httpRequest),
    titleList: (httpRequest) => titles.titleList(httpRequest),
})