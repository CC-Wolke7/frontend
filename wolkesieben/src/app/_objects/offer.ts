import {Like} from './like';
import {User} from './user';

export class Offer {
    // id: number;
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
    published_by: User;
}
