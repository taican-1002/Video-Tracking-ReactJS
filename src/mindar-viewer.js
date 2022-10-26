import React, { useEffect, useRef } from "react";

const MindARViewer = (props) => {
  const sceneRef = useRef(null);
  const { items, pathVideoCompiler } = props;

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);

  return (
    <a-scene
      stats
      ref={sceneRef}
      mindar-image={`imageTargetSrc:${
        process.env.REACT_APP_UPLOAD + pathVideoCompiler
      };autoStart: false; maxTrack: ${items.length}`}
      // mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/taican-1002/3D-Image-Tracking@master/goku.mind;autoStart: false"
      color-space="sRGB"
      // embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        {items &&
          items.map((item, index) => (
            <video
              key={index}
              id={item.id}
              type="video/mp4"
              autoPlay
              loop={true}
              src={
                process.env.REACT_APP_UPLOAD +
                item.video.path.slice(12, item.video.path.length)
              }
              playsInline
            ></video>
          ))}
      </a-assets>
      {items &&
        items.map((item, index) => (
          <a-entity
            key={index}
            mindar-image-target={`targetIndex: ${index}`}
            look-controls="enabled: false"
          >
            <a-plane
              src={`#${item.id}`}
              position="0.3 0.2 0"
              height="0.6"
              width="1.2"
              rotation="0 0 0"
            ></a-plane>
          </a-entity>
        ))}

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    </a-scene>
  );
};

export default MindARViewer;
