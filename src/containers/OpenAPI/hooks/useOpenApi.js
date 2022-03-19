import React, {useState, useEffect} from 'react';
import {Label} from 'semantic-ui-react';
import queryString from 'query-string';

import {apiGet} from '../../../api';
import {parsePaths} from '../../../utils';

const useOpenApi = () => {
  const [urlSwagger, setUrlSwagger] = useState('');
  const [displayArray, setDisplayArray] = useState([]);
  const [version, setVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [urlMethodSelected, setUrlMethodSelected] = useState({});
  const [schema, setSchema] = useState('');
  const [server, setServer] = useState('');
  const [formedRequest, setFormedRequest] = useState({
    url: '',
    parameters: []
  });

  const onHandleClick = async () => {
    setIsLoading(true);
    const response = await apiGet(urlSwagger);
    setVersion(response.openapi);
    setServer(response.servers[0].url);
    const getOnlyPaths = response.paths;
    const pathsArray = parsePaths(getOnlyPaths);
    const parseToParray = setOptionsPaths(pathsArray);
    setDisplayArray(parseToParray);
  }

  const onHandleChangeText = (event) => {
    setUrlSwagger(event.target.value);
  }

  const setOptionsPaths = (paths) => {
    let finalArray = [];
    paths.map((item, index) => {
      finalArray.push({
        key: `item-${index}`,
        text: item.path,
        value: {
          path: item.path,
          method: item.method,
          parameters: item.values
        },
        image: <LabelByMethod method={item.method}>{item.method}</LabelByMethod>,
      });
    });
    setIsLoading(false);
    return finalArray;
  }

  const LabelByMethod = ({method, children}) => {
    const methods = {
      post: 'orange',
      get: 'green',
      put: 'blue',
      delete: 'red',
      patch: 'olive'
    };

    return (
      <Label color={methods[method]} horizontal>
        <strong className="footer__capitalize-uppercase">
          {children}
        </strong>
      </Label>)
  }

  function handleChangeDropDown(_, data) {
    setFormedRequest({
      ...formedRequest,
      url: '',
      parameters: []
    });
    const params = [];
    if (data.value.parameters.parameters) {
      data.value.parameters.parameters.map(i => {
        params.push({
          name: i.name,
          type: i.in,
          value: ''
        });
      });
    }
    setFormedRequest({...formedRequest, parameters: params});
    setUrlMethodSelected(data.value);
  }

  function onHandleChangeParameter(event) {
    const clonedArray = [...formedRequest.parameters];

    const name = event.target.name.split('-')[0];
    const type = event.target.name.split('-')[1];
    const value = event.target.value;

    clonedArray.map(item => {
      if (item.name === name) {
        item.value = value;
      }
    });

    setFormedRequest({
      ...formedRequest,
      parameters: [...clonedArray]
    });
  }

  function onHandleClickPreview() {
    const formedUrl = [];
    formedUrl.push(schema.toLowerCase() + '://');
    formedUrl.push('petstore3.swagger.io' + server);
    const ifQueryStrings = {};
    formedRequest.parameters.map(item => {
      if (item.type === 'query') {
        ifQueryStrings[item.name] = item.value;
      }
    });
    const toPath = formedRequest.parameters.find(i => i.type === 'path');
    formedUrl.push('/' + toPath.value);
    if (Object.values(ifQueryStrings).length !==0) {
      const qs = queryString.stringify(ifQueryStrings);
      formedUrl.push('?' + qs)
    }
  }
  
  function handleChangeSchema(event) {
    setSchema(event.target.innerText);
  }

  return {
    version,
    displayArray,
    isLoading,
    onHandleClick,
    handleChangeSchema,
    onHandleChangeText,
    handleChangeDropDown,
    urlMethodSelected,
    onHandleClickPreview,
    onHandleChangeParameter,
  }

}

export default useOpenApi;
