# SIRINX Dual-Theme Conversion TODO

## Phase 1: ตรวจสอบและวางแผน
- [ ] ตรวจสอบไฟล์ที่มีอยู่ทั้งหมด
- [ ] วางแผน color mapping: Light (white/orange) vs Dark (navy/cyan/amber)

## Phase 2: CSS & Theme System
- [ ] ปรับ index.css — เพิ่ม :root (light) และ .dark CSS variables
- [ ] ปรับ ThemeProvider ให้ switchable
- [ ] เพิ่ม custom utility classes ที่ทำงานกับทั้ง 2 ธีม

## Phase 3: Layout
- [ ] ปรับ Navbar ให้ใช้ semantic colors แทน hardcoded oklch
- [ ] ปรับ Footer ให้ใช้ semantic colors
- [ ] เพิ่มปุ่ม theme toggle ใน Navbar
- [ ] โลโก้คงแบบเดิม (Cyan gradient + Zap icon) ทั้ง 2 โหมด

## Phase 4: Home Page
- [ ] แปลง hardcoded colors เป็น semantic classes

## Phase 5: About, Solutions, Industries
- [ ] แปลง About page
- [ ] แปลง Solutions page
- [ ] สร้าง Industries page (dual-theme)

## Phase 6: หน้าที่เหลือ
- [ ] Investment & Tax Hub
- [ ] Projects / Case Studies
- [ ] Blog / Insights + BlogPost
- [ ] Contact
- [ ] Solar Assessment
- [ ] Partner / Investor

## Phase 7: Polish
- [ ] ทดสอบ mobile responsiveness ทั้ง 2 ธีม
- [ ] ตรวจสอบ contrast ของ text ทั้ง 2 ธีม
