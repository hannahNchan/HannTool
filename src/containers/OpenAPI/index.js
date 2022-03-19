import React from "react";
import { Button, Input, Label, Dropdown, Select } from 'semantic-ui-react';

import { SCHEMAS } from '../../constants/index';
import SwaggerV2 from '../OpenAPI/SwaggerV2';
import SwaggerV3 from '../OpenAPI/SwaggerV3';
import useOpenApi from '../OpenAPI/hooks/useOpenApi';

import SWAGGER_LOGO from '../../assets/swagger.svg';
import './styles.scss';

const OpenAPI = () => {
  const {
    displayArray,
    isLoading,
    version,
    onHandleClick,
    onHandleChangeText,
    urlMethodSelected,
    handleChangeDropDown,
    onHandleChangeParameter,
    onHandleClickPreview,
    handleChangeSchema,
  } = useOpenApi();
  return (
    <div className="open-api">
      <div className="open-api__items">
        <div className="flex-items">
          <span>Swagger Url</span>
        </div>
        <div className="flex-items">
          <Input focus onChange={onHandleChangeText} loading={isLoading} type='text' placeholder='Put url swagger...' action>
            <input className="open-api__items__input-swagger" />
            {(version && <Label as='div' color='teal' className="open-api__banner">
              <img src={SWAGGER_LOGO} alt="swagger" />
              <span>openAPI</span>
              <Label.Detail>{`V - ${version}`}</Label.Detail>
            </Label>)}
            <Button primary disable={isLoading} onClick={onHandleClick}>Search</Button>
          </Input>
        </div>
      </div>
      <div className="open-api__items">
        <div className="flex-items">
          <span>Select Schema type</span>
        </div>
        <div className="flex-items">
          <Select placeholder='Select Schema' options={SCHEMAS} onChange={handleChangeSchema} />
        </div>
      </div>
      <div>
        {(displayArray && displayArray.length !== 0 &&
          <div className="open-api__items">
            <div className="flex-items">
              <span>Swagger Paths</span>
            </div>
            <div className="flex-items">
              <Dropdown
                onChange={handleChangeDropDown}
                placeholder="Choose a method..."
                className="open-api__dropdown"
                options={displayArray}
                fluid
                clearable
                search
                selection
              />
            </div>
          </div>
        )}
      </div>
      {version && (version.split('.')[0] === '2' &&
        <SwaggerV2 data={urlMethodSelected} />
      ) || (
          <SwaggerV3
            data={urlMethodSelected}
            handleChangeParameter={onHandleChangeParameter}
            handleClickPreview={onHandleClickPreview}
          />
        )}
    </div>
  )
}

export default OpenAPI