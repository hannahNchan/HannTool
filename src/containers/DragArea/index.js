/* eslint-disable import/first */
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import DataGridDemo from '../DraggableComponents/Table';
import MultipleSelect from '../DraggableComponents/Select';
import InputWithIcon from '../DraggableComponents/InputText';

import './styles.scss';

const DragFromOutsideLayout = (props) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [compactType, setCompactType] = useState('vertical');
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState({lg: []});
  const [itemAdded, setItemAdded] = useState(false);
  const [typeOfItem, setTypeOfItem] = useState('');

  useEffect(() => {
    setMounted(true);
    //generateLayout();
  }, []);

  useEffect(() => {
    if (itemAdded) {
      const item = document.getElementById(`item-${layouts.lg.length - 1}`);
      const div = document.createElement("div")
      const setId = `${typeOfItem}-item`;
      div.setAttribute('id', setId);
      item.prepend(div);
      const frame = document.getElementById(setId);
      item.classList.remove('box');
      const typeOfNode = dragTypeOfItem();
      ReactDOM.render(typeOfNode, frame);
      setItemAdded(false);
    }
  }, [itemAdded]);

  function dragTypeOfItem() {
    switch (typeOfItem) {
      case 'table':
        return <DataGridDemo />
      case 'selector':
        return <MultipleSelect />
      case 'inputText':
        return <InputWithIcon />
      default:
        return null
    }
  }

  function generateLayout() {
    const lays = _.map(_.range(0, 3), function (item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: Math.round(Math.random() * 5) * 2,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        static: Math.random() < 0.05
      };
    });
    setLayouts({
      ...layouts,
      lg: lays
    });
  }

  function generateDOM() {
    return layouts.lg.map((l, i) => {
      return (
        <div id={`item-${i}`} key={i} className={l.static ? "static static-box" : `${typeOfItem}-item`}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
              <span className="text"></span>
            )}
        </div>
      );
    });
  }

  function onBreakpointChange(breakpoint) {
    setCurrentBreakpoint(breakpoint);
  };

  function onCompactTypeChange() {
    const oldCompactType = compactType;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    setCompactType(compactType);
  };

  function onLayoutChange(layout, layouts) {
    props.onLayoutChange(layout, layouts);
  };

  function onNewLayout() {
    setLayouts({
      ...layouts,
      lg: generateLayout()
    });
  };

  function insertTable(item) {
    setItemAdded(true);
  }

  function onDrop(layout, layoutItem, _event) {
    const newLayout = [...layouts.lg]
    const {x, y, w, h} = layoutItem;
    const newItem = {
      x,
      y,
      w: 8,
      h: 7,
      i: `${layouts.lg.length}`,
      static: false,
      id: 'hello'
    };
    newLayout.push(newItem);
    setLayouts({
      ...layouts,
      lg: newLayout
    });
    insertTable(layouts.lg.length);
  };

  function handleDragStart(data, name) {
    setTypeOfItem(name);
  }

  return (
    <div>
      <div>
        Current Breakpoint: {currentBreakpoint} (
        {props.cols[currentBreakpoint]} columns)
      </div>
      <div>
        Compaction type:{" "}
        {_.capitalize(compactType) || "No Compaction"}
      </div>
      <button onClick={() => onNewLayout()}>Generate New Layout</button>
      <button onClick={() => onCompactTypeChange()}>
        Change Compaction Type
      </button>
      <div className="items-container">
        <div
          className="droppable-element table-icon"
          draggable
          unselectable="on"
          onDragStart={e => handleDragStart(e.dataTransfer.setData("text/plain", ""), 'table')}
        >
        </div>
        <div
          className="droppable-element selector"
          draggable
          unselectable="on"
          onDragStart={e => handleDragStart(e.dataTransfer.setData("text/plain", ""), 'selector')}
        >
        </div>
        <div
          className="droppable-element input-text"
          draggable
          unselectable="on"
          onDragStart={e => handleDragStart(e.dataTransfer.setData("text/plain", ""), 'inputText')}

        >
        </div>
      </div>
      <ResponsiveReactGridLayout
        {...props}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
}

DragFromOutsideLayout.defaultProps = {
  className: "layout drag-area",
  rowHeight: 50,
  onLayoutChange: function () {},
  cols: {lg: 48, md: 10, sm: 6, xs: 4, xxs: 2},
};

export default DragFromOutsideLayout;

