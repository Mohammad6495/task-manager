import React from "react";
import { IParentAllData, TypeItem } from "../../Interface/Interface";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox } from "@mui/material";
import { convertPersianTime } from "../../utils";

type Props = {
    item: IParentAllData,
    handleChangeSelectId: (id: number | string, type: TypeItem) => void;
    selectIdsChild: number[]
    selectIdsParent: string[]
}

const BoxItem: React.FC<Props> = ({ item, handleChangeSelectId, selectIdsChild, selectIdsParent }) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion sx={{ width: '100%', zIndex: 2 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <div className="d-flex align-items-center justify-content-between w-100">
                    <Typography component="span" className="d-flex align-items-center">
                        <Checkbox
                            checked={selectIdsParent.includes(item.id)}
                            onChange={() => handleChangeSelectId(item.id, "parent")}
                            sx={{ zIndex: 1000 }}
                            {...label}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="d-flex align-items-center justify-content-center" style={{ borderRadius: '50%', backgroundColor: 'rgb(241, 241, 241)', width: '30px', height: '30px' }}>
                            {item.id}
                        </div>
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                        quantity : {item.quantity}
                    </Typography>
                    <div></div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{ width: '100%' }}>
                {
                    item.children.sort((a, b) => a.uniqueId - b.uniqueId).map((child, index) => (
                        <div className=" w-100 d-flex align-items-center justify-content-between mb-2 rounded px-2" key={index} style={{ border: '1px solid rgb(199, 197, 197)', backgroundColor: 'rgb(241, 241, 241)' }}>
                            <div>
                                #{child.uniqueId}
                            </div>
                            <div>
                                {convertPersianTime(child.created)}
                            </div>
                            <div>
                                <Checkbox
                                    checked={selectIdsChild.includes(child.uniqueId)}
                                    onChange={() => handleChangeSelectId(child.uniqueId, 'child')}
                                    sx={{ zIndex: 1000 }}
                                    {...label}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    ))
                }
                <Typography>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default BoxItem;
