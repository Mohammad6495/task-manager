import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IAllData, ICoreValues, IParentAllData, TypeItem } from "../Interface/Interface";
import axios from "axios";
import { firstData } from "../utils";


const CoreInitialValues: ICoreValues = {
    parenAllData: [],
    selectItems: [],
    selectRemovedIdsChild: [],
    selectRemovedIdsParent: [],
    resetData: async () => { },
    handleAddItemsToSelectItems: () => { },
    handleChangeSelectId: () => { },
    handleRemovedChangeSelectId: () => { },
    handleRemovedItemsToSelectItems: () => { },
    selectIdsChild: [],
    selectIdsParent: []
};
const CoreContext = createContext(CoreInitialValues);

const CoreContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    ///States
    const [alldata, setAlldata] = useState<IParentAllData[]>([]);
    const [selectItems, setSelectItems] = useState<IParentAllData[]>([]);
    const [selectIdsParent, setSelectIdsParent] = useState<string[]>([]);
    const [selectIdsChild, setSelectIdsChild] = useState<number[]>([]);
    const [selectRemovedIdsParent, setSelectRemovedIdsParent] = useState<string[]>([]);
    const [selectRemovedIdsChild, setSelectRemovedIdsChild] = useState<number[]>([]);

    const allDataAPI = async () => {
        const res = await axios.get('/allData.json');
        const all: IAllData[] = res.data;
        const newData = firstData(all)
        setAlldata(newData)
    }

    const handleAddItemsToSelectItems = () => {
        if (selectIdsChild.length !== 0) {
            const arrayItems = alldata.flatMap(item => item.children);
            const newArrayItems = arrayItems.filter(a => selectIdsChild.includes(a.uniqueId));
            const remove = arrayItems.filter(a => !selectIdsChild.includes(a.uniqueId));
            const removeData = firstData(remove);
            const data = firstData(newArrayItems);

            setSelectItems(prev => {
                const updatedItems = [...prev];

                data.forEach(newParent => {
                    const parentIndex = updatedItems.findIndex(a => a.id === newParent.id);

                    if (parentIndex !== -1) {
                        const updatedParent = { ...updatedItems[parentIndex] };
                        updatedParent.quantity += 1
                        updatedParent.children = [...updatedParent.children, ...newParent.children];

                        updatedItems[parentIndex] = updatedParent;
                    } else {
                        updatedItems.push({ ...newParent, children: [...newParent.children] });
                    }
                });

                return updatedItems;
            });

            setAlldata(removeData);
            setSelectIdsChild([]);
            setSelectIdsParent([]);
        }
    };

    const handleRemovedItemsToSelectItems = () => {
        if (selectRemovedIdsChild.length !== 0) {
            const arrayItems = selectItems.flatMap(item => item.children);
            const newArrayItems = arrayItems.filter(a => selectRemovedIdsChild.includes(a.uniqueId));
            const remove = arrayItems.filter(a => !selectRemovedIdsChild.includes(a.uniqueId));
            const removeData = firstData(remove);
            const data = firstData(newArrayItems);

            setAlldata(prev => {
                const updatedData = [...prev];

                data.forEach(newParent => {
                    const parentIndex = updatedData.findIndex(a => a.id === newParent.id);

                    if (parentIndex !== -1) {
                        const updatedParent = { ...updatedData[parentIndex] };
                        updatedParent.quantity += 1

                        updatedParent.children = [...updatedParent.children, ...newParent.children];

                        updatedData[parentIndex] = updatedParent;
                    } else {
                        updatedData.push({ ...newParent, children: [...newParent.children] });
                    }
                });

                return updatedData;
            });

            setSelectItems(removeData);
            setSelectRemovedIdsChild([]);
            setSelectRemovedIdsParent([]);
        }
    };


    const handleChangeSelectId = (id: number | string, type: TypeItem) => {
        switch (type) {
            case 'parent':
                if (selectIdsParent.includes(String(id))) {
                    const all = [...selectIdsParent];
                    const findIndexItem = all.findIndex(a => a == String(id));
                    if (findIndexItem !== -1) {
                        all.splice(findIndexItem, 1);
                        setSelectIdsParent(all)
                    }
                    const arrayItems = alldata.flatMap(item => item.children);
                    const newArrayItems = arrayItems.filter(a => a.id == String(id));
                    const filterItemsId = selectIdsChild.filter(a => {
                        return !newArrayItems.some(item => item.uniqueId == a)
                    })

                    setSelectIdsChild(filterItemsId);
                } else {
                    const arrayItems = alldata;
                    const findList = arrayItems.find(a => a.id == String(id));
                    const childrensId = findList?.children.map(item => item.uniqueId)
                    if (childrensId) {
                        setSelectIdsChild(prev => [...prev, ...childrensId])
                    }
                    setSelectIdsParent(prev => [...prev, String(id)])
                }
                break;
            case 'child':
                if (selectIdsChild.includes(Number(id))) {
                    const all = [...selectIdsChild];
                    const findIndexItem = all.findIndex(a => a == Number(id));
                    if (findIndexItem !== -1) {
                        all.splice(findIndexItem, 1);
                        setSelectIdsChild(all)
                    }
                } else {
                    setSelectIdsChild(prev => [...prev, Number(id)]);
                }
                break;
            default:
                break
        }
    }
    const handleRemovedChangeSelectId = (id: number | string, type: TypeItem) => {
        switch (type) {
            case 'parent':
                if (selectRemovedIdsParent.includes(String(id))) {
                    const all = [...selectRemovedIdsParent];
                    const findIndexItem = all.findIndex(a => a == String(id));
                    if (findIndexItem !== -1) {
                        all.splice(findIndexItem, 1);
                        setSelectRemovedIdsParent(all)
                    }
                    const arrayItems = selectItems.flatMap(item => item.children);
                    const newArrayItems = arrayItems.filter(a => a.id == String(id));
                    const filterItemsId = selectRemovedIdsChild.filter(a => {
                        return !newArrayItems.some(item => item.uniqueId == a)
                    })

                    setSelectRemovedIdsChild(filterItemsId);
                } else {
                    const arrayItems = selectItems;
                    const findList = arrayItems.find(a => a.id == String(id));
                    const childrensId = findList?.children.map(item => item.uniqueId)
                    if (childrensId) {
                        setSelectRemovedIdsChild(prev => [...prev, ...childrensId])
                    }
                    setSelectRemovedIdsParent(prev => [...prev, String(id)])
                }
                break;
            case 'child':
                if (selectRemovedIdsChild.includes(Number(id))) {
                    const all = [...selectRemovedIdsChild];
                    const findIndexItem = all.findIndex(a => a == Number(id));
                    if (findIndexItem !== -1) {
                        all.splice(findIndexItem, 1);
                        setSelectRemovedIdsChild(all)
                    }
                } else {
                    setSelectRemovedIdsChild(prev => [...prev, Number(id)]);
                }
                break;
            default:
                break
        }
    }


    const resetData = async () => {
        allDataAPI()
    }
    ///useeffect for app

    useEffect(() => {
        allDataAPI()
    }, []);



    return <CoreContext.Provider value={{
        parenAllData: alldata,
        resetData,
        selectItems,
        handleAddItemsToSelectItems,
        handleChangeSelectId,
        selectIdsParent,
        selectIdsChild,
        handleRemovedChangeSelectId,
        handleRemovedItemsToSelectItems,
        selectRemovedIdsChild,
        selectRemovedIdsParent
    }}>{children}</CoreContext.Provider>;
};

export const useCoreContext = (): ICoreValues => useContext(CoreContext)

export default CoreContextProvider;
