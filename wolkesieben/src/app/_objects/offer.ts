import {Like} from './like';

export class Offer {
    id: number;
    uuid: string;
    name: string;
    age: number;
    sex: string;
    place: string;
    previewImageUrl: string;
    like: Like;
}
