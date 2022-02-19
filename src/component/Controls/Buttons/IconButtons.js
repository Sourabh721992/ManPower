import React from 'react'
import { Button } from 'react-bootstrap'
import { FiUsers, FiSearch, FiTrash2 } from 'react-icons/fi'
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
    <Button variant="link" className='bg-transparent text-dark rounded-0' 
      style={{textDecoration:"none", borderBottomColor: "#3860C7"}} onClick={props.onClickEvent}>
      <MdOutlineAddCircle className="mr-1 text-primary" style={{ fontSize: "20px" }} /> {props.btnText}
    </Button>
  )
}


function DeleteIconBtn(props) {
  return (
    <Button disabled={props.disabled} variant="link" onClick={props.onClickEvent}>
      <FiTrash2 className='text-danger' style={{ fontSize: "18px" }} />
    </Button>
  )
}

export {
  SearchIconBtn, UsersIconBtn, AddIconBtn, DeleteIconBtn
}