export class Offer {
    id: number;
    name: string;
    age: number;
    sex: string;
    place: string;
    previewImageUrl: string;

    constructor(json) {
        Object.keys(json).forEach(key => {
            this[key] = json[key];
        });
    }
}
