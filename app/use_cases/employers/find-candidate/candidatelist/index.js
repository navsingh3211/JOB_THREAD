import { EMPLOYEE_S3VIEW_CDN } from '../../../../config/index.js'
import {
    employeeContactRevealedDB,
    seekerPreferenceDB, jobSeekerDB,
    seekerExperienceDB, seekerSkillDB,
    employerSavedEmployeeDB, employerInvitedEmployeeDB, seekerAppliedJobDB, employeeShortlistedDB,
} from '../../../../data_access/index.js'
import makeContactRevealed from "./contactRevealed.js"
import makePreference from './preference.js'
import makeSeeker from './seeker.js'
import makeExperience from './experience.js'
import makeSkill from './skill.js'
import makeSaved from './saved.js'
import makeInvited from './invited.js'
import makeApplied from './applied.js'
import makeShortlisted from './shortlisted.js'

const contactRevealed = makeContactRevealed({ employeeContactRevealedDB })
const preference = makePreference({ seekerPreferenceDB })
const seeker = makeSeeker({ jobSeekerDB, EMPLOYEE_S3VIEW_CDN })
const experience = makeExperience({ seekerExperienceDB })
const skill = makeSkill({ seekerSkillDB })
const saved = makeSaved({ employerSavedEmployeeDB })
const invited = makeInvited({ employerInvitedEmployeeDB })
const applied = makeApplied({ seekerAppliedJobDB })
const shortlisted = makeShortlisted({ employeeShortlistedDB })

export {
    contactRevealed,
    preference,
    seeker,
    experience,
    skill,
    saved,
    invited,
    applied,
    shortlisted
}