import { useEffect} from 'react';
import {OverlayTrigger, Tooltip } from 'react-bootstrap';

const KPI = ({kpi}) => {

    // useEffect(() => {
    //     handleClose()
    // }, [kpi])

    return (
    <>
        <td>{kpi.perspective}</td>
        <td>{kpi.objective}</td>
        <td>{kpi.kpi_name}</td>
        <td>{parseInt(kpi.kpi_weight)}</td>
        <td>{parseInt(kpi.kpi_target)}</td>
        <td>{kpi.kpi_unit_measurement}</td>
        <td>
            <div style={{display:"flex", flexDirection:"row" }}>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                        Detail
                        </Tooltip>
                    }>
                    <button  className="btn  btn-act row" data-toggle="modal"><i className="material-symbols-outlined">visibility</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button   className="btn text-warning btn-act row" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button className="btn  btn-act row" style={{color:"black"}} data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>
            </div>
        </td>
        
    </>
     
    )
}
export default KPI;
