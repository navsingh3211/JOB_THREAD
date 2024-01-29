import schedule from 'node-schedule'
// import { Queue, Worker } from "bullmq"
import { Queue, Worker, connection } from '../config/redis.js'
import { connectMonogoDB } from '../config/mongoose.js'
import syncMysqlToMongo from './syncMysqlToMongo.js'

connectMonogoDB()

const scheduleSyncJob = schedule.scheduleJob('*/5 * * *', () => {
    console.log('Data syncing at ⌚ -> ', new Date(Date.now() + (5.5 * 60 * 60000)))
    addSyncJobs()
});

// ----- BullMQ: producer
const syncDocsQueue = new Queue('syncDocsQueue', { connection })

async function addSyncJobs() {

    //const collections_ = ["jobPostDB"]
    const collections = [
        //"boardDB",
        "cacheProbableTitlesDB",
        "cacheSearchCandidateResultDB",
        //"cityDB",
        //"countryDB",
        //"educationDB",
        //"educationSpecializationDB",
        "employerDB",
        "employerInstituteDB",
        "employerInvitedEmployeeDB",
        "employerSavedEmployeeDB",
        //"employmentTypeDB",
        "employeeContactRevealedDB",
        "employeeShortlistedDB",
        //"experienceDB",
        "instituteCategorizationConfigDB",
        "instituteCategorizationDB",
        "instituteCategorizationsAdjectiveDB",
        "instituteCategorizationsMapDB",
        "instituteCategorizationsRootConfigDB",
        //"jobCategoryDB",
        "jobPostDB",
        "jobSeekerDB",
        "jobTitleSuggestionDB",
        // "noticePeriodDB",
        // "languageDB",
        // "priorityScoreDB",
        "seekerAchievementDB",
        "seekerAppliedJobDB",
        "seekerEducationDB",
        "seekerExperienceDB",        
        "seekerPreferenceDB",
        "seekerQualificationDB",
        "seekerSkillDB",
        //"skillDB",
    ];

    try {

        console.log("Adding sync jobs...");
        for (let i = 0; i < collections.length; i++) {
            await syncDocsQueue.add(`${collections[i]}`, { collection: collections[i] })
        }
        console.log("Done");
        await syncDocsQueue.close()

    } catch (error) {
        console.error('queue error -> ', error)
    }
}
//addSyncJobs()

// ----- BullMQ: consumer
const syncDocWorker = new Worker('syncDocsQueue',
    syncMysqlToMongo,
    {
        connection,
        lockDuration: 90000,
        concurrency: 1
    }
)

syncDocWorker.on('completed', job => {
    console.info(`Job ${job.name} #${job.id} has completed!`);
})

syncDocWorker.on('failed', (job, err) => {
    console.error(`Job ${job.name} #${job.id} has failed with ${err.message}`);
})