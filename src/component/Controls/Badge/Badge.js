import React from 'react'
import { Badge } from 'react-bootstrap'

function SecondaryBadge(props) {
    return(
        <Badge variant="secondary">{props.badgeText}</Badge>
    )
}

export {
    SecondaryBadge
}