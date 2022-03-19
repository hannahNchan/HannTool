import React from 'react';

import Footer from "./containers/Footer";

import HeaderMenu from './containers/HeaderMenu';
import DragArea from './containers/DragArea';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./styles.scss";
import 'semantic-ui-css/semantic.min.css'

export default function App() {

  return (
    <div className="app">
     {/* <HeaderMenu />
      <DragArea />
      <div className="app__drag-items" />*/}
      <Footer />
    </div>
  );
}
