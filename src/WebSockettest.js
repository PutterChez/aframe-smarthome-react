import React, { useState, useRef, useEffect } from "react";

function AppTest() {
  const ws = useRef(null);

  // using this to set tag value
  const setTagValue = (value) => {
    // console.log({ value });
    let queue_data = queueData;
    queue_data.push(value);
    setQueueData(queue_data);
    setIsSendingData(true);
  };

  const [queueData, setQueueData] = useState([]);
  const [isSendingData, setIsSendingData] = useState(false);

  const [readyState, setReadyState] = useState(false);
  const [tagListStatus, setTagListStatus] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(
      "ws://e42f17cfdc86.ngrok.io/ws/chat/Test1/",
    );

    ws.current.onopen = () => {
      console.log("ws opened");
      setReadyState(true);
    };
    ws.current.onclose = () => {
      console.log("ws closed");
      setReadyState(false);
    };

    return () => {
      console.log("ws.current.close");
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    const send = () => {
      console.log("ws.current", ws.current);
      console.log({ isSendingData });
      console.log({ queueData });
      queueData.forEach((data) => {
        if (data) {
          let dataWithMessage = {
            message: JSON.stringify(data),
          };
          ws.current.send(JSON.stringify(dataWithMessage));
          // setTagValue(null);
        }
      });
      setQueueData([]);
      setIsSendingData(false);
    };

    if (isSendingData && readyState) {
      if (
        ws &&
        ws.current &&
        ws.current.readyState === 1 &&
        queueData &&
        queueData.length
      ) 
      {
        console.log("send data", queueData);
        send();
      }
    }

    // onmessage
    ws.current.onmessage = (e) => {
      // Tag : ict.HueLight02.onoff
      // "{"type": "notify_tag", "tag": "passion.Air_Main_Bed_Room.current_temp", "value": "30.0"}"
      const data = JSON.parse(e.data);
      const message = JSON.parse(data["message"]);
      const tag = message.tag;
      const value = message.value;
      
      console.log(tag, value);
      if (tagListStatus.some((item) => item.key === tag)) {
        const updateValue = tagListStatus.map((item) => {
          if (item.key === tag) {
            return { ...item, key: tag, value: value };
          }
          return item;
        });

        setTagListStatus(updateValue);
      } else {
        setTagListStatus([...tagListStatus, { key: tag, value: value }]);
      }
      
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSendingData, readyState]);

  function listenLight02() {
    setQueueData([{
      "type":"add_tag",
      "tag":"ict.HueLight02.onoff"
    }])
    setIsSendingData(true);
  }

  function Light02on() {
    setQueueData([{
      "type":"set_tag",
      "tag":"ict.HueLight02.onoff",
      "value":1
    }])
    setIsSendingData(true)
  }

  function Light02off() {
    setQueueData([{
      "type":"set_tag",
      "tag":"ict.HueLight02.onoff",
      "value":0
    }])
    setIsSendingData(true)
  }
  
  return (
    <div>
      {readyState ? <p>Connected</p> : <p>connecting</p>}
    </div>
  );
};

export default AppTest
