import React, { useEffect, useState } from 'react'
import { select } from 'lib/selectors'
import WaitingRoom from './waitingroom'
import DeviceSelection from './deviceSelection'
import ChanelTwilioConsultation from './chanelTwilioConsultation'

const ChanelTwilioVideo = (props) => {
  const { isBA, currentTimestamp } = props
  const [showDeviceSelection, setShowDeviceSelection] = useState(isBA)
  const [reJoined, setReJoined] = useState(false)
  
  const showDeviceSelectionScreen = (value) => {
    setShowDeviceSelection(value)
  }

  const closeClicked = (value) => {
    setShowDeviceSelection(!value)
  }
  
  const reJoinedClicked = (value) => {
    setShowDeviceSelection(false)
    setReJoined(value)
  }
  
  useEffect(() => {
    if (isBA) {
      setShowDeviceSelection(true)
    }
  }, [currentTimestamp])

  return (
    <React.Fragment>
      {!isBA && !showDeviceSelection && !reJoined && <WaitingRoom {...props} showDeviceSelectionScreen={showDeviceSelectionScreen} />}
      {showDeviceSelection && <DeviceSelection closeClicked={closeClicked} reJoinedClicked={reJoinedClicked} />}
      {reJoined && <ChanelTwilioConsultation  />}
    </React.Fragment>
  );
}


export default ChanelTwilioVideo
