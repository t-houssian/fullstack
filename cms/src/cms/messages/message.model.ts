export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;

    constructor(id: number, subject: string, msgText: string, sender: string){
        id= id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}