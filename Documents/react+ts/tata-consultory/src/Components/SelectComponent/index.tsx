import React, { useState, useEffect, useRef } from 'react';
import { iSelectModel, iOnChangeSelect } from '@helpers/FormValidatorHelper.ts';
import {ReactComponent as ArrowDownIcon} from '@icons/arrow-down.svg'
import ReactDOM from 'react-dom';
import './index.scss'

interface iProps {
    label: string;
    model: iSelectModel;
    options?: Array<any>;
    className?: string;
    onChange?: (select: iOnChangeSelect) => void
}


const Component:React.FunctionComponent<iProps> = (props:iProps) => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [loadRender, setLoadRender] = useState<boolean>(false);
    const [position, setPosition] = useState<"top" | "bottom">("bottom");
    const [dropdownInlineStyle, setDropdownInlineStyle] = useState<any>({});
    let disabled = props.model?.disabled || false;
    let isLoading = props.model?.isLoading || false;
    let keyCode = props.model?.keyCode || "key";
    let keyText = props.model?.keyText || "text";
    let options = props.options || [];

    let refFormGroup: any = useRef(null);
    let refDropdown: any = useRef(null);

    useEffect(() => {
        !loadRender && setLoadRender(true)
      }, []);

    function handleChange(event: any) {
    }

    function handleDropdown(option:any) {
        props.onChange && props.onChange({
          name: props.model.name,
          keyCode: option[keyCode],
          keyText: option[keyText],
        });
      }

    const renderDropdown = () => {
        return (
          <div
            className={`c_select__dropdown e-animation-fadein-up-select ${(showDropdown ? "c_select__dropdown_Show" : '')}`}
            style={dropdownInlineStyle}
            ref={refDropdown}
          >
            <ul className="c_select__dropdown_list">
              {options.map((option) => {
                let optionCode = option[keyCode]
                let optionText = option[keyText]
                return (
                  <li
                    className={`c_select__dropdown_item e-text-regular ${optionCode === props.model.value ? "c_select__dropdown_item_Selected": ''}`}
                    onMouseDown={() => { handleDropdown(option) }}
                    key={optionCode}
                    data-keyprop={optionCode}
                  >
                    {optionText}
                  </li>
                )
              })}
              {
                !options.length &&
                <li className={`c_select__dropdown_item e-text-regular`}>Sin resultados</li>
              }
            </ul>
          </div>
        )
      }

    function hideDropdown() {
        setShowDropdown(false);
    }

    function getOptionActive() {
        let dafaultValues = { value: "", valueText: "" }

        if (props.model.value && options.length > 0) {
            for (const option of options) {
            let optionCode = option[keyCode]
            let optionText = option[keyText]

            if (optionCode === props.model.value) {
                dafaultValues = {
                value: optionCode,
                valueText: optionText,
                }
            }
            }
        }

        return dafaultValues
    }
    
    function evaluateShowDropdown() {
        if (showDropdown) {
            hideDropdown();
        }
        else {
            setShowDropdown(true);
        }
    }

    return (
        <div className={`c_select ${props.className}`}>
            <input
            name={props.model.name}
            className={`c_select__field e-text-regular`}
            required={props.model.isRequired || false}
            type="text"
            onClick={evaluateShowDropdown}
            onBlur={hideDropdown}
            onChange={handleChange}
            disabled={disabled || isLoading}
            readOnly
            value={getOptionActive().valueText}
            data-input-type="select"
            />
            <span className={`c_select__icon_container ${(showDropdown ? 'show' : '')}`}>
            <ArrowDownIcon className={"c_select__icon"} />
            </span>

            {
            loadRender &&
                renderDropdown()
            }
        </div>
    )
}

export default Component;