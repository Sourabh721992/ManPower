import React from 'react'
import { Button } from 'react-bootstrap'
import { FiUsers, FiSearch } from 'react-icons/fi'
import { MdOutlineAddCircle } from 'react-icons/md'

function SearchIconBtn(props) {
  return (
    <Button variant="link" size="sm" onClick={props.onClickEvent}>
      <FiSearch style={{ fontSize: "18px" }} />
    </Button>
  )
}

function UsersIconBtn(props) {
  return (
    <Button variant="link" size="sm" onClick={props.onClickEvent}>
      <FiUsers style={{ fontSize: "18px" }} />
    </Button>
  )
}

function AddIconBtn(props) {
  return (
    <Button variant="link" onClick={props.onClickEvent}>
      <MdOutlineAddCircle className="mr-1" style={{ fontSize: "20px" }} /> {props.btnText}
    </Button>
  )
}


export {
  SearchIconBtn, UsersIconBtn, AddIconBtn
}