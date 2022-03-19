import React, {useState, useEffect} from 'react';

import './styles.scss';

const CanvasVersion = ({width = 500, height = 500, totalGrids}) => {
  const [state, setState] = useState({
    widthCanvas: width,
    heightCanvas: height,
    totalGrids
  });

  function setAttributes() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    //horizontal
    for (let i = 0; i < state.totalGrids + 1; i++) {
      ctx.moveTo(0, i * (state.heightCanvas / totalGrids));
      ctx.lineTo(state.widthCanvas, i * (state.heightCanvas / totalGrids));
    }
    //vertical
    for (let i = 1; i < totalGrids + 1; i++) {
      ctx.moveTo(i * (state.widthCanvas / totalGrids), 0);
      ctx.lineTo(i * (state.widthCanvas / totalGrids), state.heightCanvas);
    }
    ctx.stroke();
  }

  useEffect(() => {
    setAttributes();
    setState({
      ...state,
      widthCanvas: width,
      heightCanvas: height,
      totalGrids
    });
  }, [width, height, totalGrids]);

  return (
    <canvas id="myCanvas" width={width} height={height}
      style={{border: '1px solid #d3d3d3'}}>
      Your browser does not support the canvas element.
    </canvas>
  )
}

export default CanvasVersion;

