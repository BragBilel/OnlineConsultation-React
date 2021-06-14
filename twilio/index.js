import React from 'react'
import { render } from 'react-dom'
import { select } from 'lib/selectors'
import { Provider } from 'react-redux'
import * as xhr from "modules/fetch"
import configureStore from './Redux/configureStore'
import bind from 'delegate'
import ChanelTwilioVideo from './Components/chanelTwilioVideo'
import { hideDomElements } from './Components/helper'
import scriptjs from 'scriptjs'

const store = configureStore()
const twilioWrapper = select('.twilio-content-container')

let errorField

function handleSubmit(event) {
  event.preventDefault()
  const inputField = select("#onlineConsultation-email")
  if (inputField) {
    const requestdata = {
      "room-id": jsConfigSecond.twilio.roomId,
      "user-id": inputField.value
    }
    xhr.get(jsConfigSecond.twilio.clientEmailVerify, { data: requestdata })
      .then((res) => {
        if (res.error === 'false') {
          if (inputField.getAttribute("aria-describedby") != null) {
            inputField.removeAttribute("aria-describedby")
          }
          const twilioBox = select(".twilio-main-box")
          twilioBox ? twilioBox.classList.add('is-hidden') : ''
          errorHandling(null, false)
          loadTwilioSdk().then(() => {
            render(
              <Provider store={store}>
                <ChanelTwilioVideo appointmentDate={res.appointmentDate} appointmentTime={res.appointmentTime} isBA={jsConfigSecond.twilio.isBA} currentTimestamp={Date.now()} />
              </Provider>,
              twilioWrapper
            )
          })
        } else {
          inputField.setAttribute("aria-describedby", "email-error-message")
          inputField.focus()
          errorHandling(res.errorMsg, true)
        }
      })
  }
}

function errorHandling(message, condition = false) {
  const formField = select('.field')
  if (condition === true) {
    if (formField) {
      formField.classList.add('has-error')
      errorField = document.createElement('p')
      errorField.classList.add('error')
      errorField.setAttribute('tabindex', '-1')
      errorField.classList.remove('is-hidden')
      errorField.innerHTML = message
      formField.appendChild(errorField);
    } else {
      if (formField) { formField.classList.remove('has-error') }
      errorField = formField.select('.error')
      if (errorField) {
        errorField.classList.add('is-hidden')
        errorField.innerHTML = ''
        formField.removeChild(errorField);
      }
    }
  }
}
function grantAccessToMedia() {
  loadTwilioSdk().then(() => {
    render(
      <Provider store={store}>
        <ChanelTwilioVideo isBA={jsConfigSecond.twilio.isBA} currentTimestamp={Date.now()} />
      </Provider>,
      twilioWrapper
    )
  })
  hideDomElements()
}

function loadTwilioSdk() {
  const sdkURL = jsConfigSecond.twilio.sdk
  const sdkPromise = new Promise(resolve => scriptjs(sdkURL, () => {
    resolve(window.twilioSdk)
  }))
  return sdkPromise
}
function init() {
  bind(document.body, '[id="twilio-launch-button"]', "click", handleSubmit);
  bind(document.body, '[id="check-media-access-button"]', "click", grantAccessToMedia);

}

export {
  init
}