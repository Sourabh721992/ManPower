import React, { Fragment } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { AddIconBtn } from '../Controls/Buttons/IconButtons'
import BuyerList from './BuyerList';

export default function TotalBuyerTab(props) {

    const count = props.count
    const list = props.list
    const history = useHistory();

    const onClickBtn = (e) => {
        history.push("/addBuyer")
    }

    return (
        <Fragment>
            <div className='d-flex justify-content-between p-4'>
                <h6>Total Buyers Count: {count}</h6>
                <div className="fl" style={{ marginLeft: "67%", cursor: "pointer" }} onClick={(e) => onClickBtn(e)}>
                    <div className="fl" style={{ width: "25px", marginTop: "8px" }}>
                        <IconContext.Provider value={{ color: "#3860C7", size: "1.4em" }} >
                            <div>
                                <BsFillPlusCircleFill />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <button className="btn addbtn">
                        Add New Buyer
                    </button>
                </div>
                {/* <AddIconBtn btnText={"Add new buyer"} onClickEvent={(e) => onClickBtn(e)} /> */}
            </div>

            <BuyerList buyerList={list} />
        </Fragment>
    )
}
