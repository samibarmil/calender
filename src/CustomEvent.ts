
export class customEvent {
    id: number;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;

    // {
    //     "id": 1,
    //     "title": "Lunch with Tim",
    //     "description": "Meet at the restaurant",
    //     "startTime": "2022-11-20T13:00:00-06:00",
    //     "endTime": "2022-11-20T14:30:00-06:00"
    // }

    constructor(id: number, startTime: Date, endTime:Date, title:string, description: string){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.title = title;
        this.description = description;
    }

}