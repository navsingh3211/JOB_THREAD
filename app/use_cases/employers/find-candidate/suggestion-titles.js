export default function makeSuggestionTitles({
    instituteCategorizationsRootConfigDB, employerInstituteDB, jobPostDB,
}) {

    return async function suggestionTitles({ query, user: { employerId } }) {

        const page = query.page || null
        const sort = query.sort || null
        const limit = 10
        const offset = (page - 1) * limit
        const domain = query.domain || null
        const search = query.q || null

        let _filter = {}
        let _options = {}
        if (page && page !== 'all') _options.offset = offset
        if (page && page !== 'all') _options.limit = limit
        if (search) _options.search = search
        //if (sort) _options.sort[sort] = 1   

        if (domain !== 'all') {

            const institute = await employerInstituteDB.findOne(
                { id: domain, institution_company_id: employerId, status: true },
                { select: { institution_cat: 1, institution_subcat: 1, institution_subcat2: 1 } }
            )

            if (!institute) throw Error('Invalid domain refrence')

            const rootConfig = await instituteCategorizationsRootConfigDB.findOne({
                category_id: institute.institution_cat, status: true
            })
            const { level_to_define_domain: domainLevel } = rootConfig

            if (domainLevel >= 0) _filter.category = institute.institution_cat
            if (domainLevel >= 1) _filter.subcategory = institute.institution_subcat
            if (domainLevel >= 2) _filter.subcategory2 = institute.institution_subcat2
        }

        const titles = await jobPostDB.preExistingSearchTitles(_filter, _options)
        return {
            titles
        }
    }
}