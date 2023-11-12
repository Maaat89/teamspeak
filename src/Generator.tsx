import React, { ChangeEvent, useRef, useState } from "react";
import "@styles/Generator.scss";
import Viewer from "./Viewer";

export default function Generator() {
  const [outputUrl, setOutputUrl] = useState(new URL(window.location.href).toString());
  const copiedTooltipRef = useRef<HTMLDivElement>(null);

  const [remoteAppPort, setRemoteAppPort] = useState(5899);
  const [showChannelName, setShowChannelName] = useState(true);
  const [hideNonTalking, setHideNonTalking] = useState(false);
  const [clientLimit, setClientLimit] = useState(0);

  React.useEffect(() => {
    generateUrl();
  }, [remoteAppPort, showChannelName, hideNonTalking, clientLimit]);

  function generateUrl() {
    const url = new URL(window.location.href.replace("/generate", ""));
    url.searchParams.set("remoteAppPort", remoteAppPort.toString());
    url.searchParams.set("showChannelName", showChannelName.toString());
    url.searchParams.set("hideNonTalking", hideNonTalking.toString());
    url.searchParams.set("clientLimit", clientLimit.toString());

    setOutputUrl(url.toString());
  }

  function copy() {
    navigator.clipboard.writeText(outputUrl);

    if (copiedTooltipRef.current) {
      copiedTooltipRef.current.style.animation = "tooltipAnimation 200ms";
      copiedTooltipRef.current.style.opacity = "1";

      setTimeout(() => {
        if (copiedTooltipRef.current) {
          copiedTooltipRef.current.style.opacity = "0";
          copiedTooltipRef.current.style.animation = "";
        }
      }, 1000);
    }
  }

  return (
    <div className="generator">
      <div className="headline">
        <h1>TS5-OBS-Overlay Generator</h1>
        <h4>by DerTyp7</h4>
      </div>
      <div className="output">
        <p className="url">
          <code>{outputUrl}</code>
        </p>
        <button onClick={copy} className="copy">
          Copy
        </button>
        <div ref={copiedTooltipRef} className="copiedTooltip">
          Copied!
        </div>
      </div>
      <div className="generatorContent">
        <div className="configurations">
          <h2>Configurations</h2>

          <div className="option">
            <input
              type="checkbox"
              checked={showChannelName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setShowChannelName(e.target.checked);
              }}
            />
            <label>Show channelname</label>
          </div>

          <div className="option">
            <input
              type="checkbox"
              checked={hideNonTalking}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setHideNonTalking(e.target.checked);
              }}
            />
            <label>Hide non talking clients</label>
          </div>

          <div className="option">
            <input
              type="number"
              value={20}
              min={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setClientLimit(parseInt(e.target.value));
              }}
            />
            <label>Client Limit</label>
          </div>

          <div className="option">
            <input
              type="number"
              value={5899}
              min={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setRemoteAppPort(parseInt(e.target.value));
              }}
            />
            <label>RemoteApp-Port</label>
          </div>
        </div>

        <div className="preview">
          <Viewer remoteAppPort={remoteAppPort} showChannelName={showChannelName} hideNonTalking={hideNonTalking} clientLimit={clientLimit} />
        </div>
      </div>
    </div>
  );
}
