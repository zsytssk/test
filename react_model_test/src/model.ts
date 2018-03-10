import { BaseModel } from "./model/baseModel";
type ItemInfo = {
  id: string;
  value: string;
};
export class ListModel extends BaseModel {
  public list: ItemModel[] = [];
  public addItem(item_info: ItemInfo) {
    this.list.push(new ItemModel(item_info.id, item_info.value, this));
    this.trigger("addItem");
  }
  public removeItem(id: string) {
    const list = this.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1);
      }
    }
    this.trigger("removeItem");
  }
}
export class ItemModel extends BaseModel {
  constructor(
    public id: string,
    public value: string,
    private list: ListModel
  ) {
    super();
  }
  public changeValue(value) {
    this.value = value;
    this.trigger("change");
  }
  public destroy() {
    this.list.removeItem(this.id);
  }
}
