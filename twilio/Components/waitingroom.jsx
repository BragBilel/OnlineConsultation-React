import React, { useEffect, useState } from 'react'
import { select } from 'lib/selectors'
import Button from './button'

const WaitingRoom = (props) => {
  const { waitingRoomFooterHeading, waitingRoomFooterP1, waitingRoomFooterP2, waitingRoomFooterP3, waitingRoomFooterP4, waitingRoomHeader, waitingRoomText, heading, text, startCTA } = jsConfigSecond.twilio
  const [appointmentTime, setAppointmentTime] = useState(props.appointmentTime)
  const [appointmentDate, setAppointmentDate] = useState(props.appointmentDate)
  useEffect(() => {
    setAppointmentDate(props.appointmentDate)
    setAppointmentTime(props.appointmentTime)
    const waitingroomcontainer = select('.waitroom-container')
    if (waitingroomcontainer) {
      waitingroomcontainer.insertAdjacentHTML('afterend', ` <div class="waitingroom-footer">
                        <h2 class="waitingroom-footer-header heading"> ${waitingRoomFooterHeading}</h2>
                        <div>
                            <p>${waitingRoomFooterP1}</p>
                            <p>${waitingRoomFooterP2}</p>
                            <p>${waitingRoomFooterP3}</p>
                            <p>${waitingRoomFooterP4}</p>
                        </div>
                    </div>`)
    }
    return () => {
      const waitingRoomFooter = select('.waitingroom-footer')
      if (waitingRoomFooter) { waitingRoomFooter.remove() }
    }
  })
  const showDeviceSelectionScreen = () => {
    props.showDeviceSelectionScreen(true)
  }
  return (
    <React.Fragment>
      <div className="waitroom-container">
        <div className="context has-text-centered">
          <div className="waitroom-header">
            <p className="waitroom-appointmentMessage"> {waitingRoomHeader}</p>
            <Button
              buttonClass="is-primary"
              id="check-media-access-button"
              onClick={showDeviceSelectionScreen}
              buttonText={startCTA}
              spanClass="button__wrapper" />
          </div>
          <div className="twilio-main-box cl-waitingroom-mobile">
            <h1 className="heading cl-page-heading is-white">{heading}</h1>
            <div className=" client-room subhead is-white">
              <h2 className="beauty-text booking-detail-head">{text}</h2>
              <div className="meeting-text">
                <p className="gestures-message">{waitingRoomText}</p>
              </div>
            </div>
            <div className="details-container appointment-schedule">
              <h2 className="appointment-date">{appointmentDate}</h2>
              <p className="appointment-time">{appointmentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

}


export default WaitingRoom