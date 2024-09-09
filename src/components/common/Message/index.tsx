import React, { useEffect } from "react";
import { Button, message, Space } from "antd";

interface MessageHandlerProps {
  type: "success" | "error" | "warning";
  content: string;
  key: string;
}

const Message = ({ type, content, key }: MessageHandlerProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.open({ type, content, key });
    return () => messageApi.destroy(key);
  }, [key, type, content]);

  return <>{contextHolder}</>;
};

export default Message;
