import React, { useEffect, useState } from 'react'
import Icon from '../../searchOverlay/components/Icon'
import Button from './button'

const ChanelTwilioConsultation = (props) => {
  const{consultationText, consultationLeave, consultationAriaLabel, isBA} = jsConfigSecond.twilio
  

  return (
      <div className="consultation__container" aria-modal="true" role="dialog" aria-label={consultationAriaLabel}>
        <div role="document">
          <div className="consultation__header">
            <div className="consultation__header-left">
              <div className="text-quit"><button type="button">{consultationLeave}</button></div>
            </div>
            {isBA && <div className="consultation__header-right">
              <div className="user-icon"><Icon name={'account'} size={'large'}/></div>
            </div>}
        </div>
        <div className="consultation__body">
          <div className="consultation__video">{isBA && consultationText} {isBA && <p role="heading" aria-level="1" className="is-sr-only">{consultationText}</p>}</div>
          <div className="consultation__bar"></div>
          <div className="consultation__caller">
            <div className="caller-block"><img src={`${config.theme}/assets/media/caller.jpg`} alt="" />
              <span className="caller-name">MARION</span>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default ChanelTwilioConsultation;