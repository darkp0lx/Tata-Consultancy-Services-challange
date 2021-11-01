import React from 'react';
import { iCheckboxModel } from '@helpers/FormValidatorHelper.ts';
import './index.scss';
interface iProps{
    label: JSX.Element;
    className?: string;
    model:iCheckboxModel;
    onChange?: (event: any) => void;
}

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    function isInvalid(): boolean {
        return Boolean(props.model.isRequired && !props.model.value)
      }
    function handleChange(event: any) {
        props.onChange && props.onChange(event);
    }

    let classInvalid = isInvalid() ? "c_checkbox__IsInvalid" : "";
    return (
        <div className={`c_checkbox ${classInvalid}`}>
            <input 
            className="c_checkbox__input" 
            id={props.model.name} 
            type="checkbox"
            name={props.model.name}
            checked={props.model.value || false}
            onChange={handleChange}
            ></input>
            <label className=" c_checkbox__label e-text-light">{props.label}</label>
        </div>
    )
}

export default Component;