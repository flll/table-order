import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'

let io: Server

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })
  
  return io
}

export { io } 