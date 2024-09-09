import { message } from "antd";

interface MessageProps {
  key?: string;
  isLoading?: boolean;
  type: "success" | "error" | "warning" | "loading";
  conditionalType?: "success" | "error" | "warning";
  content?: string;
  duration?: number;
  style?: any;
}

export const useMessageHandler = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = ({
    key,
    isLoading,
    type,
    conditionalType,
    content,
    duration,
    style
  }: MessageProps) => {
    if (type === "loading") {
      if (isLoading) {
        messageApi.open({
          key,
          type: "loading",
          content: content || "Loading...",
          duration: 0,
        });
      } else {
        if (conditionalType === "success") {
          messageApi.open({
            key,
            type: "success",
            content: content || "Success!",
            duration: 2,
          });
        } else if (conditionalType === "warning") {
          messageApi.open({
            key,
            type: "warning",
            content: content || "War!",
            duration: 2,
          });
        } else {
          messageApi.open({
            key,
            type: "error",
            content: content || "Error!",
            duration: 2,
          });
        }
      }
    } else {
      messageApi.open({ type, content, duration, style });
    }
  };


  return { showMessage, contextHolder };
};
