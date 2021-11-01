import React, { useState } from 'react'
import { iRadioModel } from '@helpers/FormValidatorHelper'
import './index.scss'

interface iProps {
  classItem?: string
  className?: string
  label?: string
  model: iRadioModel
  options: Array<{
    code: any
    name: any
    icon?: any
  }>
  onChange?: (event: any) => void
}

const Component: React.FunctionComponent<iProps> = (props: iProps) => {
  function selectOption (event: any) {
    props.onChange && props.onChange(event)
  }

  return (
    <div className='c_radio'>
      <p className='e-p5'>{props.label}</p>
      {props.options.map((elm, index) => {
        return (
          <div key={index} className='c_radio__item'>
            <input
              data-input-type='radio'
              type='radio'
              className='c_radio__item_radio_input'
              name={props.model.name || ''}
              value={elm.code}
              required={props.model.isRequired || false}
              onChange={selectOption}
              checked={props.model.value === elm.code}
            />
            <label className='c_radio__item_radio_label e-text-regular'>
              {elm.name}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default Component
