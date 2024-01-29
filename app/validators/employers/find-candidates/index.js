import Joi from "joi";
import CustomErrorHandler from "../../../utils/services/CustomErrorHandler.service.js";
import makeSearchCandidateValidator from "./search-candidate.js"

const validators = {
    searchCandidateValidator: makeSearchCandidateValidator({ Joi, CustomErrorHandler }),
}
export default Object.freeze(validators)
