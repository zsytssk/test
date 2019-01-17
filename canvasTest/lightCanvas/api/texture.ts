export class Texture {
    public image: HTMLImageElement;
    public width: number = 0;
    public height: number = 0;
    /** 在img的位置 */
    public dx: number = 0;
    public dy: number = 0;
    /** 原始source的宽高 */
    public sw: number = 0;
    public sh: number = 0;
    constructor(skin: string) {
        const image = new Image();
        image.src = skin;
        image.onload = () => {
            this.width = image.width;
            this.height = image.height;
        };
        this.image = image;
    }
}
