import React, { useEffect, useState } from "react"
import "./ScheduleView.css"

import {
  ONE_MINUTE_MILLISECOND,
  SHOW_AS_LIVE_DATES,
  MOBILE_BREAKPOINT_WIDTH,
  ONE_DAY_MILLISECOND,
  EVENT_END_TIME_DATE,
} from "../constants"
import { EventListener, RelativeTime } from "../enums"
import { IEvent, IEventDay } from "../interfaces"
import { getRelativeDayTime, daysFromSchedule, isSameDay } from "../utils"
import _ from "lodash"

import { Container, Row, Col } from "react-bootstrap"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

import Loadable from "@loadable/component"

import EventListComponent from "../components/EventListComponent"

import DiscordComponent from "../components/DiscordComponent"
import TwitterComponent from "../components/TwitterComponent"

type Props = {
  schedule: IEvent[]
}

const TimelineComponent = Loadable(
  () => import("../components/TimelineComponent")
)

const ScheduleView: React.FC<Props> = ({ schedule }) => {
  const [mobile, setMobile] = useState(true)
  const [, setDummy] = useState()

  const days = daysFromSchedule(schedule)

  let initialDay = days[0]
  for (let i = 0; i < days.length; i++) {
    if (getRelativeDayTime(days[i].date) === RelativeTime.Present) {
      initialDay = days[i]
      i = days.length // End loop
    }
  }

  const [day, setDay] = useState(initialDay)

  const updateDimensions = () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT_WIDTH
    if (mobile !== isMobile) {
      setMobile(isMobile)
    }
  }

  const selectToday = () => {
    for (let i = 0; i < days.length; i++) {
      if (isSameDay(new Date(), days[i].date)) {
        setDay(days[i])
      }
    }
  }

  useEffect(() => {
    selectToday()
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener(EventListener.Resize, updateDimensions)
    const interval = setInterval(() => {
      setDummy({})
    }, ONE_MINUTE_MILLISECOND)

    return () => {
      window.removeEventListener(EventListener.Resize, updateDimensions)
      clearInterval(interval)
    }
  })

  const hasPassed =
    new Date().getTime() >= EVENT_END_TIME_DATE.getTime() + ONE_DAY_MILLISECOND

  const relativeDayTime = hasPassed
    ? RelativeTime.Future
    : getRelativeDayTime(day.date)

  const showAsToday =
    (relativeDayTime === RelativeTime.Present || !SHOW_AS_LIVE_DATES) &&
    !hasPassed

  const renderTimelineDays = () => {
    const createLabels = () => {
      return _.map(days, (eventDay, index) => {
        const isActive = index === day.index
        const color = isActive ? "#f89b6a" : "#3a3a3a"

        return (
          <Button
            key={`btn-group-${index}`}
            onClick={() => setDay(eventDay)}
            className="day-label-btn"
            active={true}
            style={{
              backgroundColor: color,
              borderColor: color,
              fontSize: "1em",
            }}
          >
            {(!mobile && eventDay.longTitle) || eventDay.title}
          </Button>
        )
      })
    }

    return (
      <div className="d-flex flex-column">
        <ButtonGroup>{createLabels()}</ButtonGroup>
      </div>
    )
  }

  return (
    <Container id="schedule">
      <Col>
        *All times are relative to your locale
        <div>
          {renderTimelineDays()}
          <TimelineComponent
            day={day}
            showAsToday={showAsToday}
            relativeDayTime={relativeDayTime}
          />
          <EventListComponent
            key={day.title}
            day={day}
            showAsToday={showAsToday}
            relativeDayTime={relativeDayTime}
          />
        </div>
        <Row className="extra-content">
          <DiscordComponent
            className="discord-container"
            serverId="753747861480669312"
          />
          <TwitterComponent
            className="twitter-container"
            account="VT_Hacks"
            limit={5}
            theme="light"
            alt=""
          />
        </Row>
      </Col>
    </Container>
  )
}

export default ScheduleView
