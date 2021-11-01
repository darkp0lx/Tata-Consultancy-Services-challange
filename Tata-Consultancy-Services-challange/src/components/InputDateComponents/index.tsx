import React from 'react';
import './index.scss';
import { iInputModel } from '@helpers/FormValidatorHelper.ts';
interface iProps {
    label: string;
    className?: string;
    model:iInputModel;
    onChange?: (event: any) => void;
}

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    let value = props.model.value || "";

    function handleChange(event: any) {
        let targetValue = event.target.value
        let targetType = event.target.type
        
        event.target.value = targetValue;
        props.onChange && props.onChange(event);
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
                <input className="c_input__wrapper_field date"
                    name={props.model.name}
                    required={props.model.isRequired || false}
                    disabled={props.model.disabled || false}
                    value={value}
                    type={"date"}
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