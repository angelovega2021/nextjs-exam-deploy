"use client"

import { useState } from "react";
import classNames from "classnames";
import sendMessage from "./endpoint";

export default function Home() {
  
  const [textMessage, setTextMessage] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [delay, setDelay] = useState(0);
  const [timeUnit, setTimeUnit] = useState("seconds");
  const [messageArray, setMessageArray] = useState([]);

  const handleInputChange = (event) => {
    setTextMessage(event.target.value);
  }

  const handleWebhookInputChange = (event) => {
    setWebhookUrl(event.target.value);
  }

  const handleDelayInputChange = (event) => {
    setDelay(event.target.value);
  }

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  }

  const convertToMilliseconds = (delay, timeUnit) => {
    switch (timeUnit) {
      case "seconds":
        return delay * 1000;
      case "minutes":
        return delay * 60 * 1000;
      case "hours":
        return delay * 60 * 60 * 1000;
      default:
        return 0;
    }
  }

  const handleSendMessage = async () => {
    try {
      const delayInMilliseconds = convertToMilliseconds(delay, timeUnit);
      setTimeout(async () => {
        const response = await sendMessage(textMessage, webhookUrl);
        setMessageArray([...messageArray, textMessage]);
        setTextMessage("");
      }, delayInMilliseconds)
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const buttonClass = classNames(
    "bg-blue-600 text-white font-medium py-2 px-4 rounded-lg",
    {
      "hover:bg-blue-700": delay && textMessage && webhookUrl, // Enable hover only if all fields are filled
      "opacity-50 cursor-not-allowed": !textMessage || !webhookUrl, // Disabled styles
    }
  );

  return (
    <div className="flex justify-center">
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-[500px] w-[500px]">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Messaging App</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messageArray.map((message, index) => (
            <div className="flex justify-end" key={index}>
              <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs">
                <p className="text-sm">{message}</p>
              </div>
            </div>
          ))
        }
      </main>
        <div className="p-4 bg-gray-200 dark:bg-gray-800 flex items-center space-x-3">
            <input
            type="text"
            placeholder="input"
            value={delay}
            onChange={handleDelayInputChange}
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={timeUnit}
            onChange={handleTimeUnitChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-gray-800 flex items-center space-x-3">
          <input
          type="text"
          placeholder="Input for Webhook URL"
          value={webhookUrl}
          onChange={handleWebhookInputChange}
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
      <footer className="p-4 bg-gray-200 dark:bg-gray-800 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={textMessage}
          onChange={handleInputChange}
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className={buttonClass}
        onClick={handleSendMessage}
        disabled={!textMessage || !webhookUrl}
        >
          {delay > 0 ? `Send in ${delay} ${timeUnit}` : 'Send'}
        </button>
      </footer>
    </div>
    </div>
  );
}
