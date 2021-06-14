import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { select, getCollection } from 'lib/selectors'
import { isMobileScreen, getRandomInt } from 'lib/helpers'
import { showDomElements } from './helper'
import Button from './button'
import CloseButton from './closeButton'
import useDevices from '../hooks/useDevices'
import Dropdown from './dropdown'

const DeviceSelection = (props) => {
  const { heading, mediaInactiveMessage, cameraDropdownLabel, microphoneDropdownLabel, rejoinCta, demandMediaAccessCta, mediaDisclaimer, cameraOffText, cameraOnText, audioOffText, audioOnText, backgroundOffText, backgroundOnText } = jsConfigSecond.twilio
  const [buttonDisable, setButtonDisable] = useState(false)
  const [mediaAccessGranted, setMediaAccessGranted] = useState(false)
  const [cameraDropdownOptions, setCameraDropdownOptions] = useState(null)
  const [microphoneDropdownOptions, setMicrophoneDropdownOptions] = useState(null)
  const [isMobileView, setIsMobileView] = useState(isMobileScreen())
  const [isMicEnabled, setIsMicEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(true)
  const [mediaTracks, setMediaTracks] = useState(null)

  var devices = useDevices()

  const dropdownSelect = (device) => {
  }

  const authorizeAccess = () => {
    setButtonDisable(true)
    Twilio.Video.createLocalTracks().then(function (localTracks) {
      setMediaTracks(localTracks)
      const localMediaContainer = select('.localMedia__container')
      localTracks.forEach(function (track) {
        localMediaContainer.appendChild(track.attach())
      });
      // Selector for Video tag has to be defined only when the Video tracks have been attached to media container
      const localVideoTag = select("Video", localMediaContainer)
      if (localVideoTag) {
        localVideoTag.setAttribute("aria-hidden", true)
        localVideoTag.setAttribute("tabindex", "-1")
      }
      setButtonDisable(false)
      setMediaAccessGranted(true)
      setCameraDropdownOptions(devices.videoInputDevices)
      setMicrophoneDropdownOptions(devices.audioInputDevices)
    });
  }

  const rejoinAction = () => {
    props.reJoinedClicked(true)
}

  const closeModal = () => {
    props.closeClicked(true)
    showDomElements()
    const openModalCTA = select("#check-media-access-button")
    if (openModalCTA) {
      openModalCTA.focus()
    }
  }

  const resizeHandler = () => {
    setIsMobileView(isMobileScreen())
  }

  useEffect(() => {
    select("body").classList.add("has-modal")
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
      select("body").classList.remove("has-modal")
      // mediaTracks.forEach(tracks => stopTracks(tracks))
    }
  }, [])

  useEffect(() => {
    return () => {
      mediaTracks && mediaTracks.forEach(tracks => tracks.stop())
    }
  }, [mediaTracks])

  return (
    <div className="deviceSelection__modal" role="dialog" aria-label={heading} aria-modal="true">
      <div className="deviceSelection__wrapper" role="document">
        <div className="deviceSelection__close">
          <CloseButton onClick={closeModal} buttonText={heading} />
        </div>
        <div className="deviceSelection__header">
          <p className="heading is-5" role="heading" aria-level="1">
            {heading}
          </p>
        </div>
        <div className="deviceSelection__media-container">
          <div className="deviceSelection__status" role="status">
            {!mediaAccessGranted && <p>{mediaInactiveMessage}</p>}
          </div>
          <div className="localMedia__container"></div>
          <div className="localMedia__control-icons">
            <ul>
              <li>
                <Button
                  onClick={() => setIsMicEnabled(!isMicEnabled)}
                  disabled={!mediaAccessGranted}
                  spanClass="is-sr-only"
                  buttonText={isMicEnabled ? audioOffText : audioOnText}
                  iconName={isMicEnabled ? "microphone-on" : "microphone-off"}
                  iconSize="large"
                />
              </li>
              <li>
                <Button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  disabled={!mediaAccessGranted}
                  spanClass="is-sr-only"
                  buttonText={isVideoEnabled ? cameraOffText : cameraOnText}
                  iconName={isVideoEnabled ? "video-on" : "video-off"}
                  iconSize="large"
                />
              </li>
            </ul>
            <ul>
              <li>
                <Button
                  onClick={() => setIsBackgroundEnabled(!isBackgroundEnabled)}
                  disabled={!mediaAccessGranted}
                  spanClass="is-sr-only"
                  buttonText={isBackgroundEnabled ? backgroundOffText : backgroundOnText}
                  iconName={isBackgroundEnabled ? "background-on" : "background-off"}
                  iconSize="large"
                />
              </li>
            </ul>
          </div>
        </div>
        {!isMobileView && (
          <div className="deviceSelection__dropdown-container">
            <Dropdown
              dropdownIcon="video-on"
              onSelect={dropdownSelect}
              dropdownOptions={cameraDropdownOptions}
              dropdownTitle={cameraDropdownLabel}
              disabled={!mediaAccessGranted}
            />
            <Dropdown
              dropdownIcon="microphone-on"
              onSelect={dropdownSelect}
              dropdownOptions={microphoneDropdownOptions}
              dropdownTitle={microphoneDropdownLabel}
              disabled={!mediaAccessGranted}
            />
          </div>
        )}
        <p className={!isMobileView ? "is-sr-only" : "deviceSelection__mobileDisplayText"}>{mediaDisclaimer}</p>
        <div className="deviceSelection__action">
          <Button
            onClick={mediaAccessGranted ? rejoinAction : authorizeAccess}
            disabled={buttonDisable}
            buttonText={mediaAccessGranted ? rejoinCta : demandMediaAccessCta}
            buttonClass="is-primary"
          />
        </div>
      </div>
    </div>
  )
}

export default DeviceSelection