import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader';

function ReactSpinner(props) {
    return (
        <div style={{ width: "100px", left: "50%", top: "40%", position: "fixed" }}>
            <BeatLoader color="#708090" loading={props.loading} size={25} />
        </div>
    )
}

export default ReactSpinner;