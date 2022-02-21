import React from "react"

import Modal from "react-bootstrap/Modal"
import Badge from "react-bootstrap/Badge"

import { CLOCK_EMOJI_HOUR_LIST, CLOCK_EMOJI_THIRTY_LIST } from "../constants"
import { IEvent } from "../interfaces"

interface PropTypes {
  show: boolean
  onHide: () => void
  formattedTime: string
  event: IEvent
}

const ModalDialog: React.FC<PropTypes> = ({
  event,
  formattedTime,
  onHide,
  show,
}) => {
  const hours = event.start.getHours()
  const minutes = event.start.getMinutes()

  const renderTime = () => {
    const list = (minutes < 30
      ? CLOCK_EMOJI_HOUR_LIST
      : CLOCK_EMOJI_THIRTY_LIST)[hours % 12]
    return (
      <span>
        <span role="img" aria-label="clock emoji">
          {list}
        </span>
        &nbsp;
        <span>{formattedTime}</span>
      </span>
    )
  }

  const renderLocation = () => {
    if (!event || !event.location) {
      return null
    }

    return (
      <Badge
        style={{
          padding: "0.5rem",
          textTransform: "uppercase",
        }}
        variant="primary"
      >
        {event.location}
      </Badge>
    )
    return (
      <p>
        <span role="img" aria-label="round pushpin emoji">
          📍
        </span>
        &nbsp;
        <span>{event.location}</span>
      </p>
    )
  }

  const renderCallLink = () => {
    if (!event || !event.callLink) {
      return null
    }

    return (
      <p>
        <span role="img" aria-label="round pushpin emoji">
          📍
        </span>
        &nbsp;
        <span>
          <a href={event.callLink} target="_blank">
            Meeting Link
          </a>
        </span>
      </p>
    )
  }

  const renderContentLink = () => {
    if (!event || !event.contentLink) {
      return null
    }

    return (
      <p>
        <span role="img" aria-label="round pushpin emoji">
          📍
        </span>
        &nbsp;
        <span>
          <a href={event.contentLink} target="_blank">
            Slides/VOD
          </a>
        </span>
      </p>
    )
  }

  const renderHosts = () => {
    if (!event || !event.subtitle) {
      return null
    }

    return (
      <p>
        <strong>Hosted by: </strong>
        {event.subtitle}
      </p>
    )
  }

  const renderDescription = () => {
    if (!event || !event.description) {
      return null
    }

    let re = /(https?:\/\/[^\s]+)/g

    let hits = event.description.match(re)
    var description = event.description
    if (hits) {
      hits.forEach(hit => {
        description = event.description.replaceAll(
          hit,
          `<a href=${hit} target='_blank'>${hit}</a>`
        )
      })
    }
    return <p dangerouslySetInnerHTML={{ __html: description }}></p>
  }

  const title = `${event.name} ${event.subtitle ? `- ${event.subtitle}` : ""}`

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {renderTime()}
          {renderLocation()}
        </p>

        {renderHosts()}
        {renderDescription()}
        {renderContentLink()}
        {renderCallLink()}
      </Modal.Body>
    </Modal>
  )
}

export default ModalDialog
