import React from "react"
import "./WorkshopView.css"

import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"

import { EventCategory, RelativeTime } from "../enums"

import EventListItem from "../components/EventListItem"
import ModalDialog from "../components/ModalDialog"
import { formattedEventTime, daysFromSchedule } from "../utils"
import { DUMMY_EVENT } from "../constants"
import { IEvent, IEventDay } from "../interfaces"
import _ from "lodash"

const WorkshopView = ({ schedule }) => {
  const days = daysFromSchedule(schedule)

  const [show, setShow] = React.useState(false)
  const [formattedTime, setFormattedTime] = React.useState("")
  const [workshop, setWorkshop] = React.useState(DUMMY_EVENT)

  const filterWorkshops = (events: IEvent[]) =>
    events.filter(event =>
      [EventCategory.Workshop1, EventCategory.Workshop2].includes(
        event.category
      )
    )

  const renderDays = () => {
    return _.map(days, (day, index) => {
      return (
        filterWorkshops(day.events).length !== 0 && (
          <div key={`workshop-day-${index}`} className="workshop-day">
            <h5>Day {index + 1}</h5>
            <div className="workshops">{renderEvents(day)}</div>
          </div>
        )
      )
    })
  }

  const renderEvents = (day: IEventDay) => {
    return _.map(filterWorkshops(day.events), (event, index) => {
      return (
        <div
          className="event-item-container"
          key={`event-list-item-${index}`}
          onClick={() => {
            setShow(true)
            setFormattedTime(formattedEventTime(event))
            setWorkshop(event)
          }}
        >
          <EventListItem
            event={event}
            showAsToday={false}
            relativeDayTime={RelativeTime.Future}
          />
        </div>
      )
    })
  }

  return (
    <Container id="workshop-view" fluid>
      <Col>
        <div>
          <ModalDialog
            show={show}
            onHide={() => setShow(false)}
            formattedTime={formattedTime}
            event={workshop}
          />
          {renderDays()}
        </div>
      </Col>
    </Container>
  )
}

export default WorkshopView
