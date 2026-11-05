/**
 * BÀI VIẾT MẪU (isDemo: true) – nội dung kiến thức chung, hiển thị nhãn "Nội dung mẫu"
 * cho đến khi doanh nghiệp cung cấp bài viết chính thức.
 */
const im = (n) => `/images/products/p${String(n).padStart(2, '0')}.webp`

export const newsCategories = [
  { id: 'woodworking', name: { vi: 'Kiến thức máy chế biến gỗ', en: 'Woodworking machinery' } },
  { id: 'technology', name: { vi: 'Công nghệ sản xuất', en: 'Production technology' } },
  { id: 'conveyor', name: { vi: 'Băng tải công nghiệp', en: 'Industrial conveyors' } },
  { id: 'mechanical', name: { vi: 'Thiết bị cơ khí', en: 'Mechanical equipment' } },
  { id: 'company', name: { vi: 'Tin tức doanh nghiệp', en: 'Company news' } },
]

const A = (o) => ({ isDemo: true, ...o })

export const news = [
  {
    // Bài viết THẬT – nguồn: hoaphuco.com.vn/tin-tuc/26 (ngày đăng theo website gốc)
    isDemo: false,
    slug: 'cong-ty-tnhh-co-khi-hoa-phu-tuyen-dung-lao-dong',
    category: 'company',
    date: '2015-07-18',
    image: im(2),
    title: { vi: 'Công ty TNHH Cơ Khí Hoà Phú – Tuyển dụng lao động', en: 'Hoa Phu Mechanical Co., Ltd – Recruitment' },
    excerpt: { vi: 'Tuyển thợ hàn, vận hành máy tiện – phay – bào, máy CNC, máy dập hơi, nhân viên thiết kế và sửa chữa bảo trì máy chế biến gỗ.', en: 'Hiring welders, lathe/milling/planing operators, CNC operators, press operators, designers and woodworking machine maintenance staff.' },
    body: [
      { t: 'p', vi: 'Hiện nay năm 2025, công ty cần tuyển người lao động có kinh nghiệm gia công chế tạo, sinh viên thực tập, học nghề.', en: 'In 2025 we are hiring experienced fabrication workers, interns and apprentices.' },
      { t: 'h2', vi: 'Vị trí tuyển dụng', en: 'Open positions' },
      { t: 'ul', vi: ['Nhân viên hàn que, hàn MIG, hàn TIG, hàn laser: 5 người', 'Nhân viên vận hành máy tiện cơ, phay cơ, bào cơ: 3 người', 'Nhân viên vận hành máy tiện CNC, phay CNC, uốn ống CNC, cắt laser CNC, chấn CNC: 6 người', 'Nhân viên vận hành máy dập hơi: 5 người', 'Nhân viên thiết kế: 2 người – sử dụng thành thạo AutoCAD, Mastercam, Creo (ProE)', 'Sửa chữa, bảo trì máy chế biến gỗ'], en: ['Stick, MIG, TIG and laser welders: 5', 'Manual lathe, milling and planing operators: 3', 'CNC lathe, CNC milling, CNC tube bending, CNC laser cutting, CNC press brake operators: 6', 'Pneumatic press operators: 5', 'Designers: 2 – proficient in AutoCAD, Mastercam, Creo (ProE)', 'Woodworking machine repair & maintenance'] },
      { t: 'h2', vi: 'Hồ sơ bao gồm', en: 'Application documents' },
      { t: 'ul', vi: ['CMND (sao y)', 'Sổ hộ khẩu, KT3, tạm trú tạm vắng (sao y)', 'Giấy khám sức khỏe (do cơ quan y tế có thẩm quyền)', 'Văn bằng liên quan', 'Hồ sơ kinh nghiệm (nếu có)', 'Hồ sơ thôi việc ở nơi làm việc gần nhất'], en: ['ID card (certified copy)', 'Household registration / residence documents (certified copy)', 'Health certificate', 'Relevant qualifications', 'Work experience (if any)', 'Termination documents from the latest employer'] },
      { t: 'p', vi: 'Làm việc tại nhà máy ở Tân Ba. Mọi chi tiết xin liên hệ qua email công ty: maychebiengohoaphu@gmail.com hoặc hotline 0913 813 412.', en: 'Work location: our factory in Tan Ba. For details please email maychebiengohoaphu@gmail.com or call 0913 813 412.' },
    ],
  },
  A({
    slug: 'kien-thuc-co-ban-ve-may-che-bien-go',
    category: 'woodworking',
    date: '2026-10-20',
    image: im(0),
    featured: true,
    title: { vi: 'Kiến thức cơ bản về các nhóm máy chế biến gỗ trong nhà xưởng', en: 'A primer on woodworking machine groups in the workshop' },
    excerpt: { vi: 'Tổng quan các nhóm máy theo công đoạn: xẻ – bào – ghép – chà nhám – hoàn thiện, giúp doanh nghiệp hình dung luồng sản xuất.', en: 'An overview of machines by stage – sawing, planing, clamping, sanding, finishing – to map your production flow.' },
    body: [
      { t: 'p', vi: 'Một xưởng chế biến gỗ thường được tổ chức theo chuỗi công đoạn. Mỗi công đoạn cần nhóm thiết bị riêng, và việc lựa chọn đúng thiết bị giúp luồng sản xuất thông suốt hơn.', en: 'A wood workshop is usually organised as a chain of stages. Each stage needs its own equipment group, and choosing the right machines keeps the flow smooth.' },
      { t: 'h2', vi: '1. Công đoạn tạo phôi', en: '1. Stock preparation' },
      { t: 'p', vi: 'Máy cưa rong, cưa cắt ngang và cưa vòng dùng để xẻ, rong và cắt phôi theo kích thước sơ bộ.', en: 'Rip saws, cross-cut saws and band saws cut and rip stock to rough dimensions.' },
      { t: 'h2', vi: '2. Công đoạn định hình', en: '2. Shaping' },
      { t: 'p', vi: 'Máy bào, máy phay mộng, tupi và máy CNC giúp tạo bề mặt phẳng, biên dạng và mộng liên kết.', en: 'Planers, tenoners, spindle moulders and CNC routers create flat faces, profiles and joints.' },
      { t: 'img', src: im(21), vi: 'Máy bào 4 mặt – ảnh thiết bị Hoà Phú', en: 'Four-side moulder – Hoa Phu equipment photo' },
      { t: 'h3', vi: 'Lưu ý khi lựa chọn', en: 'Selection notes' },
      { t: 'ul', vi: ['Xác định loại gỗ và kích thước phôi', 'Xác định sản lượng mong muốn', 'Đánh giá mặt bằng và nguồn điện nhà xưởng'], en: ['Define wood species and stock size', 'Define target output', 'Assess floor space and power supply'] },
      { t: 'h2', vi: '3. Ghép và hoàn thiện', en: '3. Jointing and finishing' },
      { t: 'p', vi: 'Máy ghép, máy ép, máy chà nhám và máy sấy UV phục vụ ghép tấm và hoàn thiện bề mặt trước khi đóng gói.', en: 'Clamp carriers, presses, sanders and UV dryers handle panel jointing and surface finishing before packing.' },
    ],
  }),
  A({
    slug: 'giai-phap-bang-tai-cong-nghiep',
    category: 'conveyor',
    date: '2026-10-08',
    image: null,
    placeholder: 'conveyor',
    title: { vi: 'Giải pháp băng tải công nghiệp: chọn loại băng theo vật liệu', en: 'Industrial conveyors: choosing the belt by material' },
    excerpt: { vi: 'So sánh tổng quan băng tải con lăn, PVC, cao su, xích, Kevlar và lưới inox theo đặc tính vật liệu vận chuyển.', en: 'A general comparison of roller, PVC, rubber, chain, Kevlar and stainless mesh conveyors by conveyed material.' },
    body: [
      { t: 'p', vi: 'Mỗi loại băng tải phù hợp với một nhóm vật liệu và môi trường vận hành khác nhau.', en: 'Each conveyor type suits a different material group and operating environment.' },
      { t: 'h2', vi: 'Băng tải con lăn', en: 'Roller conveyors' },
      { t: 'p', vi: 'Thường dùng cho tấm, kiện hàng có đáy phẳng, dễ kết nối giữa các máy trong dây chuyền.', en: 'Common for flat-bottomed panels and packages, easy to link between machines.' },
      { t: 'h2', vi: 'Băng tải PVC và cao su', en: 'PVC and rubber belts' },
      { t: 'p', vi: 'Bề mặt liền giúp vận chuyển vật liệu nhỏ, rời hoặc cần độ bám nhất định.', en: 'A continuous surface carries small or loose items, or items needing grip.' },
      { t: 'h2', vi: 'Băng tải Kevlar và lưới inox', en: 'Kevlar and stainless mesh belts' },
      { t: 'p', vi: 'Được cân nhắc cho các công đoạn có nhiệt độ cao như sấy, hoặc yêu cầu thoát nhiệt, thoát nước.', en: 'Considered for high-temperature stages such as curing, or where heat and water must drain.' },
    ],
  }),
  A({
    slug: 'lua-chon-thiet-bi-cho-day-chuyen-san-xuat',
    category: 'technology',
    date: '2026-09-25',
    image: im(12),
    title: { vi: 'Lựa chọn thiết bị cho dây chuyền sản xuất ván ghép', en: 'Selecting equipment for an edge-glued panel line' },
    excerpt: { vi: 'Các bước cân nhắc khi bổ sung thiết bị cho dây chuyền finger và ghép tấm.', en: 'Steps to consider when adding equipment to finger-jointing and panel lines.' },
    body: [
      { t: 'p', vi: 'Dây chuyền ván ghép gồm nhiều công đoạn liên tiếp. Thiết bị mới cần tương thích với nhịp sản xuất của các công đoạn trước và sau.', en: 'An edge-glued panel line has consecutive stages. New equipment must match the pace of upstream and downstream stages.' },
      { t: 'h2', vi: 'Xác định điểm nghẽn', en: 'Identify the bottleneck' },
      { t: 'p', vi: 'Đánh giá công đoạn đang làm chậm toàn bộ dây chuyền trước khi đầu tư thêm thiết bị.', en: 'Find the stage that slows the whole line before investing in more equipment.' },
      { t: 'h2', vi: 'Tham khảo tư vấn', en: 'Seek advice' },
      { t: 'p', vi: 'Liên hệ Hoà Phú để trao đổi về thiết bị phù hợp với hiện trạng nhà máy.', en: 'Contact Hoa Phu to discuss equipment that fits your current plant.' },
    ],
  }),
  A({
    slug: 'bao-tri-may-cha-nham-thung',
    category: 'woodworking',
    date: '2026-09-10',
    image: im(34),
    title: { vi: 'Những điểm cần kiểm tra định kỳ trên máy chà nhám thùng', en: 'Routine checks for wide belt sanders' },
    excerpt: { vi: 'Danh sách kiểm tra cơ bản giúp máy chà nhám vận hành ổn định.', en: 'A basic checklist to keep wide belt sanders running steadily.' },
    body: [
      { t: 'p', vi: 'Kiểm tra định kỳ giúp phát hiện sớm hao mòn và duy trì chất lượng bề mặt.', en: 'Routine checks reveal wear early and maintain surface quality.' },
      { t: 'ul', vi: ['Tình trạng băng nhám', 'Hệ thống hút bụi', 'Băng tải nạp phôi', 'Hệ thống khí nén'], en: ['Abrasive belt condition', 'Dust extraction', 'Infeed conveyor', 'Compressed air system'] },
      { t: 'p', vi: 'Hướng dẫn chi tiết theo từng model vui lòng tham khảo tài liệu nhà sản xuất hoặc liên hệ Hoà Phú.', en: 'For model-specific guidance, consult the manufacturer documentation or contact Hoa Phu.' },
    ],
  }),
  A({
    slug: 'vai-tro-may-nen-khi-trong-nha-may-go',
    category: 'mechanical',
    date: '2026-08-28',
    image: im(39),
    title: { vi: 'Vai trò của máy nén khí trong nhà máy chế biến gỗ', en: 'The role of air compressors in a wood plant' },
    excerpt: { vi: 'Khí nén cung cấp năng lượng cho xi lanh, súng phun sơn và nhiều thiết bị khác trong xưởng.', en: 'Compressed air powers cylinders, spray guns and many other workshop devices.' },
    body: [
      { t: 'p', vi: 'Nhiều máy chế biến gỗ sử dụng khí nén cho cơ cấu kẹp, đẩy và điều khiển.', en: 'Many woodworking machines use compressed air for clamping, pushing and control.' },
      { t: 'h2', vi: 'Máy sấy khí', en: 'Air dryers' },
      { t: 'p', vi: 'Máy sấy khí giúp giảm hơi ẩm trong đường ống, hỗ trợ thiết bị phía sau hoạt động ổn định.', en: 'Air dryers reduce moisture in the lines, helping downstream equipment run reliably.' },
    ],
  }),
  A({
    slug: 'hoa-phu-tham-gia-trien-lam',
    category: 'company',
    date: '2026-08-12',
    image: im(12),
    title: { vi: 'Hình ảnh Hoà Phú tại gian hàng triển lãm thiết bị', en: 'Hoa Phu at an equipment exhibition booth' },
    excerpt: { vi: 'Một số hình ảnh gian hàng trưng bày thiết bị của Hoà Phú. (Thời gian, địa điểm cần bổ sung.)', en: 'Photos of Hoa Phu’s equipment booth. (Date and venue to be added.)' },
    body: [
      { t: 'p', vi: 'Hình ảnh gian hàng trưng bày thiết bị. Thông tin chi tiết về sự kiện sẽ được cập nhật khi doanh nghiệp cung cấp.', en: 'Photos of the equipment booth. Event details will be added once provided by the company.' },
      { t: 'img', src: im(2), vi: 'Máy ghép gỗ tại khu trưng bày', en: 'Clamp carrier on display' },
    ],
  }),
]

export const getArticle = (slug) => news.find((n) => n.slug === slug)
