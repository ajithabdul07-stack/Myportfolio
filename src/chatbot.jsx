import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Info } from 'lucide-react';

export default function ChatbotWebsite() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! Welcome to TechChat. How can I assist you today?', sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = {
    greetings: [
      'Hi there! How can I help you?',
      'Hello! Welcome back! What do you need today?',
      'Hey! Good to see you. What can I do for you?'
    ],
    product: [
      'We have a wide range of tech products available. Would you like to know about specific categories?',
      'Our products include electronics, accessories, and office equipment. What interests you?',
      'What type of product are you looking for? We have great deals on everything!'
    ],
    pricing: [
      'Our prices are very competitive. Most products range from $12 to $80. Any specific item you want to know about?',
      'We offer quality products at affordable prices. Discounts available for bulk orders!',
      'All our prices include tax. We also offer free shipping on orders over $50!'
    ],
    shipping: [
      'We offer free shipping on orders over $50! Standard delivery takes 3-5 business days.',
      'Orders are typically delivered within 5-7 business days. Express shipping available!',
      'We ship worldwide! Tracking information will be sent to your email.'
    ],
    support: [
      'Our support team is available 24/7. What issue are you facing?',
      'Happy to help! Please describe what you need assistance with.',
      'We\'re here to help! What can I assist you with today?'
    ],
    default: [
      'That\'s interesting! Could you tell me more about what you need?',
      'I understand. How else can I assist you?',
      'Thanks for that! Is there anything else I can help with?'
    ]
  };

  const getRandomResponse = (category) => {
    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.match(/hello|hi|hey|greetings|good morning|good afternoon/)) {
      return getRandomResponse('greetings');
    } else if (lowerMessage.match(/product|what do you sell|items|catalog|collection/)) {
      return getRandomResponse('product');
    } else if (lowerMessage.match(/price|cost|how much|expensive|cheap|discount|sale/)) {
      return getRandomResponse('pricing');
    } else if (lowerMessage.match(/ship|delivery|mail|transport|logistics|delivery time/)) {
      return getRandomResponse('shipping');
    } else if (lowerMessage.match(/help|support|issue|problem|assistance|contact/)) {
      return getRandomResponse('support');
    } else if (lowerMessage.match(/thanks|thank you|appreciate|grateful/)) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerMessage.match(/bye|goodbye|see you|farewell|exit/)) {
      return "Goodbye! Thank you for visiting TechChat. See you soon! 👋";
    } else {
      return getRandomResponse('default');
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  
      <nav className="bg-slate-900 border-b border-amber-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="text-slate-900" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-amber-400">LLM Chatbot</h1>
          </div>
          <button
            onClick={() => setShowAbout(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition"
          >
            <Info size={18} />
            <span className="hidden sm:inline">About</span>
          </button>
        </div>
      </nav>

  
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-8 border border-amber-500/20">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">About LLM Chatbot</h2>
            
            <div className="space-y-5 text-slate-300">
              <div>
                <h3 className="font-semibold text-lg text-amber-400 mb-2">Project Description</h3>
                <p className="text-sm leading-relaxed">An AI-powered chatbot website for customer support and product inquiries. Modern classical design with elegant dark theme and gold accents.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-amber-400 mb-2">Technologies Used</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>React:</strong> UI framework</li>
                  <li><strong>Hooks (useState, useRef, useEffect):</strong> State & side effects</li>
                  <li><strong>Tailwind CSS:</strong> Modern styling</li>
                  <li><strong>Lucide React:</strong> Beautiful icons</li>
                  <li><strong>gemini 2.5 flash(LLM):</strong> For AI Powered Chat</li>
                  <li><strong>Fast API:</strong> For Backend</li>
                  <li><strong>Mongodb:</strong> For Database</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-amber-400 mb-2">Features</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Real-time chat messaging</li>
                  <li>Intelligent bot responses</li>
                  <li>Auto-scroll to latest messages</li>
                  <li>Timestamp for each message</li>
                  <li>Smooth animations</li>
                  <li>Responsive design</li>
                  <li>Modern classical aesthetic</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-8 w-full bg-amber-500 hover:bg-amber-600 text-slate-900 py-2 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

 
      <div className="max-w-4xl mx-auto px-4 py-12">
     
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Welcome to LLM Chatbot</h2>
          <p className="text-xl text-slate-400 mb-8">Chat with our intelligent bot for instant support and product information</p>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            <MessageCircle size={24} />
            {showChat ? 'Close Chat' : 'Start Chat'}
          </button>
        </div>


        {showChat && (
          <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-slate-800 rounded-xl shadow-2xl border border-amber-500/20 flex flex-col z-40 animate-fadeIn">
         
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/20 p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-slate-900" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white">TechChat Assistant</h3>
                  <p className="text-xs text-amber-400">Always online</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-slate-400 hover:text-amber-400 transition"
              >
                <X size={20} />
              </button>
            </div>

         
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-slate-900 rounded-br-none'
                      : 'bg-slate-700 text-slate-100 rounded-bl-none border border-amber-500/20'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user' ? 'text-slate-800' : 'text-amber-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

         
            <div className="border-t border-amber-500/20 p-4 bg-slate-800 rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg border border-amber-500/20 focus:outline-none focus:border-amber-500 placeholder-slate-500 transition"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg flex items-center justify-center transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-slate-800 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-amber-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
            <p className="text-slate-400 text-sm">Get instant answers to your questions anytime, anywhere</p>
          </div>

          <div className="bg-slate-800 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-amber-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Responses</h3>
            <p className="text-slate-400 text-sm">Intelligent AI that understands your needs and provides relevant help</p>
          </div>

          <div className="bg-slate-800 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-amber-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Product Info</h3>
            <p className="text-slate-400 text-sm">Ask about our products, pricing, shipping, and more</p>
          </div>
        </div>
      </div>
    </div>
  );
}