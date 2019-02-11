import { setProps } from '../utils/utils';

export type Pattern = 'normal' | 'repeat' | 'repeat-x' | 'repeat-y';
export class Texture {
    public image: CanvasImageSource;
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public pattern: Pattern = 'normal';
    constructor(image: CanvasImageSource, props: ClassProps<Texture>) {
        this.image = image;
        this.updateProps(props);
    }
    public updateProps(props: ClassProps<Texture>) {
        setProps(this, props);
    }
    public destroy() {
        this.image = undefined;
    }
}
