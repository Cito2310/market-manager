import * as dotenv from 'dotenv'
dotenv.config()

import { Server } from './server'
const server = new Server
server.listen()