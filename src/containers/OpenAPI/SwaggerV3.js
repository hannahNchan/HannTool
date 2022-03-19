import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from 'semantic-ui-react';

import CodeArea from '../../components/CodeArea';

const SwaggerV3 = ({data, handleChangeParameter, handleClickPreview}) => {
  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="open-api__items">
      <div className="flex-items">
        <span>b-Body parameters:</span>
      </div>
      <div className="flex-items">
        <div className="open-api__methods">
          {((data.parameters.parameters && data.parameters.length !== 0 && data.parameters.parameters.map((parameter, index) => {
            return (
              <div className="open-api__items" key={`key--${index}`}>
                <div className="flex-items spaced">
                  <div className="open-api__items-vertically">
                    <p>{parameter.name}
                      {parameter.required && <span className="open-api__super-script" />}
                    </p>
                    <span><i>{parameter.description}</i></span>
                  </div>
                </div>
                <div className="flex-items">
                  <Input
                    onChange={handleChangeParameter}
                    name={`${parameter.name}-${parameter.in ? parameter.in : ''}-${index}`}
                    className="fullwidth"
                  />
                </div>
              </div>
            )
          })))}
          {(data.parameters.requestBody && <div className="open-api__items">
            <div className="flex-items spaced">
              <div className="open-api__items-vertically">
                <p>{data.operationId}
                  {data.parameters.requestBody.required && <span className="open-api__super-script" />}
                </p>
                <span><i>{data.parameters.requestBody.description}</i></span>
              </div>
            </div>
            <div className="flex-items">
              <CodeArea />
            </div>
          </div>)}
          <div className="open-api__action-items">
            <Button color='green' onClick={handleClickPreview}>Preview</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

SwaggerV3.propTypes = {
  data: PropTypes.object.isRequired,
  handleClickPreview: PropTypes.func,
  handleChangeParameter: PropTypes.func,
};

export default SwaggerV3;

