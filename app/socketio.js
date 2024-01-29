import { Server } from 'socket.io';
import { SOCKET_WHITELIST_URL } from './config/index.js'
import { SocketEvents } from './config/constant.js'
import { seekerLastActiveDB, jobSeekerDB } from './data_access/index.js'

const createSocket = (http) => {
    const io = new Server(http, {
        cors: {
            origin: JSON.parse(SOCKET_WHITELIST_URL)
        }
    })

    io.on(SocketEvents.CONNECT, (socket) => {
        //console.log('user connected');

        // Seeker connection
        socket.on(SocketEvents.CONNECTSEEKER, async (data) => {

            //console.log(' seeker data ', data)
            //console.log(' socketid ', socket.id)

            const { seekerId } = data
            const seeker = await jobSeekerDB.findOne({ seekerid: seekerId, status: true })
            // console.log('seekerId ', seeker.id)
            if (seeker) {
                await seekerLastActiveDB.updateOne(
                    { seeker_id: seeker.id },
                    { socketId: socket.id, lastActive: Date.now(), isActive: true },
                    { upsert: true }
                )
            }

        })

        socket.on(SocketEvents.DISCONNECT, async () => {

            // console.log('user disconnected ')
            // console.log(' socketId ', socket.id)

            const user = await seekerLastActiveDB.findOne({ socketId: socket.id })
            if (user) {
                await seekerLastActiveDB.updateOne(
                    { seeker_id: user.seeker_id },
                    { lastActive: Date.now(), isActive: false }
                )
            }

        })
    })
}

export default createSocket