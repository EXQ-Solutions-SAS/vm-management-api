import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:4200', credentials: true },
})
export class VmsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server; 

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }
}