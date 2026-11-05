/**
 * CHƯA CÓ DỮ LIỆU DỰ ÁN ĐƯỢC XÁC NHẬN.
 * Mục này chỉ hiển thị HÌNH ẢNH HOẠT ĐỘNG & THIẾT BỊ thực tế của Hoà Phú
 * (không phải dự án khách hàng). Không tạo tên khách hàng / dự án.
 * Khi có dự án thật, thêm phần tử với `type: 'project'` và `client`, `location`, `content`.
 */
const im = (n) => `/images/products/p${String(n).padStart(2, '0')}.webp`

export const projectFields = [
  { id: 'woodworking-machinery', name: { vi: 'Máy chế biến gỗ', en: 'Woodworking Machinery' } },
  { id: 'production-lines', name: { vi: 'Dây chuyền sản xuất', en: 'Production Lines' } },
  { id: 'industrial-conveyors', name: { vi: 'Băng tải công nghiệp', en: 'Industrial Conveyors' } },
  { id: 'mechanical-engineering', name: { vi: 'Gia công cơ khí', en: 'Mechanical Engineering' } },
]

export const activities = [
  { id: 'a01', type: 'activity', field: 'woodworking-machinery', image: im(0), size: 'wide', title: { vi: 'Khu vực nhà xưởng & thiết bị', en: 'Workshop & equipment area' }, desc: { vi: 'Hình ảnh khu vực tập kết máy móc chế biến gỗ.', en: 'Woodworking machinery staging area.' } },
  { id: 'a02', type: 'activity', field: 'woodworking-machinery', image: im(12), size: 'tall', title: { vi: 'Gian hàng triển lãm', en: 'Exhibition booth' }, desc: { vi: 'Hoà Phú tham gia trưng bày thiết bị tại triển lãm.', en: 'Hoa Phu showcasing equipment at an exhibition.' } },
  { id: 'a04', type: 'activity', field: 'production-lines', image: im(7), size: 'normal', title: { vi: 'Thiết bị ghép finger', en: 'Finger-jointing equipment' }, desc: { vi: 'Thiết bị cho công đoạn ghép finger.', en: 'Equipment for finger-jointing.' } },
  { id: 'a05', type: 'activity', field: 'woodworking-machinery', image: im(2), size: 'tall', title: { vi: 'Trưng bày máy ghép gỗ', en: 'Clamp carrier display' }, desc: { vi: 'Máy ghép gỗ xoay tại khu trưng bày.', en: 'Rotary clamp carrier on display.' } },
  { id: 'a06', type: 'activity', field: 'woodworking-machinery', image: im(55), size: 'wide', title: { vi: 'Máy CNC nhiều đầu', en: 'Multi-head CNC router' }, desc: { vi: 'Thiết bị CNC tại khu vực kho máy.', en: 'CNC equipment at the machine yard.' } },
  { id: 'a07', type: 'activity', field: 'mechanical-engineering', image: im(14), size: 'normal', title: { vi: 'Bộ nguồn thủy lực', en: 'Hydraulic power unit' }, desc: { vi: 'Cụm van và bơm thủy lực.', en: 'Hydraulic valve and pump assembly.' } },
  { id: 'a08', type: 'activity', field: 'woodworking-machinery', image: im(49), size: 'normal', title: { vi: 'Máy chà nhám thùng', en: 'Wide belt sander' }, desc: { vi: 'Thiết bị chà nhám bề mặt.', en: 'Surface sanding equipment.' } },
  { id: 'a09', type: 'activity', field: 'production-lines', image: im(65), size: 'wide', title: { vi: 'Thiết bị ghép phôi dài', en: 'Long stock jointing equipment' }, desc: { vi: 'Thiết bị phục vụ ghép phôi chiều dài lớn.', en: 'Equipment for long stock jointing.' } },
  { id: 'a11', type: 'activity', field: 'woodworking-machinery', image: im(28), size: 'normal', title: { vi: 'Máy dán cạnh', en: 'Edge bander' }, desc: { vi: 'Máy dán cạnh tự động.', en: 'Automatic edge bander.' } },
  { id: 'a13', type: 'activity', field: 'woodworking-machinery', image: im(12), size: 'normal', title: { vi: 'Máy ghép gỗ tại triển lãm', en: 'Clamp carrier at an exhibition' }, desc: { vi: 'Thiết bị trưng bày tại gian hàng.', en: 'Equipment on display at the booth.' } },
  { id: 'a14', type: 'activity', field: 'production-lines', image: im(51), size: 'normal', title: { vi: 'Máy ép thủy lực', en: 'Hydraulic press' }, desc: { vi: 'Thiết bị ép cho công đoạn ghép tấm.', en: 'Press for panel laminating.' } },
]

export const partners = Array.from({ length: 33 }, (_, i) => `/images/partners/d${String(i).padStart(2, '0')}.webp`)
