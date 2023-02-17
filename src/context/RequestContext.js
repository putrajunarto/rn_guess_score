import React, { createContext, useContext, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const RequestContext = createContext({});



export const RequestProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [lastRequest, setLastRequest] = React.useState({});
  const [lastRequestType, setLastRequestType] = React.useState('');
  const [errCount, setErrCount] = React.useState(0);
  const authState = useSelector((state) => state.auth);
  const instance = axios.create({
    baseURL: 'https://kuis.bolamilenia.com/',
    // baseURL: 'http://10.0.2.2/guess_score/public',
    timeout: 5000,
    responseType: 'json',
  });

  const get = (url, config, cb) => {
    setLastRequest({ url, config, cb });
    setLastRequestType('get');
    instance.get(url, config).then(response => {
      if (cb !== null) {
        cb(response);
      }
    })
      .catch(error => {
        console.log(error);
      });
  };
  const getWithToken = (url, config, cb) => {
    setLastRequest(url, config, cb);
    setLastRequestType('getWithToken');
    instance.get(url, {
      ...config,
      headers: {
        'Authorization': `Bearer ${authState._token}`,
      },
    }).then(response => {
      if (cb !== null) {
        cb(response);
      }
    })
      .catch(error => {
        console.log(error);
        if (error.response?.status == 401) {
          if (errCount < 3) {
            // renewToken();
          }
        }
      });
  };

  const post = (url, data, config, cb, errCb) => {
    setLastRequest({ url, data, config, cb });
    instance.post(url, data, config).then(response => {
      if (cb !== null) {
        cb(response);
      }
    })
      .catch(error => {
        cb(error.response);
      });
  };

  const postWithToken = (url, data, config, cb, errCb) => {
    setLastRequest({ url, data, config, cb, errCb });
    setLastRequestType('postWithToken');
    instance.post(url, data, {
      headers: {
        'Authorization': `Bearer ${authState._token}`,
      },
      ...config
    }).then(response => {
      if (cb !== null || cb !== undefined) {
        cb(response);
      }
    })
      .catch(error => {
        cb(error.response)
        // if (error.response.status == 401) {
        //   renewToken();
        // }
        // if (typeof(errCb) !== "undefined" || errCb !== null) {
        //   cb(error.response);
        // }
      });
  };

  // const renewToken = async () => {
  //   const idTokenResult = await auth().currentUser.getIdToken(true);
  //   console.log("New Token result");
  //   console.log(idTokenResult);
  //   dispatch({
  //     type: AuthAction.SAVE_USER_TOKEN,
  //     payload: {
  //       token: idTokenResult
  //     }
  //   });
  //   setTimeout(() => {
  //     executeLastRequest();
  //   },500);
  // }

  const executeLastRequest = () => {
    setErrCount(errCount + 1);
    console.log(errCount);
    switch (lastRequestType) {
      case 'get': get(lastRequest); break;
      case 'getWithToken': getWithToken(lastRequest); break;
      case 'post': post(lastRequest); break;
      case 'postWithToken': postWithToken(lastRequest); break;
    }
  }

  return (
    <>
      <RequestContext.Provider value={{
        instance: instance,
        get: get,
        getWithToken: getWithToken,
        post: post,
        postWithToken: postWithToken
      }}>
        {children}
      </RequestContext.Provider>
    </>
  )
}

export default function useRequest() {
  const context = useContext(RequestContext);
  return context;
}