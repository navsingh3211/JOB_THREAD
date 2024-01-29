export default function makeInstituteList({
    employerDB,
    employerInstituteDB, EMPLOYER_S3VIEW_CDN,
}) {

    return async function instituteList({ user: { employerId } }) {

        //const EMPLOYER_CDN = "https://d1t7ou3mugtvf4.cloudfront.net/"

        const group_details = await employerDB.findOne(
            { id: Number(employerId), status: true },
            {
                select: {
                    _id: 0, id: 1, employerid: 1, company_name: 1,
                    founded_year: 1, company_url: 1, company_logo: 1,
                    company_description: 1, phone: 1, email: 1,
                    cp_name: 1, cp_designation: 1, last_updated_on: 1
                }
            }
        )

        group_details.company_logo = {
            key: group_details.company_logo,
            url: EMPLOYER_S3VIEW_CDN + group_details.company_logo
        }

        const institutes = await employerInstituteDB.findAll(
            { institution_company_id: Number(employerId), status: true },
            {
                select: {
                    _id: 0, id: 1, institution_name: 1, institution_description: 1,
                    institution_logo: 1, institution_cat: 1,
                }
            }
        )

        const institutes_ = await employerInstituteDB.aggregate([
            {
                $match: {
                    institution_company_id: Number(employerId),
                    status: true,
                    under_vetting: { $in: [0, 1, 2] }
                }
            },
            {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "id",
                    as: "cities",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', true] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$cities", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "countries",
                    localField: "country",
                    foreignField: "id",
                    as: "countries",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', true] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$countries", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "institute_categorizations",
                    localField: "institution_cat",
                    foreignField: "id",
                    as: "parentTypes",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', 1] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$parentTypes", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "institute_categorizations",
                    localField: "institution_subcat",
                    foreignField: "id",
                    as: "subcategories1",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', 1] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$subcategories1", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "institute_categorizations_adjectives",
                    localField: "adjective",
                    foreignField: "id",
                    as: "adjectives",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', 1] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$adjectives", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: "$institution_name",
                    description: "$institution_description",
                    logo: "$institution_logo",
                    logo: {
                        key: "$institution_logo",
                        url: { $concat: [EMPLOYER_S3VIEW_CDN, "$institution_logo"] }
                    },
                    parentType: {
                        $cond: {
                            if: { $gt: ['$institution_cat', 0] },
                            then: {
                                id: "$institution_cat",
                                name: "$parentTypes.name"
                            },
                            else: null,
                        }
                    },
                    subCategory1: {
                        id: "$institution_subcat",
                        name: "$subcategories1.name",
                        other: "$institution_subcat_other"
                    },
                    subCategory1: {
                        $cond: {
                            if: { $gt: ['$institution_subcat', 0] },
                            then: {
                                id: "$institution_subcat",
                                name: "$subcategories1.name",
                                other: "$institution_subcat_other"
                            },
                            else: null,
                        }
                    },
                    subCategory2: {
                        id: "$institution_subcat2",
                        other: "$institution_subcat2_other"
                    },
                    adjective: {
                        $cond: {
                            if: { $gt: ['$category_adjective_id', 0] },
                            then: {
                                id: "$category_adjective_id",
                                name: "$adjectives.name"
                            },
                            else: null,
                        }
                    },
                    ownership_type: "$ownership_type",
                    ownership_brand: "$ownership_brand",
                    affiliation_with: "$affiliation_with",
                    affiliation_certificate: "$affiliation_certificate",
                    no_of_branch: "$no_of_branch",
                    employee_strength: "$employee_strength",
                    student_strength: "$student_strength",
                    country: {
                        $cond: {
                            if: { $gt: ['$country', 0] },
                            then: {
                                id: "$country",
                                name: "$countries.name"
                            },
                            else: null,
                        }
                    },
                    city: {
                        $cond: {
                            if: { $gt: ['$city', 0] },
                            then: {
                                id: "$city",
                                name: "$cities.name"
                            },
                            else: null,
                        }
                    },
                    address: "$address",
                    address_longitude: "$address_longitude",
                    address_latitude: "$address_latitude",
                    pincode: "$pincode",
                    company_pan: "$company_pan",
                    url: "$url",
                    last_updated_on: "$last_updated_on",
                    under_vetting: "$under_vetting",
                    course_offered: {
                        $map: {
                            input: "$courses",
                            as: "courses",
                            in: {
                                course_id: "$$courses.course_id",
                                course_name: "$$courses.course_name"
                            }
                        }
                    },
                    status: {
                        $cond: {
                            if: { $eq: [1, '$under_vetting'] },
                            then: "This Category is under Vetting", else: "Complete",
                        }
                    }

                }
            }
        ])

        return {
            group_details,
            institute_count: institutes.length,
            institutes_
        }
    }
}