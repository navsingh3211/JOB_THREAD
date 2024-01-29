import profile from "../../use_cases/employers/profile/index.js"

export default Object.freeze({
    instituteList: (httpRequest) => profile.instituteList(httpRequest),
})