export default function makeTitleList({ cacheProbableTitlesDB }) {

    return async function syncTitleList() {

        const titles = await cacheProbableTitlesDB.findAll_SQ({}, { limit: 10 })

        return {
            message: `It's a public endpoint which fetching data from MySql`,
            dummy: [{ id: 0, name: 'Foo' }],
            titles: titles
        }
    }
}