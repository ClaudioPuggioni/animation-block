import React, { useRef, useState } from "react";

export default function UserInterface() {
  let scrollBarRef = useRef(null);
  const [xBox, setXBox] = useState(0);
  const [yBox, setYBox] = useState(0);
  const [rotateBox, setRotateBox] = useState(0);
  const [xDot, setXDot] = useState(0);
  const [yDot, setYDot] = useState(0);
  const [rotateDot, setRotateDot] = useState(0);

  function handleDrag(e, type) {
    let barStats = scrollBarRef.current.getBoundingClientRect();
    e.preventDefault();
    let xPos = e.clientX - barStats.left > 240 ? 240 : e.clientX - barStats.left <= 0 ? 0 : e.clientX - barStats.left;
    if (e.clientX && e.clientY) {
      if (type === "typeX") {
        setXBox(xPos * 1.667);
        setXDot(xPos);
      } else if (type === "typeY") {
        let yPos =
          (e.clientX - barStats.left) * 1.68 > 400.08 ? 400.08 : (e.clientX - barStats.left) * 1.68 <= 0 ? 0 : (e.clientX - barStats.left) * 1.68;
        setYBox(yPos);
        setYDot(xPos);
      } else if (type === "typeRotate") {
        setRotateBox(xPos * 1.5);
        setRotateDot(xPos);
      }
    }
  }

  return (
    <div id="container">
      <div id="appContainer">
        <div id="boxContainer">
          <div id="box" style={{ top: `${yBox}px`, left: `${xBox}px`, transform: `rotate(${rotateBox}deg)` }}>
            {/* ⚫ */}
          </div>
        </div>
        <div id="controls">
          <div id="xDiv">
            <div className="stats">X {Math.round(xBox)}</div>
            <div ref={scrollBarRef} id="scrollBarX">
              <div id="scrollFillX"></div>
              <div id="scrollDotX" draggable="true" onDrag={(e) => handleDrag(e, "typeX")} style={{ left: `${xDot}px` }}></div>
            </div>
          </div>
          <div id="yDiv">
            <div className="stats">Y {Math.round(yBox)}</div>
            <div id="scrollBarY">
              <div id="scrollFillY"></div>
              <div id="scrollDotY" draggable="true" onDrag={(e) => handleDrag(e, "typeY")} style={{ left: `${yDot}px` }}></div>
            </div>
          </div>
          <div id="rotateDiv">
            <div className="stats">Rotate {Math.round(rotateBox)}</div>
            <div id="scrollBarRotate">
              <div id="scrollFillRotate"></div>
              <div id="scrollDotRotate" draggable="true" onDrag={(e) => handleDrag(e, "typeRotate")} style={{ left: `${rotateDot}px` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
