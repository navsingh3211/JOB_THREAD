export default function makeEmployerLoginHistoryDB({ }, { EmployerLoginHistory }) {

    async function findOne(_filter) {
        const project = await EmployerLoginHistory.findOne({ where: _filter })
        return project
    }

    return Object.freeze({
        findOne
    })
}