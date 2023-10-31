import axios from "axios";

export const data = { 
    "msg": "This is transaction approval",
    "subject": "This is subject",
    "txFlow": "changePassword"
};

var config = (url, headers, payload) => ({
  method: "post",
  url: `http://localhost:5080/${url}`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-brand": "ben",
    "x-channel": "mob",
    "x-access-id": "3067183801",
    "x-connect-tran-id": "94a2fda3-64d4-4613-b3b7-f97fa79f40e8",
    "x-digital-uuid": "digital01",
    "x-host": "apiTest",
    "x-session-id": "session01",
    "x-user-uuid": "user01",
    "x-ibm-client-id": "",
    "x-ibm-client-secret": "",
    "x-global-transaction-id": "94a2fda3-64d4-4613-b3b7-f97fa79f40e8",
    "x-member-id": "T01",
    ...headers
  },
  data: payload ? payload : data,
});

// const headers = [
//     'Content-Type',
//     'Accept',
//     'x-brand',
//     'x-channel',
//     'x-access-id',
//     'x-connect-tran-id',
//     'x-digital-uuid',
//     'x-host',
//     'x-session-id',
//     'x-user-uuid',
//     'x-ibm-client-id',
//     'x-ibm-client-secret',
//     'x-global-transaction-id',
//     'x-member-id',
//     'x-tx-channel'
//   ];

// Enables verbose validation errors.
// inside default.js
// routes: {
//     validate: {
//       failAction: (_: any, __: any, error: any): any => error
//     },
//     cors: {
//       origin: ['http://localhost:3001'],
//       headers: headers
//     }
//   }

export async function initiateTx() {
  const response = await axios(config('v1/eid/identity/tx', {"x-tx-channel": "mob"}))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    });

    return response
}

export async function validateOtp(payload) {
    const response = await axios(config('v1/eid/identity/tx/validate',{}, payload))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      return error
    });

    return response
}

export async function changePassword(payload) {
    const response = await axios(config('v1/eid/identity/change-password', {}, payload))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      if(error) {
        return {
          actions: ['deleteProxyKeyError']
        }
      }
    });

    return response
}


