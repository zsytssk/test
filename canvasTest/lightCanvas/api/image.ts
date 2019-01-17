import { Node } from './node';
import { Texture } from './texture';

export class Image extends Node {
    private pri_skin: string;
    public texture: Texture;
    constructor() {
        super();
    }
    public set skin(skin: string) {
        if (skin === this.pri_skin) {
            return;
        }
        this.texture = new Texture(skin);
    }
    public get skin() {
        return this.pri_skin;
    }
}
