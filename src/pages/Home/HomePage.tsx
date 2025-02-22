import BoxItem from "../../components/item/BoxItem";
import { useCoreContext } from "../../context/Core.context";
import './HomePaege.scss'
import { Alert, Button } from "@mui/material";

const HomePage = () => {
    const {
        parenAllData,
        handleChangeSelectId,
        handleAddItemsToSelectItems,
        selectItems,
        selectIdsChild,
        selectIdsParent,
        handleRemovedChangeSelectId,
        handleRemovedItemsToSelectItems,
        selectRemovedIdsChild,
        selectRemovedIdsParent
    } = useCoreContext()

    return <div className="  container  ">
        <div className="row">
            <div className="col-lg-6 col-12">
                <div className="right-container p-3 ">
                    <p>All Data</p>
                    <div className="d-flex w-100 justify-content-end mb-3">
                        <Button onClick={handleAddItemsToSelectItems} disabled={selectIdsChild.length === 0} size="small" variant="contained" >Add</Button>
                    </div>

                    <div className="d-flex flex-column w-100">
                        {
                            parenAllData?.length !== 0 ?
                                parenAllData.sort((a, b) => a.id.localeCompare(b.id)).map((item) => {
                                    return (
                                        <BoxItem
                                            selectIdsParent={selectIdsParent}
                                            selectIdsChild={selectIdsChild}
                                            handleChangeSelectId={handleChangeSelectId}
                                            key={item.id}
                                            item={item} />
                                    )
                                }) :
                                <Alert severity="warning">Not Fund Data!</Alert>
                        }
                    </div>

                </div>
            </div>
            <div className="col-lg-6 col-12">
                <div className="left-container p-3">
                    <p>Select Project</p>
                    <div className="d-flex w-100 justify-content-end mb-3">
                        <Button onClick={handleRemovedItemsToSelectItems} disabled={selectRemovedIdsChild.length === 0} size="small" variant="contained" >Delete</Button>
                    </div>
                    <div className="d-flex flex-column w-100">
                        {
                            selectItems.sort((a, b) => a.id.localeCompare(b.id)).map((item) => {
                                return (
                                    <BoxItem
                                        selectIdsParent={selectRemovedIdsParent}
                                        selectIdsChild={selectRemovedIdsChild}
                                        handleChangeSelectId={handleRemovedChangeSelectId}
                                        key={item.id}
                                        item={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default HomePage;
