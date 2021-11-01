import { FormValidationHelper, iRadioModel } from '@helpers/FormValidatorHelper'
export class PlanSelectionModel extends FormValidationHelper {
  rdPlanInsurance: iRadioModel = {
    isRequired: true,
    name: 'rdPlanInsurance',
    value: 0
  }
}
