import { iInputModel ,FormValidationHelper, iSelectModel, iRadioModel } from '@helpers/FormValidatorHelper.ts';
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
import {iBodyResponse} from '@services/PersonaServices'
const oDocumentTypeConstant = new DocumentTypeConstant();
export class OwnerInfoModel extends FormValidationHelper {
    
    sltDocumentType: iSelectModel<"DNI" | "CE" | "PAS" | "PTP"> = {
        name: "sltDocumentType",
        value: oDocumentTypeConstant.DNI.codeText as any,
        isRequired: true,
        keyCode: "codeText",
        keyText: "name",
        onChange: (value: any, form: OwnerInfoModel) => {
            let document = oDocumentTypeConstant.getDocumentByCodeText(value)
            console.log("document", document);
            return [{
                name: "inpDocumentNumber",
                pattern: document?.pattern,
                formatRegex: document?.regex,
                maxLength: document?.maxLength,
                type: document?.code === oDocumentTypeConstant.DNI.code ? "tel" : "text",
                value: (form.inpDocumentNumber.value || "").replace(document?.regex, "").substring(0, document?.maxLength),
            } as iInputModel]
        },
    };

    inpDocumentNumber: iInputModel = {
        name: "inpDocumentNumber",
        isRequired: true,
        formatRegex: oDocumentTypeConstant.DNI.regex,
        pattern: oDocumentTypeConstant.DNI.pattern,
        maxLength: oDocumentTypeConstant.DNI.maxLength,
        type: "tel",
        autoFocus: true,
    };

    inpFirstName: iInputModel = {
        name: "inpFirstName",
        isRequired: true,
        type: "text",
        autoFocus: false,
    };

    inpSecondName: iInputModel = {
        name: "inpSecondName",
        isRequired: true,
        type: "text",
        autoFocus: false,
    };
    
    inpLastname: iInputModel = {
        name: "inpLastname",
        isRequired: true,
        type: "text",
        autoFocus: false,
    };

    inpLastnameSecond: iInputModel = {
        name: "inpLastnameSecond",
        isRequired: true,
        type: "text",
        autoFocus: false,
    };

    inpBirthDate: iInputModel = {
        name: "inpBirthDate",
        isRequired: true,
        type: "date",
        maxLength: 9,
        pattern: "9[0-9]{8}",
    };

    rdGenre: iRadioModel = {
        isRequired: true,
        name: "rdGenre",
    };

    rdNumberInsurance: iRadioModel = {
        isRequired: true,
        name: "rdNumberInsurance",
    };

    fillByResponse (response: iBodyResponse){
        const document = Object.values(oDocumentTypeConstant).find(doc => doc.code == response.tipoDocumento)
        this.sltDocumentType.value = document?.codeText;
        this.inpDocumentNumber.value = response.numDocumento;
        this.inpFirstName.value = response.nombres;
        this.inpLastname.value = response.apellidoPaterno;
        this.inpLastnameSecond.value = response.apellidoMaterno;
        this.rdGenre.value = response.sexo;
    }
}