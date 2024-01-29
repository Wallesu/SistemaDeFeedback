import api from '../utils/feedbackUtils';

const controller = 'employeeregistrations';

const url = process.env.VUE_APP_ROOT_API + controller;

export default Object.assign({}, api.GetCrud(controller, null), {
  GetAll: dto => {
    return api.Axios.GetParams(url, dto);
  }
});
