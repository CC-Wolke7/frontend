import {Like} from './like';

export class Offer {
    species: string;
    breed: string;
    description: string;
    uuid: string;
    name: string;
    age: number;
    sex: string;
    sterile: boolean;
    place: string;
    date_published: Date;
    like: Like;
    media: string[];
    published_by: string;

    constructor() {
        this.sterile = false;
    }
}
