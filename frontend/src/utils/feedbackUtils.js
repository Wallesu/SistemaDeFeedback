import Axios from 'axios';
import { store } from '@bmp-vue/core/plugins/store';
import { FormatURLParams } from './axiosUtils';
import util from '@bmp-vue/core/api/util';
import ui from '@bmp-vue/core/api/ui';
const crypto = require('crypto');
const gerarIdempotencyKey = () => crypto.randomBytes(16).toString('hex');

const axios = {
  GetParams: function (controller, params) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    params = params ? FormatURLParams(params) : {};
    return Axios.get(controller, {
      params,
      headers: { authorization: `Bearer ${token}` }
    }).then(HandleResponseBase, HandleErrorBase);
  },

  Post: function (controller, dto, headers, token) {
    const idempotencyKey = gerarIdempotencyKey();
    token = token ?? JSON.parse(localStorage.getItem('user')).token;
    store.commit('addRequest');
    if (headers) {
      headers.idempotencyKey = idempotencyKey;

      return Axios.post(controller, dto, headers).then(
        HandleResponseBase,
        HandleErrorBase
      );
    } else {
      return Axios.post(controller, dto, {
        headers: {
          authorization: `Bearer ${token}`,
          idempotencyKey
        }
      }).then(HandleResponseBase, HandleErrorBase);
    }
  },

  PostForm: function (controller, dto) {
    const idempotencyKey = gerarIdempotencyKey();
    const { token } = JSON.parse(localStorage.getItem('user'));
    return Axios.post(controller, dto, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${dto._boundary}`,
        authorization: `Bearer ${token}`,
        idempotencyKey
      }
    }).then(HandleResponseBase, HandleErrorBase);
  },

  Put: function (controller, id, dto) {
    const idempotencyKey = gerarIdempotencyKey();
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (!dto) {
      dto = {};
    }
    return Axios.put(controller + '/' + id, dto, {
      headers: {
        authorization: `Bearer ${token}`,
        idempotencyKey
      }
    }).then(HandleResponseBase, HandleErrorBase);
  },

  Delete: (controller, id) => {
    const idempotencyKey = gerarIdempotencyKey();
    const { token } = JSON.parse(localStorage.getItem('user'));
    return Axios.delete(controller + '/' + id, {
      headers: {
        authorization: `Bearer ${token}`,
        idempotencyKey
      }
    }).then(HandleResponseBase, HandleErrorBase);
  },

  Get: (controller, id) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return Axios.get(controller + '/' + id, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(HandleResponseBase, HandleErrorBase);
  }
};

const api = {
  ...util,
  Axios: axios,
  controller: 'UTIL', //passar UTIL apenas se quiser sobreescrever a UTIL padrão
  HandleResponseBase,
  HandleErrorBase
};

function HandleResponseBase(response) {
  ui.hideLoading();
  store.commit('removeRequest');

  const responseData = response.data;

  if (isValidResponse(response.count, responseData)) {
    return response;
  }

  if (responseData.meta) {
    return responseData;
  }

  const data = responseData.data || [];

  if (isValidResponse(responseData.count, data)) {
    return responseData;
  }

  return data;
}

function isValidResponse(count, data) {
  return (count && data) || (count === 0 && data.length === 0);
}

function HandleErrorBase(error) {
  ui.HideLoading();
  store.commit('removeRequest');

  if (error) {
    const response = error.response;
    if (response) {
      if (response.data.messages) {
        response.data.messages.map(message =>
          ui.ShowError(
            message.context,
            `${message.code} - ${message.description}`
          )
        );
        return response;
      }
    }
  }

  ui.ShowError('Erro', 'Ocorreu um erro inesperado');
  return { data: { hasError: true } };
}

export default api;
