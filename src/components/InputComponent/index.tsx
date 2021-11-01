import React from 'react';
import { iInputModel } from '@helpers/FormValidatorHelper.ts';
import { FormPattern } from '@helpers/FormPattern';
import './index.scss';

interface iProps{
    label: string;
    className: string;
    model:iInputModel;
    onChange?: (event: any) => void;
}

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
  let oFormConstant = new FormPattern()
  let value = props.model.value || "";
  let type = props.model.type || "text";

    function handleChange(event: any) {
        let targetValue = event.target.value
        let targetType = event.target.type
    
        if (props.model.formatRegex) {
          targetValue = targetValue.replace(props.model.formatRegex, "");
        }
    
        if (targetType === "tel") {
          targetValue = targetValue.replace(/[^0-9]/g, "");
        }
    
        if (props.model.toUpperCase) {
          targetValue = targetValue.toUpperCase()
        }
    
        if (props.model.toLowerCase) {
          targetValue = targetValue.toLowerCase()
        }
        
        event.target.value = targetValue;
        props.onChange && props.onChange(event);
      }

    function getPattern() {
      let pattern: any
      switch (type) {
        case "email":
          pattern = oFormConstant.pattern.email
          break;
  
        default:
          pattern = props.model.pattern || null
          break;
      }
      return pattern
    }

    function isInvalid(): boolean {
      return Boolean(props.model.validity && (
        props.model.validity.patternMismatch ||
        props.model.validity.typeMismatch ||
        props.model.postSubmitError ||
        (props.model.validationError && !props.model.validationError.valid) ||
        props.model.validity.tooShort
      ))
    }

    let classHasValue = value.length ? "c_input__wrapper__HasValue" : "";
    let classInvalid = isInvalid() ? "c_input__wrapper__IsInvalid" : "";
    return (
        <div className={`c_input ${props.className}`}>
            <div className={`c_input__wrapper ${classHasValue} ${classInvalid}`}>
                <input className="c_input__wrapper_field"
                    name={props.model.name}
                    required={props.model.isRequired || false}
                    disabled={props.model.disabled || false}
                    type={type}
                    value={value}
                    pattern={getPattern()}
                    onChange={handleChange}
                    minLength={props.model.minLength}
                    maxLength={props.model.maxLength}
                >
                </input>
                <label className="c_input__label e-text-regular">{props.label}</label>
            </div>
        </div>
    )
}

export default Component;