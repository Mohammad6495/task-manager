export type IAllData = {
  id: string;
  title: string;
  created: string;
  uniqueId: number;
};

export type IParentAllData = {
  id: string;
  quantity: number;
  children: IAllData[];
};

export type TypeItem = "parent" | "child";

///// context Types
export interface ICoreValues {
  parenAllData: IParentAllData[];
  selectItems: IParentAllData[];
  selectIdsParent: string[];
  selectIdsChild: number[];
  selectRemovedIdsParent: string[];
  selectRemovedIdsChild: number[];
  handleChangeSelectId: (id: number | string, type: TypeItem) => void;
  handleRemovedChangeSelectId: (id: number | string, type: TypeItem) => void;
  resetData: () => Promise<void>;
  handleAddItemsToSelectItems: () => void;
  handleRemovedItemsToSelectItems: () => void;
}
