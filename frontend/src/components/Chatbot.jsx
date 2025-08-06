import React, { useState, useRef, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { chatbotResponses } from '../mock';
import GradientText from '@/ui/TextAnimations/GradientText/GradientText';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm Shreeya's AI assistant. Ask me anything about her skills, projects, or experience!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific keywords
    if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
      return chatbotResponses["who are you"];
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return chatbotResponses["what skills"];
    } else if (lowerMessage.includes('project')) {
      return chatbotResponses["projects"];
    } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university')) {
      return chatbotResponses["education"];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return chatbotResponses["contact"];
    } else if (lowerMessage.includes("backend") || lowerMessage.includes("admin")) {
      navigate("/admin/login");
    }
     else {
      return chatbotResponses["default"];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: findResponse(inputMessage)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <Card className="bg-slate-800/95 backdrop-blur-lg border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-white font-['Orbitron']">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <GradientText colors={["#40ffaa", "#4079ff", "#22d3ee", "#4079ff", "#22d3ee"]} className="text-lg font-semibold font-['Orbitron']" animationSpeed={5}>Shreeya's AI Assistant</GradientText>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages Container */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-lg font-['Poppins'] text-sm leading-relaxed ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-slate-700/50 text-slate-200 border border-slate-600/50'
                      }`}
                    >
                      {msg.message}
                    </div>

                    {msg.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Shreeya's skills, projects..."
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 font-['Poppins']"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Skills', 'Projects', 'Education', 'Contact'].map((topic) => (
                    <Button
                      key={topic}
                      size="sm"
                      variant="ghost"
                      onClick={() => setInputMessage(topic.toLowerCase())}
                      className="text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 font-['Poppins']"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;