import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'semantic-ui-react';

import CodeArea from '../../components/CodeArea';

const SwaggerV2 = ({data}) => {
  if (Object.keys(data).length === 0) {
    return null;
  }
  return (
    <div className="open-api__items">
      <div className="flex-items">
        <span>a-Body parameters:</span>
      </div>
      <div className="flex-items">
        <div className="open-api__methods">
          {data.parameters && data.parameters.parameters.map((parameter, idx) => {
            return (
              <div className="open-api__items" key={`key--${idx}`}>
                <div className="flex-items spaced">
                  <div className="open-api__items-vertically">
                    <p>{parameter.name}
                      {parameter.required && <span className="open-api__super-script" />}
                    </p>
                    <span><i>{parameter.description}</i></span>
                  </div>
                </div>
                <div className="flex-items">
                  {(parameter.in === 'body' &&
                    <CodeArea />
                  ) || (
                      <Input className="fullwidth" placeholder='Search...' />
                    )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

SwaggerV2.propTypes = {
  data: PropTypes.array.isRequired
};

export default SwaggerV2;

