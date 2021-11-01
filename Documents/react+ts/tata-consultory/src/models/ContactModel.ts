import { iInputModel, iCheckboxModel ,FormValidationHelper, iSelectModel } from '@helpers/FormValidatorHelper.ts';
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
const oDocumentTypeConstant = new DocumentTypeConstant();
export class ContactModel extends FormValidationHelper {
    
    sltDocumentType: iSelectModel<"DNI" | "CE" | "PAS" | "PTP"> = {
        name: "sltDocumentType",
        value: oDocumentTypeConstant.DNI.codeText as any,
        isRequired: true,
        keyCode: "codeText",
        keyText: "name",
        onChange: (value: any, form: ContactModel) => {
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

    inpBirthDate: iInputModel = {
        name: "inpBirthDate",
        isRequired: true,
        type: "date",
        maxLength: 9,
        pattern: "9[0-9]{8}",
    };

    inpMobilephoneNumber: iInputModel = {
        name: "inpMobilephoneNumber",
        isRequired: true,
        type: "tel",
        maxLength: 9,
        pattern: "9[0-9]{8}",
    };

    chkAllowPolicyProtection: iCheckboxModel = {
        name: "chkAllowPolicyProtection",
        isRequired: true,
    };
    chkAllowPolicyDelivery: iCheckboxModel = {
        name: "chkAllowPolicyDelivery",
        isRequired: true,
    };
}