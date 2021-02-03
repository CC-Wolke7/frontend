import {Like} from './like';

export class Offer {
    id: number;
    breed: string;
    description: string;
    uuid: string;
    name: string;
    age: number;
    sex: string;
    place: string;
    previewImageUrl: string;
    owner: string;
    like: Like;
    media: string[];
    sellerName: string;
}
