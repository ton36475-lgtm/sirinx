type ChatbotMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const CONTACT_CTA =
  "หากต้องการประเมินจริง แนะนำส่งบิลค่าไฟ 3-12 เดือนและรูปพื้นที่ให้ทีม SIRINX ทาง LINE @sirinx เพื่อคัดขนาดระบบและนัดสำรวจ";

const normalize = (value: string) => value.toLowerCase();

const getLatestUserMessage = (messages: ChatbotMessage[]) =>
  messages
    .filter((message) => message.role === "user")
    .at(-1)
    ?.content.trim() ?? "";

const includesAny = (value: string, keywords: string[]) =>
  keywords.some((keyword) => value.includes(keyword));

export const createFallbackChatbotReply = (messages: ChatbotMessage[]) => {
  const latestMessage = getLatestUserMessage(messages);
  const normalized = normalize(latestMessage);

  if (
    includesAny(normalized, [
      "ราคา",
      "ค่าไฟ",
      "คืนทุน",
      "roi",
      "payback",
      "ภาษี",
      "boi",
    ])
  ) {
    return `ประเมินเบื้องต้นต้องใช้ค่าไฟรายเดือน, load profile, พื้นที่ติดตั้ง และเงื่อนไขบัญชีภาษีขององค์กรครับ SIRINX สามารถช่วยทำ ROI, LCOE และทางเลือก Solar Carport/Rooftop ให้เทียบเป็นฉากทัศน์ได้ โดยตัวเลขภาษีหรือสิทธิประโยชน์ต้องตรวจตามเงื่อนไขล่าสุดก่อนเสนอจริง ${CONTACT_CTA}`;
  }

  if (includesAny(normalized, ["carport", "ที่จอด", "ev", "charger"])) {
    return `Solar Carport เหมาะกับองค์กรที่ต้องการเปลี่ยนพื้นที่จอดรถเป็นสินทรัพย์พลังงาน: ได้ร่มเงา, รองรับ EV Charger และต่อยอด BESS/AI Energy Management ได้ ผลตอบแทนต้องคำนวณจากพื้นที่และพฤติกรรมใช้ไฟจริง ${CONTACT_CTA}`;
  }

  if (includesAny(normalized, ["bess", "battery", "แบต", "demand"])) {
    return `BESS เหมาะเมื่อมี demand charge สูง, โหลดพีกชัด หรืออยากเพิ่ม resilience ให้ระบบพลังงาน จุดคุ้มทุนขึ้นกับ tariff, profile การใช้ไฟ และขนาดแบตที่เหมาะสม SIRINX ควรเริ่มจากวิเคราะห์บิลและกราฟโหลดก่อนออกแบบ ${CONTACT_CTA}`;
  }

  if (includesAny(normalized, ["หลังคา", "rooftop", "ติดตั้ง", "แผง"])) {
    return `Rooftop Solar ควรเริ่มจากตรวจพื้นที่หลังคา, โครงสร้าง, เงาบัง, ทิศทางแดด และค่าไฟย้อนหลัง จากนั้นค่อยเทียบขนาดระบบกับ Solar Carport หรือ BESS เพื่อเลือกแพ็กเกจที่คุ้มที่สุดแบบไม่ฟันธงเกินข้อมูลจริง ${CONTACT_CTA}`;
  }

  return `SIRINX ช่วยองค์กรวางแผนพลังงานแสงอาทิตย์ครบวงจร ตั้งแต่ Solar Carport, Rooftop Solar, BESS, AI Energy Management ไปจนถึง O&M คำตอบนี้เป็นโหมด fallback เมื่อระบบ AI เชิงลึกยังไม่เชื่อมต่อ จึงให้คำแนะนำเบื้องต้นและไม่แทนการประเมินหน้างานครับ ${CONTACT_CTA}`;
};
