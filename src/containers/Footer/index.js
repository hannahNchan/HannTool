import React from "react";
import { Tab} from 'semantic-ui-react';

import OpenAPI from '../OpenAPI';
import RestQuery from "../RestQuery";

import './styles.scss';

const Footer = () => {
  const panes = [
    { menuItem: 'Open API', render: () => <Tab.Pane><OpenAPI /></Tab.Pane> },
    { menuItem: 'REST Query', render: () => <Tab.Pane><RestQuery /></Tab.Pane> },
    { menuItem: 'SQL Query', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]

  return (
    <div className="footer">
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='left'
        panes={panes}
      />
    </div>
  );
};

export default Footer;
