import {Like} from './like';

export class Offer {
    id: number;
    type: string;
    breed: string;
    description: string;
    uuid: string;
    name: string;
    age: number;
    sex: string;
    place: string;
    previewImageUrl: string;
    like: Like;
    media: string[];
    sellerName: string;
    sellerUuid: string;
}
