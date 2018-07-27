import { extend } from './utils/zutil';

export class Test extends eui.Component implements eui.UIComponent {
    public constructor() {
        super();
        console.log(1, this);
    }

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        console.log(2, this);
    }
}
extend(Test, undefined, 'Test');
