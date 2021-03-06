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
import NoContentComponent from "../components/NoContentComponent"

const WorkshopView = ({ schedule, name, whitelist }) => {
  const days = daysFromSchedule(schedule)

  const [show, setShow] = React.useState(false)
  const [formattedTime, setFormattedTime] = React.useState("")
  const [workshop, setWorkshop] = React.useState(DUMMY_EVENT)

  const filterWorkshops = (events: IEvent[]) =>
    events.filter(
      event =>
        [EventCategory.Workshop, EventCategory.Workshop].includes(
          event.category
        ) && event.display
    )

  const renderDays = () => {
    var n = 0
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < days[i].events.length; j++) {
        if (whitelist.includes(days[i].events[j].category)) {
          n++
          break
        }
      }
      if (n > 0) {
        break
      }
    }
    if (n < 1) {
      return (
        <Container>
          <Col>
            <NoContentComponent name={name} />
          </Col>
        </Container>
      )
    }

    return _.map(days, (day, index) => {
      return (
        day.events.length !== 0 && (
          <div key={`workshop-day-${index}`} className="workshop-day">
            <h5>Day {index + 1}</h5>
            <div className="workshops">{renderEvents(day)}</div>
          </div>
        )
      )
    })
  }

  const renderEvent = event => {
    if (!whitelist.includes(event.category)) {
      return null
    }

    return (
      <EventListItem
        event={event}
        showAsToday={false}
        relativeDayTime={RelativeTime.Future}
      />
    )
  }

  const renderEvents = (day: IEventDay) => {
    return _.map(day.events, (event, index) => {
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
          {renderEvent(event)}
        </div>
      )
    })
  }

  return (
    <Container id="workshop-view">
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
