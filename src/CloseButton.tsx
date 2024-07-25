import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CloseButton = () => {
  return (
    <div className='close-button rounded' style={{height: '24px', width: '24px', backgroundColor: '#4338CA'}}>
        <FontAwesomeIcon icon={faXmark} style={{color: 'white'}} />
    </div>
  )
}

export default CloseButton

