import React from 'react'
import { Badge } from 'react-bootstrap'

function SecondaryBadge(props) {
    return(
        <Badge bg="secondary">{props.badgeText}</Badge>
    )
}

function WarningBadge(props) {
    return(
        <Badge bg="warning">{props.badgeText}</Badge>
    )
}

function DangerBadge(props) {
    return(
        <Badge bg="danger">{props.badgeText}</Badge>
    )
}

function SuccessBadge(props) {
    return(
        <Badge bg="success">{props.badgeText}</Badge>
    )
}

export {
    SecondaryBadge, WarningBadge, DangerBadge, SuccessBadge
}