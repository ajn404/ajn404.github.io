import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Person {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

@WebSocketGateway()
export class PeopleGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private people: Person[] = [];

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateLocation')
  handleLocationUpdate(client: Socket, payload: Person): void {
    this.people.push(payload);
    this.server.emit('locationUpdate', this.people);
    console.log(
      `Updated location for ${payload.name}: ${payload.latitude}, ${payload.longitude}`,
    );
  }
}
