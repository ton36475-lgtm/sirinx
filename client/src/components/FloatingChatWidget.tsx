import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, MessageCircle, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { useEventTracking } from "@/hooks/useAnalytics";
import LightMarkdown from "./LightMarkdown";

// ===== LINE SVG Icon =====
const LINEIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

// ===== SIRINX Bot Avatar =====
const BotAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shrink-0">
    <Zap className="w-4 h-4 text-white" />
  </div>
);

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const QUICK_REPLIES = [
  { label: "ขอใบเสนอราคา", message: "ต้องการขอใบเสนอราคาติดตั้งโซลาร์เซลล์" },
  { label: "นัดสำรวจหน้างาน", message: "ต้องการนัดทีมวิศวกรมาสำรวจหน้างาน" },
  { label: "สอบถามราคา Solar", message: "ราคาติดตั้งโซลาร์เซลล์ประมาณเท่าไหร่?" },
  { label: "BESS แบตเตอรี่", message: "อยากทราบเกี่ยวกับระบบแบตเตอรี่กักเก็บพลังงาน BESS" },
];

const LINE_OA_URL_DEFAULT = "https://line.me/R/ti/p/@sirinx";

const CONTACT_CTA =
  "หากต้องการประเมินจริง แนะนำส่งบิลค่าไฟ 3-12 เดือนและรูปพื้นที่ให้ทีม SIRINX ทาง LINE @sirinx เพื่อคัดขนาดระบบและนัดสำรวจ";

const createClientFallbackReply = (messages: ChatMessage[]) => {
  const latestMessage = messages
    .filter((message) => message.role === "user")
    .at(-1)
    ?.content.trim()
    .toLowerCase() ?? "";

  if (["ราคา", "ค่าไฟ", "คืนทุน", "roi", "payback", "ภาษี", "boi"].some((keyword) => latestMessage.includes(keyword))) {
    return `ประเมินเบื้องต้นต้องใช้ค่าไฟรายเดือน, load profile, พื้นที่ติดตั้ง และเงื่อนไขบัญชีภาษีขององค์กรครับ SIRINX สามารถช่วยทำ ROI, LCOE และทางเลือก Solar Carport/Rooftop ให้เทียบเป็นฉากทัศน์ได้ โดยตัวเลขภาษีหรือสิทธิประโยชน์ต้องตรวจตามเงื่อนไขล่าสุดก่อนเสนอจริง ${CONTACT_CTA}`;
  }

  if (["carport", "ที่จอด", "ev", "charger"].some((keyword) => latestMessage.includes(keyword))) {
    return `Solar Carport เหมาะกับองค์กรที่ต้องการเปลี่ยนพื้นที่จอดรถเป็นสินทรัพย์พลังงาน: ได้ร่มเงา, รองรับ EV Charger และต่อยอด BESS/AI Energy Management ได้ ผลตอบแทนต้องคำนวณจากพื้นที่และพฤติกรรมใช้ไฟจริง ${CONTACT_CTA}`;
  }

  if (["bess", "battery", "แบต", "demand"].some((keyword) => latestMessage.includes(keyword))) {
    return `BESS เหมาะเมื่อมี demand charge สูง, โหลดพีกชัด หรืออยากเพิ่ม resilience ให้ระบบพลังงาน จุดคุ้มทุนขึ้นกับ tariff, profile การใช้ไฟ และขนาดแบตที่เหมาะสม SIRINX ควรเริ่มจากวิเคราะห์บิลและกราฟโหลดก่อนออกแบบ ${CONTACT_CTA}`;
  }

  if (["หลังคา", "rooftop", "ติดตั้ง", "แผง"].some((keyword) => latestMessage.includes(keyword))) {
    return `Rooftop Solar ควรเริ่มจากตรวจพื้นที่หลังคา, โครงสร้าง, เงาบัง, ทิศทางแดด และค่าไฟย้อนหลัง จากนั้นค่อยเทียบขนาดระบบกับ Solar Carport หรือ BESS เพื่อเลือกแพ็กเกจที่คุ้มที่สุดแบบไม่ฟันธงเกินข้อมูลจริง ${CONTACT_CTA}`;
  }

  return `SIRINX ช่วยองค์กรวางแผนพลังงานแสงอาทิตย์ครบวงจร ตั้งแต่ Solar Carport, Rooftop Solar, BESS, AI Energy Management ไปจนถึง O&M คำตอบนี้เป็นโหมด fallback เมื่อระบบ AI เชิงลึกยังไม่เชื่อมต่อ จึงให้คำแนะนำเบื้องต้นและไม่แทนการประเมินหน้างานครับ ${CONTACT_CTA}`;
};

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { trackEvent } = useEventTracking();

  const lineOaUrl = (typeof window !== "undefined" && (window as any).__ENV__?.VITE_LINE_OA_URL) || import.meta.env.VITE_LINE_OA_URL || LINE_OA_URL_DEFAULT;

  // AI Chat mutation
  const chatMutation = trpc.chatbot.chat.useMutation({
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.reply },
      ]);
    },
    onError: (_error, request) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: createClientFallbackReply(request.messages as ChatMessage[]),
        },
      ]);
    },
  });

  // Show bubble after 5 seconds
  useEffect(() => {
    if (bubbleDismissed) return;
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [bubbleDismissed]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatMutation.isPending]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShowBubble(false);
    setBubbleDismissed(true);
    trackEvent("chatbot", "widget_open", { label: "floating_icon" });
  }, [trackEvent]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || chatMutation.isPending) return;

      const userMsg: ChatMessage = { role: "user", content: msg };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");

      trackEvent("chatbot", "message_sent", { label: msg.substring(0, 50) });

      chatMutation.mutate({
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
    },
    [input, messages, chatMutation, trackEvent]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLineClick = useCallback(() => {
    trackEvent("line_click", "line_oa_open", { label: "chatbot_widget" });
    window.open(lineOaUrl, "_blank");
  }, [lineOaUrl, trackEvent]);

  const displayMessages = messages.filter((m) => m.role !== "system");

  return (
    <>
      {/* ===== FLOATING ICON ===== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3"
          >
            {/* Bubble Message */}
            <AnimatePresence>
              {showBubble && !bubbleDismissed && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl px-4 py-3 max-w-[240px] border border-gray-200 dark:border-slate-700 cursor-pointer"
                  onClick={handleOpen}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBubbleDismissed(true);
                      setShowBubble(false);
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-400 dark:bg-slate-600 text-white flex items-center justify-center text-xs hover:bg-gray-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug">
                    สนใจโซลาร์เซลล์ไหมครับ? 
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    พิมพ์ถามได้เลย หรือแอดไลน์คุยกัน
                  </p>
                  {/* Triangle pointer */}
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-gray-200 dark:border-slate-700 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Floating Button */}
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0d9488 50%, #00C300 100%)",
              }}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-cyan-400" />
              {/* Inner glow */}
              <span className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400/30 to-green-400/30 group-hover:from-cyan-400/50 group-hover:to-green-400/50 transition-all" />
              {/* Icon */}
              <div className="relative flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-white drop-shadow-md" />
              </div>
              {/* LINE badge */}
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#00C300] border-2 border-white flex items-center justify-center shadow-md">
                <LINEIcon className="w-3 h-3 text-white" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CHAT WIDGET ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-700/50"
            style={{
              background: "linear-gradient(180deg, #0f1729 0%, #0a1628 100%)",
            }}
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-slate-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <BotAvatar />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0f1729]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">SIRINX Assistant</h3>
                    <p className="text-xs text-cyan-400/80">ออนไลน์ พร้อมให้บริการ</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full hover:bg-slate-700/50 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {displayMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-2">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h4 className="font-semibold text-white text-base mb-1.5">
                      สวัสดีครับ! ยินดีให้บริการ
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      สอบถามเรื่องโซลาร์เซลล์ BESS แบตเตอรี่ หรือนัดสำรวจหน้างานได้เลยครับ
                    </p>
                  </div>

                  {/* Quick Replies */}
                  <div className="w-full space-y-2">
                    {QUICK_REPLIES.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => handleSend(qr.message)}
                        disabled={chatMutation.isPending}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl border border-slate-700/60 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all text-sm text-slate-300 hover:text-cyan-300 disabled:opacity-50 flex items-center justify-between group"
                      >
                        <span>{qr.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </button>
                    ))}
                  </div>

                  {/* LINE CTA */}
                  <button
                    onClick={handleLineClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C300] hover:bg-[#00B300] text-white font-medium text-sm transition-colors shadow-lg shadow-green-500/20"
                  >
                    <LINEIcon className="w-5 h-5" />
                    <span>แอดไลน์ @sirinx</span>
                  </button>
                </div>
              ) : (
                <>
                  {displayMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2.5",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && <BotAvatar />}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-cyan-600 text-white rounded-br-md"
                            : "bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700/50"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-li:my-0.5">
                            <LightMarkdown>{msg.content}</LightMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {chatMutation.isPending && (
                    <div className="flex gap-2.5">
                      <BotAvatar />
                      <div className="bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-700/50">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick action after conversation */}
                  {displayMessages.length > 0 && !chatMutation.isPending && (
                    <div className="flex gap-2 flex-wrap pt-1">
                      <button
                        onClick={handleLineClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C300]/10 border border-[#00C300]/30 text-[#00C300] text-xs font-medium hover:bg-[#00C300]/20 transition-colors"
                      >
                        <LINEIcon className="w-3.5 h-3.5" />
                        ต่อสายผ่าน LINE
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-slate-700/50 bg-[#0a1628]/80 backdrop-blur-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2 items-end"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="พิมพ์ข้อความ..."
                  rows={1}
                  className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 resize-none max-h-24 min-h-[38px]"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || chatMutation.isPending}
                  className="shrink-0 h-[38px] w-[38px] rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-30"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
              <p className="text-[10px] text-slate-600 text-center mt-1.5">
                AI อาจตอบไม่ถูกต้อง 100% กรุณายืนยันข้อมูลกับทีมงาน
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
