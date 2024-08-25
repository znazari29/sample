import * as signalR from "@microsoft/signalr";

export class SignalRService {
  private connection: signalR.HubConnection;

  constructor(hubUrl: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.onreconnected(() => {
      console.log("Reconnected to SignalR hub");
    });

    this.connection.onreconnecting(() => {
      console.log("Reconnecting to SignalR hub...");
    });

    this.connection.onclose(() => {
      console.log("SignalR connection closed");
    });
  }

  public async start(): Promise<void> {
    try {
      await this.connection.start();
      console.log("SignalR connection established");
    } catch (err) {
      console.error("Error establishing SignalR connection: ", err);
      setTimeout(() => this.start(), 5000); // Retry connection every 5 seconds
    }
  }

  public stop(): void {
    this.connection
      .stop()
      .then(() => console.log("SignalR connection stopped"));
  }

  public on<T>(eventName: string, callback: (data: T) => void): void {
    this.connection.on(eventName, callback);
  }

  public off(eventName: string, callback: (data: any) => void): void {
    this.connection.off(eventName, callback);
  }

  public send(eventName: string, data: any): void {
    this.connection.send(eventName, data);
  }
}
