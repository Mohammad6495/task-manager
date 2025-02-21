import { IAllData, IParentAllData } from "../Interface/Interface";
import moment from "jalali-moment";

export const convertPersianTime = (time: string) => {
  if (time) {
    const result = moment(time).format("YYYY/M/D");
    return result;
  } else {
    return "---";
  }
};
export const firstData = (all: IAllData[]): IParentAllData[] => {
  const groupedData: Record<string, IParentAllData> = {};

  all.forEach((item) => {
    if (!groupedData[item.id]) {
      groupedData[item.id] = {
        id: item.id,
        quantity: 0,
        children: [],
      };
    }
    groupedData[item.id].children.push(item);
    groupedData[item.id].quantity++;
  });

  return Object.values(groupedData);
};
