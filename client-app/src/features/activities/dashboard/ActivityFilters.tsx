import React from 'react'
import Calendar from 'react-calendar'
import { Menu, Header } from 'semantic-ui-react'

function ActivityFilters() {
  return (
    <>
    <Menu vertical size="large" style={{width:"100%", marginTop:"25px"}}>
        <Header icon="filter" attached color="teal" content="Filters"/>
        <Menu.Item content="All Activities"/>
        <Menu.Item content="I'm going"/>
        <Menu.Item content="I'm hosting"/>
    </Menu>
    <Calendar/>
    </>
  )
}

export default ActivityFilters