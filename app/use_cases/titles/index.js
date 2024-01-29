import { cacheProbableTitlesDB } from '../../data_access/index.js'
import makeSyncTitle from "./syncTitle.js";
import makeTitleList from './list.js';

const cases = {
    syncTitle: makeSyncTitle({ cacheProbableTitlesDB }),
    titleList: makeTitleList({ cacheProbableTitlesDB })
}
export default Object.freeze(cases)

export const {
    syncTitle,
    titleList
} = cases