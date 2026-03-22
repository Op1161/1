/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Heart, 
  MessageCircle, 
  X, 
  ArrowRight,
  Info,
  Camera,
  Trees
} from 'lucide-react';
import { askAboutLeopardCat } from './services/geminiService';

const SECTIONS = [
  { id: 'hero', label: '首頁' },
  { id: 'about', label: '認識石虎' },
  { id: 'habitat', label: '棲地分佈' },
  { id: 'threats', label: '生存威脅' },
  { id: 'action', label: '守護行動' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await askAboutLeopardCat(userMsg);
    setChatHistory(prev => [...prev, { role: 'ai', text: aiResponse || '抱歉，我無法回答這個問題。' }]);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen selection:bg-habitat-olive selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass-panel flex items-center gap-8">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(s.id);
            }}
            className={`text-sm font-medium transition-colors ${
              activeSection === s.id ? 'text-habitat-olive' : 'text-habitat-earth/60 hover:text-habitat-earth'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-habitat-earth">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/leopardcat-habitat/1920/1080?blur=2" 
            alt="Taiwan Forest" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-white/60 uppercase tracking-[0.3em] text-xs mb-4 block">Taiwan Leopard Cat</span>
            <h1 className="text-7xl md:text-9xl text-white font-serif mb-6 leading-tight">
              山林裡的<br />
              <span className="italic">小精靈</span>
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-lg font-light leading-relaxed">
              石虎是台灣現存唯一的原生貓科動物。牠們優雅、神祕，卻也面臨著前所未有的生存挑戰。
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 px-8 py-4 bg-white text-habitat-earth rounded-full font-medium hover:bg-habitat-olive hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            探索石虎的世界 <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/leopardcat-portrait/800/1200" 
                alt="Leopard Cat Portrait" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 glass-panel p-8 flex flex-col justify-center">
              <span className="text-4xl font-serif text-habitat-olive mb-2">01</span>
              <h3 className="text-xl font-semibold mb-2">獨特的斑點</h3>
              <p className="text-sm text-habitat-earth/70">石虎身上有如錢幣般的斑點，因此又被稱為「錢貓」。</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif mb-8">牠們不只是貓</h2>
            <div className="space-y-6 text-lg text-habitat-earth/80 leading-relaxed">
              <p>
                石虎（Prionailurus bengalensis chinensis）與家貓最明顯的區別在於：耳後有明顯的白斑、眼窩內側有兩條明顯的白線，以及身上不規則的塊狀斑點。
              </p>
              <p>
                牠們是夜行性動物，擅長攀爬與游泳，主要棲息在海拔 1,500 公尺以下的淺山地區。
              </p>
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="p-6 bg-white rounded-3xl border border-habitat-olive/10">
                  <Camera className="text-habitat-olive mb-4" />
                  <h4 className="font-semibold mb-1">夜間獵手</h4>
                  <p className="text-sm opacity-70">敏銳的視覺與聽覺</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-habitat-olive/10">
                  <Trees className="text-habitat-olive mb-4" />
                  <h4 className="font-semibold mb-1">淺山之王</h4>
                  <p className="text-sm opacity-70">維持生態系平衡</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Habitat Section */}
      <section id="habitat" className="py-32 bg-habitat-olive text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-6xl font-serif mb-4">棲地分佈</h2>
              <p className="text-white/70 max-w-md">目前石虎在台灣的主要棲息地集中在苗栗、台中與南投一帶。</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 border border-white/20 rounded-full text-sm">苗栗縣</div>
              <div className="px-6 py-3 border border-white/20 rounded-full text-sm">台中市</div>
              <div className="px-6 py-3 border border-white/20 rounded-full text-sm">南投縣</div>
            </div>
          </div>

          <div className="relative h-[600px] rounded-[3rem] overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/taiwan-mountains/1600/900" 
              alt="Taiwan Habitat" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-habitat-olive/80 to-transparent flex items-end p-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <MapPin size={16} />
                  <span className="text-xs uppercase tracking-widest">Habitat Focus</span>
                </div>
                <h3 className="text-3xl font-serif mb-4">淺山地區的挑戰</h3>
                <p className="text-white/80">
                  石虎偏好居住在草生地、森林與農地交界的邊緣地帶。然而，這些地方也是人類活動最頻繁的區域，導致棲地破碎化嚴重。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threats Section */}
      <section id="threats" className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-serif mb-6">生存的威脅</h2>
          <p className="text-habitat-earth/60 text-lg">石虎的數量正急遽減少，目前全台估計僅存不到 500 隻。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { 
              icon: <AlertTriangle className="text-red-500" />, 
              title: "路殺危機", 
              desc: "道路開發切斷了棲地，石虎在穿梭時常不幸發生車禍。" 
            },
            { 
              icon: <Shield className="text-orange-500" />, 
              title: "棲地開發", 
              desc: "土地開發與農藥使用，讓石虎失去了安全的家園與獵物。" 
            },
            { 
              icon: <Heart className="text-pink-500" />, 
              title: "非法獵捕", 
              desc: "獸夾與毒餌依然威脅著石虎的生命安全。" 
            }
          ].map((threat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-white rounded-[3rem] border border-habitat-olive/5 shadow-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-habitat-cream flex items-center justify-center mb-8">
                {threat.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{threat.title}</h3>
              <p className="text-habitat-earth/70 leading-relaxed">{threat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Action Section */}
      <section id="action" className="py-32 bg-habitat-cream">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block p-4 bg-habitat-olive/10 rounded-full mb-8">
            <Heart className="text-habitat-olive" />
          </div>
          <h2 className="text-6xl font-serif mb-8">我們可以做什麼？</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left mt-16">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-habitat-olive text-white flex items-center justify-center font-serif text-xl">1</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">支持友善農作</h4>
                  <p className="text-habitat-earth/70">購買不使用除草劑與農藥的「石虎米」，保護牠們的獵場。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-habitat-olive text-white flex items-center justify-center font-serif text-xl">2</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">減速慢行</h4>
                  <p className="text-habitat-earth/70">在石虎出沒熱點路段，請降低車速，給牠們一條平安回家的路。</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-habitat-olive text-white flex items-center justify-center font-serif text-xl">3</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">推廣保育知識</h4>
                  <p className="text-habitat-earth/70">讓更多人認識石虎，了解牠們在台灣生態系中的重要地位。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-habitat-olive text-white flex items-center justify-center font-serif text-xl">4</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">通報與救援</h4>
                  <p className="text-habitat-earth/70">若發現受傷石虎，請立即聯繫相關保育單位進行專業救援。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-habitat-olive/10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-2xl italic">台灣石虎保育網</div>
          <div className="flex gap-8 text-sm text-habitat-earth/60">
            <a href="#" className="hover:text-habitat-olive">保育團體</a>
            <a href="#" className="hover:text-habitat-olive">研究報告</a>
            <a href="#" className="hover:text-habitat-olive">隱私條款</a>
          </div>
          <p className="text-xs text-habitat-earth/40">© 2026 守護石虎行動. All rights reserved.</p>
        </div>
      </footer>

      {/* Gemini Assistant Toggle */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-habitat-olive text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <MessageCircle />
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[400px] max-w-[calc(100vw-4rem)] h-[600px] glass-panel shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-habitat-olive text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">石虎小幫手</h4>
                  <p className="text-xs text-white/60">AI 專家在線解答</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50">
              {chatHistory.length === 0 && (
                <div className="text-center py-10 text-habitat-earth/40">
                  <p>你好！我是石虎保育專家。</p>
                  <p className="text-sm">你可以問我關於石虎的習性、棲地或保育問題。</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-habitat-olive text-white rounded-tr-none' 
                      : 'bg-habitat-cream text-habitat-earth rounded-tl-none border border-habitat-olive/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-habitat-cream p-4 rounded-2xl rounded-tl-none border border-habitat-olive/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-habitat-olive rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-habitat-olive rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-habitat-olive rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-habitat-olive/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="輸入問題..."
                className="flex-1 px-4 py-2 rounded-full bg-habitat-cream text-sm focus:outline-none focus:ring-2 focus:ring-habitat-olive/20"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-10 h-10 bg-habitat-olive text-white rounded-full flex items-center justify-center disabled:opacity-50"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
