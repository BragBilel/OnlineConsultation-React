import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const Icon = ({ name, size, alt, styleModifier = '', hideAltText, dataTest = '' }) => {
  const isSize = (size) ? `is-${size}` : ''
  const altText = (alt && !hideAltText) ? <span className="is-sr-only">{alt}</span> : ''
  return (
      <Fragment>
          <svg data-test={dataTest} className={`icon ${isSize} ${styleModifier} is-${name}`} focusable="false" viewBox="0 0 1 1" aria-hidden="true">
              <use xlinkHref={`${config.theme}/assets/icons.svg${config.targetVersion}#${name}`} />
          </svg>
          {altText}
      </Fragment>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  alt: PropTypes.string,
  styleModifier: PropTypes.string,
  hideAltText: PropTypes.bool,
  dataTest: PropTypes.string
}

export default Icon
