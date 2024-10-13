import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Upload, MessageSquare, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import "../app/globals.css";
import { useRouter } from "next/router";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRefs = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        console.log("Sending request to API route");
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_value: input,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "ChatInput-egUW4": {},
              "ParseData-61Z3Y": {},
              "Prompt-GhTMA": {},
              "ChatOutput-DNe4M": {},
              "SplitText-MNgAf": {},
              "File-qtPpY": {},
              "NVIDIAEmbeddingsComponent-l19Tt": {},
              "Chroma-7xl8M": {},
              "Chroma-lQE7u": {},
              "GoogleGenerativeAIModel-cc2LS": {},
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received response:", data);

        if (
          data.outputs &&
          data.outputs[0].outputs &&
          data.outputs[0].outputs[0].results
        ) {
          const aiMessage = data.outputs[0].outputs[0].results.message;
          if (aiMessage && aiMessage.text) {
            const aiResponse = aiMessage.text.split("AI:").pop().trim();
            const formattedResponse = aiResponse
              .replace(/\*\*(.*?)\*\*/g, "**$1**")
              .replace(/^([^*\n]+):/gm, "**$1:**")
              .replace(/^\s*\*\s/gm, "\n* ")
              .trim();

            setMessages([
              ...newMessages,
              { role: "bot", content: formattedResponse },
            ]);
          } else {
            throw new Error("No message text in response");
          }
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages([
          ...newMessages,
          {
            role: "bot",
            content: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileUpload = (topic: string, index: number) => {
    fileInputRefs.current[index].click();
  };

  const handleFileChange = (
    topic: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`File "${file.name}" uploaded for ${topic}`);
    }
  };

  const toggleTopic = (topicIndex) => {
    setExpandedTopic(expandedTopic === topicIndex ? null : topicIndex);
  };

  const topics = [
    "Container Terminal Operations",
    "Maritime Safety and Security",
    "Port Digitalization and Automation",
    "Supply Chain Management",
    "Environmental Sustainability in Ports",
    "Customs and Regulatory Compliance",
    "Port Infrastructure Development",
    "Logistics and Freight Forwarding",
    "Emergency Response and Crisis Management",
    "Port Workforce Training and Development",
    "International Trade and Shipping Trends",
  ];

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    handleSend();
  };

  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <div className="w-64 border-r border-purple-900/30">
        <ScrollArea className="h-full">
          <div className="p-4 flex flex-col h-full justify-between">
            <button className="p-[3px] relative mb-5" onClick={handleGoHome}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Back to home!
              </div>
            </button>
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Topics
            </h2>
            {topics.map((topic, index) => (
              <Collapsible
                key={index}
                open={expandedTopic === index}
                onOpenChange={() => toggleTopic(index)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-purple-900/30 rounded-lg transition-colors duration-200">
                  <span className="text-left px-4 py-2 rounded">{topic}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-blue-400 transition-transform duration-200 ${
                      expandedTopic === index ? "transform rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2">
                  <Button
                    onClick={() => handleFileUpload(topic, index)}
                    variant="outline"
                    className="w-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-400 text-purple-400 hover:bg-black hover:text-purple-300 transition-all duration-200"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Files
                  </Button>
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    className="hidden"
                    onChange={(e) => handleFileChange(topic, e)}
                  />
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-purple-900/30 p-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            AI-Powered Chatbot
          </h1>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30 text-blue-200"
                    : "bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-purple-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-purple-200 p-2 rounded-lg flex items-center">
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <div className="border-t border-purple-900/30 p-4">
          <div className="flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything!"
              className={`flex-1 mr-2 bg-purple-900/30 text-blue-200 border-purple-400 placeholder-blue-400 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              className={`bg-gradient-to-r from-purple-400 to-blue-500 text-white transition-colors duration-200 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-500 hover:to-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <MessageSquare className="mr-2 h-4 w-4" />
              )}
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
