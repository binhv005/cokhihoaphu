// Thông tin doanh nghiệp CHÍNH THỨC – chỉ chỉnh sửa khi doanh nghiệp xác nhận.
export const company = {
  name: 'CÔNG TY TNHH CƠ KHÍ HOÀ PHÚ',
  nameEn: 'HOA PHU MECHANICAL CO., LTD',
  brand: 'Hoà Phú',
  // Theo trang Liên hệ hoaphuco.com.vn (địa giới hành chính mới)
  address: '49/6 Đường số 14, Khu phố 3, Phường Thủ Đức, TP. Hồ Chí Minh.',
  businessAddress: '282 Tô Ngọc Vân, Phường Hiệp Bình, TP. Hồ Chí Minh.',
  factoryAddress: 'Khu phố Tân Ba, Phường Tân Đông Hiệp, TP. Hồ Chí Minh.',
  contactPerson: 'Nguyễn Ngọc Quỳnh',
  hotline: '0913 813 412',
  hotlineTel: '0913813412',
  email: 'maychebiengohoaphu@gmail.com',
  emailAlt: 'maychebiengohoaphu@yahoo.com',
  websites: ['www.hoaphuco.com.vn', 'www.cokhihoaphu.com', 'www.woodworkingmachine.com.vn', 'www.hoaphumachinery.com'],
  brandLine: 'HOA PHU MACHINERY Co.,Ltd',
  facebook: 'https://www.facebook.com/hoaphuco',
  messenger: 'https://m.me/hoaphuco', // Suy ra từ tên trang Facebook – cần xác nhận
  zalo: 'https://zalo.me/0913813412', // Link Zalo theo số hotline – cần xác nhận
  mapsLink: 'https://maps.app.goo.gl/Aspa2vVBo35gtCNp9',
  mapsEmbed:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('49/6 Đường số 14, Khu phố 3, Thủ Đức, Hồ Chí Minh') +
    '&z=16&output=embed',
  logo: '/images/logo.png',
}

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.hoaphuco.com.vn').replace(/\/$/, '')

// Lĩnh vực hoạt động (dùng ở About / Home)
export const fields = [
  { id: 'woodworking-machinery', no: '01', title: { vi: 'Cung cấp máy chế biến gỗ', en: 'Woodworking machinery supply' }, desc: { vi: 'Các dòng máy chế biến gỗ mới và đã qua sử dụng cho xưởng và nhà máy.', en: 'New and used woodworking machines for workshops and factories.' } },
  { id: 'production-lines', no: '02', title: { vi: 'Cung cấp dây chuyền sản xuất', en: 'Production line supply' }, desc: { vi: 'Dây chuyền ghép finger, sơn và sấy UV ván sàn, sơn tấm tự động.', en: 'Finger-jointing, UV coating & curing and automatic panel coating lines.' } },
  { id: 'industrial-conveyors', no: '03', title: { vi: 'Hệ thống băng tải công nghiệp', en: 'Industrial conveyor systems' }, desc: { vi: 'Băng tải con lăn, PVC, cao su, xích, Kevlar chịu nhiệt và lưới inox.', en: 'Roller, PVC, rubber, chain, heat-resistant Kevlar and stainless mesh conveyors.' } },
  { id: 'mechanical-engineering', no: '04', title: { vi: 'Gia công cơ khí', en: 'Mechanical engineering & machining' }, desc: { vi: 'Chi tiết máy, phụ kiện ngành gỗ, hộp giảm tốc, bộ nguồn thủy lực.', en: 'Machine parts, woodworking accessories, gearboxes, hydraulic power units.' } },
  { id: 'compressors-equipment', no: '05', title: { vi: 'Máy nén khí & thiết bị công nghiệp', en: 'Air compressors & industrial equipment' }, desc: { vi: 'Máy nén khí, máy sấy khí, máy hàn, máy cắt plasma, dụng cụ cầm tay FERM.', en: 'Air compressors, air dryers, welders, plasma cutters, FERM power tools.' } },
]
