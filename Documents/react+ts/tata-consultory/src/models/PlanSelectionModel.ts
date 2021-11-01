import { FormValidationHelper,iRadioModel } from '@helpers/FormValidatorHelper.ts';
export class PlanSelectionModel extends FormValidationHelper {

    rdPlanInsurance: iRadioModel = {
        isRequired: true,
        name: "rdPlanInsurance",
        value: 0
    };
}