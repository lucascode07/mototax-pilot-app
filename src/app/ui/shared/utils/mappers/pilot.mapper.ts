import { Pilot } from '../../../../domain/pilot/models/pilot.model';

export const pilotMapper = (form: any): Pilot => {
  delete form.passwordConfirm;
  return form;
};
