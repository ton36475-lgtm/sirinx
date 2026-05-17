export type AeoPageId =
  | "what-is-sirinx"
  | "sirinx-god-ai"
  | "ai-load-control"
  | "dynamic-roi"
  | "predictive-maintenance"
  | "sirinx-vs-normal-solar-monitoring"
  | "faq"
  | "glossary";

export type AeoFact = {
  label: string;
  value: string;
};

export type AeoFaq = {
  question: string;
  answer: string;
};

export type AeoInternalLink = {
  label: string;
  href: string;
};

export type AeoTerm = {
  term: string;
  meaning: string;
};

export type AeoPageContent = {
  id: AeoPageId;
  path: string;
  h1: string;
  directAnswer: string;
  summary: string;
  facts: AeoFact[];
  problem: string;
  solution: string;
  audienceTitle: string;
  audience: string[];
  featuresTitle: string;
  features: string[];
  faqs: AeoFaq[];
  links: AeoInternalLink[];
  lastUpdated: string;
  terms?: AeoTerm[];
};

export const aeoPages: Record<AeoPageId, AeoPageContent> = {
  "what-is-sirinx": {
    id: "what-is-sirinx",
    path: "/what-is-sirinx",
    h1: "SIRINX คืออะไร?",
    directAnswer:
      "SIRINX คือบริษัท Solar Digital Agentic ที่ออกแบบ ติดตั้ง และบริหารระบบพลังงานสะอาดสำหรับธุรกิจไทย โดยรวม Solar Carport, Rooftop Solar, BESS, EV Charger, AI Energy Management, ROI assessment และ workflow ทีมวิศวกรรมไว้ในระบบเดียว",
    summary:
      "SIRINX วางระบบพลังงานให้ธุรกิจเห็นทั้งมุมวิศวกรรม การลงทุน และการใช้งานจริง ไม่ใช่แค่ติดตั้งแผงโซลาร์แล้วจบงาน",
    facts: [
      { label: "ประเภท", value: "Solar Digital Agentic Company" },
      { label: "บริการหลัก", value: "Solar Carport, Rooftop Solar, BESS, EV Charger, AI Energy" },
      { label: "กลุ่มลูกค้า", value: "โรงงาน อาคารพาณิชย์ โรงแรม สำนักงาน และพื้นที่จอดรถ" },
      { label: "เป้าหมาย", value: "ลดค่าไฟ เพิ่มข้อมูลพลังงาน และสร้างสินทรัพย์พลังงานระยะยาว" },
    ],
    problem:
      "ธุรกิจจำนวนมากมีพื้นที่หลังคาหรือที่จอดรถแต่ยังจ่ายค่าไฟสูง และไม่มีข้อมูลพลังงานที่พอสำหรับตัดสินใจลงทุนอย่างมั่นใจ",
    solution:
      "SIRINX ใช้การสำรวจหน้างาน ข้อมูลบิลไฟ load profile และแบบวิศวกรรม เพื่อออกแบบระบบที่เหมาะกับพื้นที่จริง พร้อมวางชั้นข้อมูลสำหรับติดตามผลประหยัดและประสิทธิภาพหลังติดตั้ง",
    audienceTitle: "SIRINX เหมาะกับใคร",
    audience: [
      "เจ้าของโรงงานหรืออาคารที่ต้องการลดค่าไฟระยะยาว",
      "โรงแรมและธุรกิจบริการที่มีโหลดไฟฟ้าต่อเนื่อง",
      "องค์กรที่ต้องการ Solar Carport พร้อม EV Charger",
      "ทีมบริหารที่ต้องการ ROI และข้อมูลพลังงานก่อนตัดสินใจลงทุน",
    ],
    featuresTitle: "สิ่งที่ SIRINX รวมไว้ในระบบเดียว",
    features: [
      "สำรวจและออกแบบระบบโซลาร์ตามพื้นที่จริง",
      "ประเมิน ROI จากข้อมูลบิลไฟและรูปแบบการใช้ไฟ",
      "เชื่อม Solar, BESS, EV Charger และ AI Energy Management",
      "เตรียมข้อมูลสำหรับ monitoring, maintenance และรายงานผู้บริหาร",
    ],
    faqs: [
      {
        question: "SIRINX ต่างจากบริษัทติดตั้งโซลาร์ทั่วไปอย่างไร?",
        answer:
          "SIRINX ไม่ได้เริ่มจากการขายอุปกรณ์ แต่เริ่มจากข้อมูลพื้นที่ ค่าไฟ โหลดใช้งาน และเป้าหมายธุรกิจ เพื่อออกแบบระบบพลังงานที่วัดผลได้",
      },
      {
        question: "SIRINX รับงานแบบใดบ้าง?",
        answer:
          "รับงาน Solar Carport, Rooftop Solar, BESS, EV Charger, AI Energy Management, O&M และ assessment สำหรับองค์กร",
      },
      {
        question: "ต้องมีข้อมูลอะไรเพื่อเริ่มประเมิน?",
        answer:
          "ควรมีบิลไฟย้อนหลัง รูปพื้นที่หลังคาหรือที่จอดรถ พิกัดสถานที่ และข้อมูลโหลดใช้งานหลักของธุรกิจ",
      },
    ],
    links: [
      { label: "ดู Solar Carport", href: "/solar-carport" },
      { label: "ประเมินระบบ", href: "/assessment" },
      { label: "ติดต่อ SIRINX", href: "/contact" },
    ],
    lastUpdated: "2026-05-17",
  },
  "sirinx-god-ai": {
    id: "sirinx-god-ai",
    path: "/sirinx-god-ai",
    h1: "SIRINX GOD AI คืออะไร?",
    directAnswer:
      "SIRINX GOD AI คือแนวคิดระบบ AI Energy Management ของ SIRINX สำหรับติดตามการผลิตไฟ การใช้ไฟ ความคุ้มค่า และสัญญาณผิดปกติของระบบโซลาร์แบบต่อเนื่อง เพื่อช่วยให้เจ้าของระบบเห็นสถานะและตัดสินใจจากข้อมูลจริง",
    summary:
      "ชั้น AI นี้ถูกออกแบบให้เป็นศูนย์กลางข้อมูลหลังติดตั้ง ช่วยเชื่อม monitoring, ROI, load control และ maintenance เข้ากับ workflow ของทีมปฏิบัติการ",
    facts: [
      { label: "หมวดระบบ", value: "AI Energy Management" },
      { label: "ข้อมูลหลัก", value: "Production, Consumption, ROI, Alerts, Maintenance" },
      { label: "ใช้กับ", value: "Solar Carport, Rooftop Solar, BESS, EV Charger" },
      { label: "สถานะคำอธิบาย", value: "แนวคิด platform layer สำหรับระบบ SIRINX" },
    ],
    problem:
      "หลังติดตั้งโซลาร์ เจ้าของระบบมักเห็นแค่ค่าผลิตไฟ แต่ไม่เห็นความสัมพันธ์กับบิลไฟ โหลดใช้งาน ROI หรือสัญญาณเสี่ยงของอุปกรณ์",
    solution:
      "SIRINX GOD AI รวมข้อมูลพลังงานและสัญญาณปฏิบัติการไว้ในมุมมองเดียว เพื่อให้ทีมดูแนวโน้ม ค้นหาความผิดปกติ และวางแผนปรับการใช้ไฟได้เร็วขึ้น",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "ธุรกิจที่มีระบบโซลาร์หลายจุดหรือหลายอาคาร",
      "ผู้บริหารที่ต้องการมอง ROI แบบเปลี่ยนตามข้อมูลจริง",
      "ทีม facility ที่ต้องจัดการโหลดไฟฟ้า EV Charger หรือ BESS",
      "เจ้าของโครงการที่ต้องการ alert และ maintenance workflow",
    ],
    featuresTitle: "ฟีเจอร์หลัก",
    features: [
      "AI Load Control สำหรับช่วยจัดลำดับโหลดไฟฟ้า",
      "Dynamic ROI สำหรับติดตามความคุ้มค่าตามข้อมูลจริง",
      "Predictive Maintenance สำหรับจับสัญญาณผิดปกติล่วงหน้า",
      "System Uptime Monitoring สำหรับติดตามสถานะระบบ",
    ],
    faqs: [
      {
        question: "SIRINX GOD AI เป็นแอปแยกจากเว็บไซต์หรือไม่?",
        answer:
          "บนเว็บไซต์ public จะอธิบายแนวคิดและฟีเจอร์ ส่วนระบบควบคุมภายในต้องอยู่ในโดเมนหรือเส้นทางที่แยกจาก public site",
      },
      {
        question: "AI ช่วยลดค่าไฟได้อย่างไร?",
        answer:
          "AI ช่วยวิเคราะห์รูปแบบการใช้ไฟและแนะนำการจัดลำดับโหลด การใช้พลังงานจากโซลาร์ BESS หรือ EV Charger ให้เหมาะกับเงื่อนไขของโครงการ",
      },
      {
        question: "ข้อมูล ROI เปลี่ยนได้หรือไม่?",
        answer:
          "เปลี่ยนได้ เพราะ ROI ที่ดีควรสะท้อนค่าไฟ การผลิตไฟ การใช้ไฟ และประสิทธิภาพจริงในแต่ละช่วงเวลา",
      },
    ],
    links: [
      { label: "AI Load Control", href: "/features/ai-load-control" },
      { label: "Dynamic ROI", href: "/features/dynamic-roi" },
      { label: "Predictive Maintenance", href: "/features/predictive-maintenance" },
    ],
    lastUpdated: "2026-05-17",
  },
  "ai-load-control": {
    id: "ai-load-control",
    path: "/features/ai-load-control",
    h1: "AI Load Control คืออะไร?",
    directAnswer:
      "AI Load Control คือระบบที่ใช้ข้อมูลและ AI วิเคราะห์การใช้ไฟฟ้า เพื่อช่วยจัดลำดับโหลด ลด peak load เพิ่ม self-consumption จากโซลาร์ และทำให้การใช้ BESS หรือ EV Charger สอดคล้องกับเป้าหมายค่าไฟของธุรกิจ",
    summary:
      "หัวใจของ AI Load Control คือการทำให้ไฟที่ผลิตได้ถูกใช้ในจังหวะที่คุ้มที่สุด โดยยังต้องมี human override และข้อจำกัดด้านความปลอดภัยของระบบไฟฟ้า",
    facts: [
      { label: "ข้อมูลที่ใช้", value: "Load profile, solar production, tariff, BESS/EV schedule" },
      { label: "เป้าหมาย", value: "ลด peak, เพิ่ม self-consumption, ลด waste" },
      { label: "ต้องมี", value: "metering, monitoring และ rule ที่ตรวจสอบได้" },
      { label: "ข้อจำกัด", value: "ผลลัพธ์ขึ้นอยู่กับโหลดจริงและโครงสร้างค่าไฟ" },
    ],
    problem:
      "ระบบโซลาร์อาจผลิตไฟได้มาก แต่ถ้าโหลดใช้งานไม่ตรงเวลา หรือ EV Charger/BESS ทำงานไม่สัมพันธ์กับการผลิต ผลประหยัดจริงอาจต่ำกว่าที่ควร",
    solution:
      "AI Load Control วิเคราะห์โหลดและกำหนดลำดับการใช้ไฟ เช่น เลื่อนโหลดบางชนิด ใช้ BESS ในช่วงเหมาะสม หรือจัดคิว EV Charging ตามข้อจำกัดของธุรกิจ",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "โรงงานหรืออาคารที่มี peak load สูง",
      "พื้นที่ที่มี EV Charger หลายหัว",
      "ธุรกิจที่มี BESS หรือกำลังวางแผนติดตั้ง BESS",
      "องค์กรที่ต้องการเพิ่มการใช้ไฟจากโซลาร์ในพื้นที่จริง",
    ],
    featuresTitle: "สิ่งที่ระบบควรควบคุมได้",
    features: [
      "ลำดับความสำคัญของโหลดไฟฟ้า",
      "ตารางชาร์จ EV ตามช่วงเวลาที่เหมาะสม",
      "การชาร์จและจ่ายไฟของ BESS ตาม tariff และโหลด",
      "alert เมื่อโหลดหรืออุปกรณ์ทำงานผิดจาก pattern ที่กำหนด",
    ],
    faqs: [
      {
        question: "AI Load Control ลดค่าไฟได้แน่นอนหรือไม่?",
        answer:
          "ไม่ควรอ้างเป็นตัวเลขคงที่ ผลจริงขึ้นอยู่กับโครงสร้างค่าไฟ โหลดใช้งาน พื้นที่ติดตั้ง และอุปกรณ์ที่ควบคุมได้",
      },
      {
        question: "ต้องปิดเครื่องจักรหรือโหลดสำคัญหรือไม่?",
        answer:
          "ไม่จำเป็นต้องควบคุมโหลดสำคัญโดยไม่มีอนุมัติ ระบบที่ดีควรกำหนด priority และ human override เพื่อความปลอดภัย",
      },
      {
        question: "เริ่มใช้ได้เมื่อไร?",
        answer:
          "ควรเริ่มจากการเก็บข้อมูล load profile และ monitoring ก่อน แล้วค่อยกำหนด rule หรือ automation ที่เหมาะกับไซต์",
      },
    ],
    links: [
      { label: "SIRINX GOD AI", href: "/sirinx-god-ai" },
      { label: "Dynamic ROI", href: "/features/dynamic-roi" },
      { label: "ขอประเมินระบบ", href: "/assessment" },
    ],
    lastUpdated: "2026-05-17",
  },
  "dynamic-roi": {
    id: "dynamic-roi",
    path: "/features/dynamic-roi",
    h1: "Dynamic ROI คืออะไร?",
    directAnswer:
      "Dynamic ROI คือการคำนวณระยะเวลาคืนทุนของระบบโซลาร์เซลล์แบบเปลี่ยนตามข้อมูลจริง เช่น ค่าไฟ การผลิตไฟ การใช้ไฟ tariff ประสิทธิภาพระบบ และพฤติกรรมโหลดในแต่ละช่วงเวลา",
    summary:
      "การคืนทุนไม่ควรถูกล็อกไว้เป็นตัวเลขครั้งเดียวตอนขาย เพราะค่าไฟและ load profile เปลี่ยนได้ Dynamic ROI จึงช่วยให้เจ้าของระบบเห็นความคุ้มค่าที่อัปเดตตามสภาพจริง",
    facts: [
      { label: "ข้อมูลที่ใช้", value: "ค่าไฟ, kWh ผลิต, kWh ใช้เอง, tariff, downtime" },
      { label: "ผลลัพธ์", value: "payback, savings, utilization, scenario comparison" },
      { label: "ค่าอ้างอิง public", value: "บางโครงการคืนทุนประมาณ 3-6 ปีตามเงื่อนไขจริง" },
      { label: "ข้อควรระวัง", value: "ต้องไม่ใช้ตัวเลขเดียวแทนทุกโครงการ" },
    ],
    problem:
      "ROI แบบเดิมมักเป็น spreadsheet ก่อนขายที่ไม่สะท้อนค่าไฟที่เปลี่ยน โหลดที่เปลี่ยน หรือ performance หลังติดตั้ง",
    solution:
      "Dynamic ROI อัปเดตผลประหยัดและ payback จากข้อมูลใช้งานจริง ทำให้เจ้าของระบบเห็นว่าระบบยังทำงานคุ้มค่าหรือควรปรับ strategy อย่างไร",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "เจ้าของธุรกิจที่ต้องตัดสินใจลงทุนจากตัวเลข",
      "CFO หรือทีม finance ที่ต้องการ payback ที่ตรวจสอบได้",
      "ผู้จัดการอาคารที่ต้องรายงาน savings ต่อผู้บริหาร",
      "โครงการที่มี BESS, EV Charger หรือโหลดที่เปลี่ยนตามเวลา",
    ],
    featuresTitle: "ข้อมูลที่ควรเห็นใน Dynamic ROI",
    features: [
      "ผลประหยัดต่อเดือนและสะสม",
      "payback period ที่เปลี่ยนตามข้อมูลจริง",
      "production vs consumption",
      "scenario เทียบซื้อขาด ผ่อนชำระ หรือรูปแบบลงทุนอื่น",
    ],
    faqs: [
      {
        question: "Dynamic ROI ต่างจาก ROI แบบเดิมอย่างไร?",
        answer:
          "ROI แบบเดิมเป็นค่าประมาณตอนเริ่มโครงการ ส่วน Dynamic ROI อัปเดตตามข้อมูลจริง เช่น ค่าไฟ การผลิต การใช้ไฟ และ downtime",
      },
      {
        question: "SIRINX ใช้ตัวเลข 30-100% อย่างไร?",
        answer:
          "30-100% เป็นช่วงผลลดค่าไฟที่เป็นไปได้ในบางรูปแบบโครงการ โดยโครงการที่ self-consumption สูงและออกแบบเหมาะสมอาจ offset ได้ใกล้ 100%; ผลจริงต้องประเมินจากข้อมูลหน้างาน",
      },
      {
        question: "ต้องมี smart meter หรือ monitoring หรือไม่?",
        answer:
          "ควรมี เพราะ Dynamic ROI ต้องใช้ข้อมูลการผลิต การใช้ไฟ และเหตุการณ์ของระบบเพื่อคำนวณอย่างน่าเชื่อถือ",
      },
    ],
    links: [
      { label: "ประเมิน Solar", href: "/assessment" },
      { label: "AI Load Control", href: "/features/ai-load-control" },
      { label: "Pricing", href: "/pricing" },
    ],
    lastUpdated: "2026-05-17",
  },
  "predictive-maintenance": {
    id: "predictive-maintenance",
    path: "/features/predictive-maintenance",
    h1: "Predictive Maintenance สำหรับโซลาร์เซลล์คืออะไร?",
    directAnswer:
      "Predictive Maintenance คือการใช้ข้อมูลและ AI วิเคราะห์สัญญาณผิดปกติของระบบโซลาร์เซลล์ล่วงหน้า เพื่อช่วยลด downtime ลดความเสียหาย และวางแผนซ่อมบำรุงก่อนปัญหาเล็กกลายเป็นปัญหาใหญ่",
    summary:
      "ระบบโซลาร์ที่ดีต้องดูแลตลอดอายุใช้งาน ไม่ใช่ดูแค่วันติดตั้ง การวิเคราะห์แนวโน้มช่วยให้ทีม O&M รู้ว่าควรตรวจอะไร ก่อนที่ผลผลิตหรือรายได้จะเสียหาย",
    facts: [
      { label: "ข้อมูลที่ใช้", value: "production trend, inverter status, alarm, weather context" },
      { label: "เป้าหมาย", value: "ลด downtime และวางแผน O&M ให้เร็วขึ้น" },
      { label: "ตรวจจับได้", value: "performance drop, inverter alarm, abnormal pattern" },
      { label: "ข้อจำกัด", value: "ต้องมีข้อมูลต่อเนื่องและการตรวจสอบโดยทีมช่าง" },
    ],
    problem:
      "หลายระบบรู้ว่ามีปัญหาก็ต่อเมื่อค่าไฟไม่ลดหรือ production หายไปแล้ว ทำให้เสียเวลาและเสียโอกาสประหยัดค่าไฟ",
    solution:
      "Predictive Maintenance ติดตามแนวโน้มและ alarm เพื่อจัดลำดับงานตรวจสอบ แจ้งเตือนความเสี่ยง และวางแผนซ่อมก่อนกระทบการใช้งานมากขึ้น",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "ระบบโซลาร์องค์กรที่ต้องการ uptime สูง",
      "โรงงานหรืออาคารที่ไฟฟ้าเป็นต้นทุนสำคัญ",
      "เจ้าของ Solar Carport หรือ Rooftop Solar หลายจุด",
      "ทีม O&M ที่ต้องการจัดลำดับงานจากความเสี่ยงจริง",
    ],
    featuresTitle: "สิ่งที่ควรติดตาม",
    features: [
      "production drop เทียบกับ baseline",
      "inverter alarm และ communication loss",
      "string หรือ zone ที่ performance ต่ำผิดปกติ",
      "maintenance ticket และประวัติการแก้ไข",
    ],
    faqs: [
      {
        question: "Predictive Maintenance รับประกันว่าไม่มี downtime ได้ไหม?",
        answer:
          "ไม่ควรรับประกันแบบนั้น แต่ช่วยลดความเสี่ยงและทำให้ทีมพบปัญหาได้เร็วขึ้นเมื่อมีข้อมูลและ workflow ที่เหมาะสม",
      },
      {
        question: "ต้องใช้ AI เสมอหรือไม่?",
        answer:
          "เริ่มจาก rule และ monitoring ได้ แต่ AI ช่วยจับ pattern และจัดลำดับความเสี่ยงเมื่อมีข้อมูลมากพอ",
      },
      {
        question: "เหมาะกับระบบขนาดเล็กไหม?",
        answer:
          "ใช้ได้ แต่คุ้มค่าที่สุดกับระบบที่มีต้นทุน downtime สูง มีหลาย inverter หรือมีหลายสถานที่ต้องดูแล",
      },
    ],
    links: [
      { label: "SIRINX GOD AI", href: "/sirinx-god-ai" },
      { label: "ดูโซลูชัน", href: "/solutions" },
      { label: "ติดต่อทีมวิศวกร", href: "/contact" },
    ],
    lastUpdated: "2026-05-17",
  },
  "sirinx-vs-normal-solar-monitoring": {
    id: "sirinx-vs-normal-solar-monitoring",
    path: "/compare/sirinx-vs-normal-solar-monitoring",
    h1: "SIRINX ต่างจาก Solar Monitoring ทั่วไปอย่างไร?",
    directAnswer:
      "Solar Monitoring ทั่วไปมักแสดงค่าผลิตไฟและ alarm พื้นฐาน ส่วน SIRINX วางระบบให้เชื่อมข้อมูลโซลาร์กับ ROI, load profile, BESS, EV Charger, maintenance และมุมมองผู้บริหาร เพื่อช่วยตัดสินใจได้มากกว่าการดูกราฟผลิตไฟ",
    summary:
      "เป้าหมายของ SIRINX คือเปลี่ยนข้อมูลพลังงานให้เป็น workflow ธุรกิจ ตั้งแต่การประเมินก่อนลงทุนจนถึงการดูแลหลังติดตั้ง",
    facts: [
      { label: "Monitoring ทั่วไป", value: "ดู production, inverter, alarm" },
      { label: "SIRINX", value: "เชื่อม production กับ ROI, load, O&M และ decision workflow" },
      { label: "จุดต่างหลัก", value: "ข้อมูลใช้เพื่อการตัดสินใจ ไม่ใช่แค่ดูสถานะ" },
      { label: "เหมาะกับ", value: "ธุรกิจที่ต้องการ energy strategy ระยะยาว" },
    ],
    problem:
      "กราฟผลิตไฟอย่างเดียวตอบคำถามสำคัญไม่ได้ เช่น ค่าไฟลดจริงเท่าไร คืนทุนเร็วขึ้นหรือช้าลง อุปกรณ์ไหนเสี่ยง และควรปรับโหลดอย่างไร",
    solution:
      "SIRINX ออกแบบ data layer และหน้า decision view ให้ผู้บริหาร ทีม facility และทีม O&M เห็นข้อมูลคนละมุม แต่ใช้ source of truth เดียวกัน",
    audienceTitle: "ใครควรเลือก SIRINX แทน monitoring ทั่วไป",
    audience: [
      "องค์กรที่ต้องรายงานผลประหยัดและ ROI",
      "ธุรกิจที่มี Solar, BESS และ EV Charger พร้อมกัน",
      "ทีมที่ต้องดูแลหลายไซต์หรือหลายอาคาร",
      "เจ้าของระบบที่ต้องการ maintenance workflow ที่ตรวจสอบได้",
    ],
    featuresTitle: "เปรียบเทียบแบบใช้งานจริง",
    features: [
      "จาก production chart ไปสู่ ROI tracking",
      "จาก alarm ไปสู่ maintenance priority",
      "จาก dashboard เดี่ยวไปสู่ workflow ทีมงาน",
      "จากข้อมูลแยกส่วนไปสู่ energy operating layer",
    ],
    faqs: [
      {
        question: "ถ้ามี monitoring จาก inverter อยู่แล้ว ยังต้องใช้ SIRINX ไหม?",
        answer:
          "Monitoring จาก inverter ยังมีประโยชน์ แต่ SIRINX เพิ่มมุม ROI, load, maintenance และ decision workflow ที่เชื่อมกับธุรกิจมากขึ้น",
      },
      {
        question: "SIRINX แทนระบบเดิมทั้งหมดหรือไม่?",
        answer:
          "ไม่จำเป็น เป้าหมายคือรวมและตีความข้อมูลที่จำเป็น โดยไม่ทำลายระบบเดิมที่ยังทำงานได้ดี",
      },
      {
        question: "เริ่มจาก assessment ก่อนได้ไหม?",
        answer:
          "ได้ การเริ่มจาก assessment ช่วยระบุว่าควรติดตามข้อมูลอะไรและควรใช้ชั้น AI หรือ dashboard ระดับใด",
      },
    ],
    links: [
      { label: "SIRINX GOD AI", href: "/sirinx-god-ai" },
      { label: "Predictive Maintenance", href: "/features/predictive-maintenance" },
      { label: "ประเมินระบบ", href: "/assessment" },
    ],
    lastUpdated: "2026-05-17",
  },
  faq: {
    id: "faq",
    path: "/faq",
    h1: "คำถามที่พบบ่อยเกี่ยวกับ SIRINX และ Solar Carport",
    directAnswer:
      "หน้านี้รวบรวมคำตอบสำคัญเกี่ยวกับ SIRINX, Solar Carport, Rooftop Solar, BESS, EV Charger, AI Energy Management, ระยะเวลาคืนทุน และการเริ่มประเมินระบบสำหรับธุรกิจ",
    summary:
      "คำตอบทั้งหมดเป็นข้อมูล public-safe สำหรับช่วยให้เจ้าของธุรกิจเตรียมข้อมูลก่อนคุยกับทีมวิศวกร ไม่ใช่ใบเสนอราคาหรือคำรับประกันผลลัพธ์ของทุกโครงการ",
    facts: [
      { label: "หัวข้อ", value: "Solar Carport, ROI, AI Energy, BESS, EV Charger" },
      { label: "เหมาะกับ", value: "เจ้าของธุรกิจและทีม facility" },
      { label: "ขั้นตอนถัดไป", value: "ส่งบิลไฟและนัดสำรวจหน้างาน" },
      { label: "ข้อจำกัด", value: "ตัวเลขจริงต้องประเมินจากข้อมูลโครงการ" },
    ],
    problem:
      "ก่อนเริ่มโครงการ ลูกค้ามักไม่แน่ใจว่าต้องใช้ข้อมูลอะไร ลดค่าไฟได้เท่าไร คืนทุนเมื่อไร และระบบ AI ช่วยอะไรได้จริง",
    solution:
      "FAQ นี้จัดคำถามสำคัญให้อ่านง่าย พร้อมลิงก์ไปยังหน้าที่อธิบายเชิงลึกและช่องทางประเมินระบบ",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "เจ้าของกิจการที่กำลังพิจารณา Solar Carport",
      "ทีมจัดซื้อหรือ facility ที่ต้องเตรียมข้อมูลโครงการ",
      "ผู้บริหารที่ต้องการเข้าใจ ROI ก่อนตัดสินใจ",
      "ผู้สนใจระบบ AI Energy Management ของ SIRINX",
    ],
    featuresTitle: "คำถามหลักที่ควรรู้ก่อนเริ่ม",
    features: [
      "Solar Carport ใช้พื้นที่จอดรถผลิตไฟได้อย่างไร",
      "ลดค่าไฟ 30-100% เป็นไปได้ในเงื่อนไขใด",
      "Dynamic ROI ใช้ข้อมูลอะไร",
      "AI Energy Management ช่วยทีมปฏิบัติการอย่างไร",
    ],
    faqs: [
      {
        question: "SIRINX ลดค่าไฟได้เท่าไร?",
        answer:
          "ช่วง 30-100% เป็นไปได้ในบางรูปแบบโครงการ โดยผลจริงขึ้นอยู่กับบิลไฟ load profile พื้นที่ติดตั้ง tariff และการใช้ไฟจากโซลาร์ในสถานที่จริง",
      },
      {
        question: "คืนทุนเฉลี่ยกี่ปี?",
        answer:
          "หลายกรณีสามารถประเมินในช่วงประมาณ 3-6 ปี แต่ต้องใช้ข้อมูลบิลไฟ ขนาดระบบ รูปแบบลงทุน และต้นทุนติดตั้งจริงในการคำนวณ",
      },
      {
        question: "Solar Carport ต่างจาก Rooftop Solar อย่างไร?",
        answer:
          "Solar Carport ใช้พื้นที่จอดรถเป็นโครงสร้างผลิตไฟและให้ร่มเงา ส่วน Rooftop Solar ใช้พื้นที่หลังคาอาคาร ทั้งสองแบบสามารถออกแบบร่วมกันได้",
      },
      {
        question: "ต้องติด BESS ทุกโครงการไหม?",
        answer:
          "ไม่จำเป็น BESS เหมาะกับโครงการที่ต้องการจัดการ peak load สำรองไฟ หรือเพิ่มความยืดหยุ่นของระบบ โดยต้องดูความคุ้มค่าจากข้อมูลจริง",
      },
      {
        question: "เริ่มประเมินกับ SIRINX ต้องทำอย่างไร?",
        answer:
          "ส่งบิลไฟย้อนหลัง ข้อมูลพื้นที่ และพิกัดหน้างาน จากนั้นทีม SIRINX จะประเมินขนาดระบบ แนวทางติดตั้ง และ ROI เบื้องต้น",
      },
    ],
    links: [
      { label: "Solar Carport", href: "/solar-carport" },
      { label: "Dynamic ROI", href: "/features/dynamic-roi" },
      { label: "ติดต่อทีมงาน", href: "/contact" },
    ],
    lastUpdated: "2026-05-17",
  },
  glossary: {
    id: "glossary",
    path: "/glossary",
    h1: "Glossary คำศัพท์ Solar และ AI Energy ของ SIRINX",
    directAnswer:
      "Glossary นี้อธิบายคำศัพท์สำคัญของระบบพลังงาน เช่น Solar Carport, Rooftop Solar, BESS, EV Charger, Load Profile, Dynamic ROI และ Predictive Maintenance เพื่อช่วยให้ทีมธุรกิจคุยกับทีมวิศวกรได้ชัดขึ้น",
    summary:
      "คำศัพท์ถูกเขียนแบบใช้งานจริงสำหรับผู้บริหารและทีมปฏิบัติการ ไม่ใช่พจนานุกรมเทคนิคเต็มรูปแบบ",
    facts: [
      { label: "จำนวนคำเริ่มต้น", value: "12 คำหลัก" },
      { label: "ภาษา", value: "Thai-first พร้อมคำอังกฤษที่ใช้จริงในอุตสาหกรรม" },
      { label: "เป้าหมาย", value: "ลดความคลาดเคลื่อนก่อนประเมินและออกแบบระบบ" },
      { label: "อัปเดต", value: "เพิ่มคำได้ตามบริการและคำถามลูกค้า" },
    ],
    problem:
      "คำศัพท์พลังงานและ AI มักถูกใช้ปะปนกัน ทำให้ลูกค้าและทีมเทคนิคเข้าใจขอบเขตไม่ตรงกัน",
    solution:
      "SIRINX จัดคำศัพท์หลักให้อ่านง่าย พร้อมอธิบายว่าคำเหล่านี้เกี่ยวกับการออกแบบ ติดตั้ง และบริหารระบบพลังงานอย่างไร",
    audienceTitle: "เหมาะกับใคร",
    audience: [
      "ผู้บริหารที่ต้องอ่าน proposal โซลาร์",
      "ทีมจัดซื้อที่เปรียบเทียบผู้ให้บริการ",
      "ทีม facility ที่ต้องคุยกับวิศวกร",
      "ลูกค้าที่ต้องการเข้าใจระบบก่อนเริ่ม assessment",
    ],
    featuresTitle: "หมวดคำศัพท์ที่ครอบคลุม",
    features: [
      "โครงสร้างโซลาร์และอุปกรณ์",
      "ข้อมูลไฟฟ้าและการใช้งาน",
      "ROI และการเงินโครงการ",
      "AI Energy และ maintenance workflow",
    ],
    terms: [
      { term: "Solar Carport", meaning: "หลังคาจอดรถพลังงานแสงอาทิตย์ที่ผลิตไฟ ให้ร่มเงา และรองรับการติดตั้ง EV Charger ได้" },
      { term: "Rooftop Solar", meaning: "ระบบโซลาร์เซลล์ที่ติดตั้งบนหลังคาอาคารเพื่อลดการซื้อไฟจากโครงข่าย" },
      { term: "BESS", meaning: "Battery Energy Storage System ระบบกักเก็บพลังงานสำหรับจัดการโหลด สำรองไฟ หรือใช้ไฟในช่วงที่เหมาะสม" },
      { term: "EV Charger", meaning: "เครื่องชาร์จรถยนต์ไฟฟ้าที่สามารถออกแบบให้ใช้ไฟจากโซลาร์หรือ BESS ร่วมกันได้" },
      { term: "AI Energy Management", meaning: "ระบบวิเคราะห์และจัดการข้อมูลพลังงานด้วย AI หรือ rule-based workflow เพื่อช่วยตัดสินใจ" },
      { term: "Load Profile", meaning: "รูปแบบการใช้ไฟฟ้าของอาคารหรือธุรกิจในแต่ละช่วงเวลา" },
      { term: "Peak Load", meaning: "ช่วงที่ใช้ไฟสูงสุด ซึ่งมักมีผลต่อต้นทุนค่าไฟของธุรกิจ" },
      { term: "Dynamic ROI", meaning: "การคำนวณคืนทุนที่อัปเดตตามข้อมูลค่าไฟ การผลิตไฟ และการใช้ไฟจริง" },
      { term: "Predictive Maintenance", meaning: "การวิเคราะห์ข้อมูลเพื่อจับสัญญาณผิดปกติก่อนเกิดปัญหาใหญ่" },
      { term: "O&M", meaning: "Operation and Maintenance การดูแลระบบหลังติดตั้งให้ทำงานต่อเนื่องและมีประสิทธิภาพ" },
      { term: "Self-consumption", meaning: "สัดส่วนไฟจากโซลาร์ที่ถูกใช้ภายในสถานที่ทันที ยิ่งสูงยิ่งช่วยเพิ่มความคุ้มค่า" },
      { term: "kWp / kWh", meaning: "kWp คือขนาดกำลังติดตั้งของระบบ ส่วน kWh คือพลังงานที่ผลิตหรือใช้จริง" },
    ],
    faqs: [
      {
        question: "ทำไมต้องเข้าใจ Load Profile ก่อนติดโซลาร์?",
        answer:
          "เพราะระบบที่ผลิตไฟได้ดีอาจยังไม่คุ้มที่สุด ถ้าเวลาผลิตไฟไม่ตรงกับเวลาที่ธุรกิจใช้ไฟ",
      },
      {
        question: "BESS จำเป็นกับ Solar Carport หรือไม่?",
        answer:
          "ไม่จำเป็นทุกโครงการ แต่ BESS ช่วยเพิ่มความยืดหยุ่นเมื่อมี peak load, EV Charger หรือความต้องการสำรองไฟ",
      },
      {
        question: "Dynamic ROI ต้องใช้ข้อมูลอะไร?",
        answer:
          "ใช้ข้อมูลค่าไฟ ผลิตไฟ ใช้ไฟ tariff ขนาดระบบ ต้นทุน และเหตุการณ์ของระบบ เช่น downtime หรือ maintenance",
      },
    ],
    links: [
      { label: "SIRINX GOD AI", href: "/sirinx-god-ai" },
      { label: "AI Load Control", href: "/features/ai-load-control" },
      { label: "FAQ", href: "/faq" },
    ],
    lastUpdated: "2026-05-17",
  },
};
