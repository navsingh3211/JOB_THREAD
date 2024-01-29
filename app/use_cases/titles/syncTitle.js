export default function makeSyncTitle({ cacheProbableTitlesDB }) {

    return async function syncTitle() {

        const titles = await cacheProbableTitlesDB.findAll_SQ({}, {})
        await cacheProbableTitlesDB.deleteMany()
        const savedTitles_doc = await cacheProbableTitlesDB.insertMany(titles)

        return {
            message: `Successfully synced ${savedTitles_doc.length} titles`
        }
    }
}