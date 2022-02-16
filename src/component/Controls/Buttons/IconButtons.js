import React from 'react'
import { Button } from 'react-bootstrap'
import { FiUsers, FiSearch } from 'react-icons/fi'

function SearchIconBtn(props) {
  return (
    <Button variant="link" size="sm" onClick={props.onClickEvent}>
          <FiSearch style={{fontSize:"18px"}} />
    </Button>
  )
}

function UsersIconBtn(props) {
  return (
    <Button variant="link" size="sm" onClick={props.onClickEvent}>
          <FiUsers style={{fontSize:"18px"}} />
    </Button>
  )
}


export {
  SearchIconBtn, UsersIconBtn
}