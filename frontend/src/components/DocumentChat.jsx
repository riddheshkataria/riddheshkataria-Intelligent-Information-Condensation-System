import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithDocument } from '../services/api';
import './DocumentChat.css';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
);

const DocumentChat = ({ documentId, initialChatHistory }) => {
    const [messages, setMessages] = useState(() => {
        const defaultGreeting = { role: 'model', text: 'Hi! Ask me anything about this document.' };
        if (initialChatHistory && initialChatHistory.length > 0) {
            return [defaultGreeting, ...initialChatHistory];
        }
        return [defaultGreeting];
    });
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        
        // Add user message to UI
        const newMessages = [...messages, { role: 'user', text: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the initial greeting)
            const apiHistory = newMessages.slice(1, -1).map(msg => ({
                role: msg.role,
                text: msg.text
            }));

            const response = await chatWithDocument(documentId, apiHistory, userMessage);
            
            setMessages(prev => [...prev, { role: 'model', text: response.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { 
                role: 'error', 
                text: 'Sorry, I encountered an error while processing your request.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="document-chat-container">
            <div className="document-chat-header">
                <SparklesIcon />
                <h3>Chat with PDF</h3>
            </div>
            
            <div className="document-chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.role}`}>
                        {msg.role === 'model' ? (
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                            <p>{msg.text}</p>
                        )}
                    </div>
                ))}
                
                {isLoading && (
                    <div className="chat-message model">
                        <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="document-chat-input-area">
                <form className="document-chat-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={!inputValue.trim() || isLoading}>
                        <span>Send</span>
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DocumentChat;
