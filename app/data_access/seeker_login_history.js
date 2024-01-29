export default function makeSeekerLoginHistoryDB({ }, { SeekerLoginHistory }) {

    async function findOne(_filter) {
        const project = await SeekerLoginHistory.findOne({ where: _filter })
        return project
    }

    return Object.freeze({
        findOne
    })
}