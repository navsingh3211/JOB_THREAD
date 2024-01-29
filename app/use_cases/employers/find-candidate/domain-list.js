export default function makeDomainList({ employerDB, employerInstituteDB }) {

    return async function domainList({ user: { employerId } }) {

        const group_details = await employerDB.findOne(
            { id: employerId, status: true },
            {
                select:
                {
                    id: 1, employerid: 1, company_name: 1,
                    founded_year: 1, company_url: 1, company_logo: 1,
                    company_description: 1, phone: 1, email: 1,
                    cp_name: 1, cp_designation: 1, updated_date: 1
                }
            }
        )

        const institutes = await employerInstituteDB.findAll(
            { institution_company_id: employerId, status: true },
            {
                select:
                {
                    id: 1, institution_name: 1, institution_description: 1,
                    institution_cat: 1, institution_subcat: 1, institution_subcat_other: 1,
                    institution_subcat2: 1, institution_subcat2_other: 1, ownership_type: 1,
                    ownership_brand: 1, affiliation_with: 1, affiliation_certificate: 1,
                    no_of_branch: 1, employee_strength: 1, student_strength: 1, country: 1,
                    state: 1, address: 1, city: 1, pincode: 1, company_pan: 1, url: 1,
                    last_updated_on: 1, under_vetting: 1
                }
            }
        )

        return {
            group_details,
            institute_count: institutes.length,
            institutes
        }
    }
}