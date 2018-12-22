
import Hoa_PhượngSound from './hoa_phuong.mp3'
import Hoa_tulipSound from './hoa_tulip.mp3'
import Hoa_râm_bụtSound from './hoa_ram_but.mp3'
import Hoa_thuỷ_tiênSound from './hoa_thuy_tien.mp3'
import Hoa_cẩm_tú_cầuSound from './hoa_cam_tu_cau.mp3'
import Hoa_bằng_lăngSound from './hoa_bang_lang.mp3'
import Hoa_bướmSound from './hoa_buom.mp3'
import Hoa_cúcSound from './hoa_cuc.mp3'

import Vịnh_Hạ_LongSound from './vinh_ha_long.mp3'
import Lăng_BácSound from './lang_bac.mp3'
// import Hoàng_thành_HuếSound from './hoang_thanh_hue.mp3'
import Nhà_thờ_Đức_BàSound from './nha_tho_duc_ba.mp3'
import Cầu_rồng_Đà_NẵngSound from './cau_rong_da_nang.mp3'
import Chùa_Một_CộtSound from './chua_mot_cot.mp3'

import Hoa_PhượngW from './w_Hoa_Phượng.png'
import Hoa_tulipW from './w_Hoa_tulip.png'
import Hoa_râm_bụtW from './w_Hoa_râm_bụt.png'
// import Hoa_bồ_công_anhW from './w_Hoa_bồ_công_anh.png'
// import Hoa_cẩm_chướngW from './w_Hoa_cẩm_chướng.png'
import Hoa_thuỷ_tiênW from './w_Hoa_thuỷ_tiên.png'
import Hoa_cẩm_tú_cầuW from './w_Hoa_cẩm_tú_cầu.png'
import Hoa_bằng_lăngW from './w_Hoa_bằng_lăng.png'
import Hoa_bướmW from './w_Hoa_bướm.png'
import Hoa_cúcW from './w_Hoa_cúc.png'

import Hoa_PhượngI from './i_Hoa_Phượng.png'
import Hoa_tulipI from './i_Hoa_tulip.png'
import Hoa_râm_bụtI from './i_Hoa_râm_bụt.png'
// import Hoa_bồ_công_anhI from './i_Hoa_bồ_công_anh.png'
// import Hoa_cẩm_chướngI from './i_Hoa_cẩm_chướng.png'
import Hoa_thuỷ_tiênI from './i_Hoa_thuỷ_tiên.png'
import Hoa_cẩm_tú_cầuI from './i_Hoa_cẩm_tú_cầu.png'
import Hoa_bằng_lăngI from './i_Hoa_bằng_lăng.png'
import Hoa_bướmI from './i_Hoa_bướm.png'
import Hoa_cúcI from './i_Hoa_cúc.png'
import Vịnh_Hạ_LongI from './i_Vịnh_Hạ_Long.png'
import Lăng_BácI from './i_Lăng_Bác.png'
// import Hoàng_thành_HuếI from './i_Hoàng_thành_Huế.png'
import Nhà_thờ_Đức_BàI from './i_Nhà_thờ_Đức_Bà.png'
import Cầu_rồng_Đà_NẵngI from './i_Cầu_rồng_Đà_Nẵng.png'
import Chùa_Một_CộtI from './i_Chùa_Một_Cột.png'

const assetSpec = {
  assetScaleBy: 'height',
  assetScale: 4,
  assetScaleBase: 320,
  assetWidth: 512,
  assetHeight: 320,
  assetCollection: [
    { key: 'Hoa_PhượngI', asset: Hoa_PhượngI },
    { key: 'Hoa_tulipI', asset: Hoa_tulipI },
    { key: 'Hoa_râm_bụtI', asset: Hoa_râm_bụtI },
    // { key: 'Hoa_bồ_công_anhI', asset: Hoa_bồ_công_anhI },
    // { key: 'Hoa_cẩm_chướngI', asset: Hoa_cẩm_chướngI },
    { key: 'Hoa_thuỷ_tiênI', asset: Hoa_thuỷ_tiênI },
    { key: 'Hoa_cẩm_tú_cầuI', asset: Hoa_cẩm_tú_cầuI },
    { key: 'Hoa_bằng_lăngI', asset: Hoa_bằng_lăngI },
    { key: 'Hoa_bướmI', asset: Hoa_bướmI },
    { key: 'Hoa_cúcI', asset: Hoa_cúcI },
    { key: 'Hoa_PhượngW', asset: Hoa_PhượngW },
    { key: 'Hoa_tulipW', asset: Hoa_tulipW },
    { key: 'Hoa_râm_bụtW', asset: Hoa_râm_bụtW },
    // { key: 'Hoa_bồ_công_anhW', asset: Hoa_bồ_công_anhW },
    // { key: 'Hoa_cẩm_chướngW', asset: Hoa_cẩm_chướngW },
    { key: 'Hoa_thuỷ_tiênW', asset: Hoa_thuỷ_tiênW },
    { key: 'Hoa_cẩm_tú_cầuW', asset: Hoa_cẩm_tú_cầuW },
    { key: 'Hoa_bằng_lăngW', asset: Hoa_bằng_lăngW },
    { key: 'Hoa_bướmW', asset: Hoa_bướmW },
    { key: 'Hoa_cúcW', asset: Hoa_cúcW },
    { key: 'Vịnh_Hạ_LongI', asset: Vịnh_Hạ_LongI },
    { key: 'Lăng_BácI', asset: Lăng_BácI },
    // { key: 'Hoàng_thành_HuếI', asset: Hoàng_thành_HuếI },
    { key: 'Nhà_thờ_Đức_BàI', asset: Nhà_thờ_Đức_BàI },
    { key: 'Cầu_rồng_Đà_NẵngI', asset: Cầu_rồng_Đà_NẵngI },
    { key: 'Chùa_Một_CộtI', asset: Chùa_Một_CộtI },
  ],

  soundCollection: [
    { key: 'Hoa_Phượng', asset: Hoa_PhượngSound },
    { key: 'Hoa_tulip', asset: Hoa_tulipSound },
    { key: 'Hoa_râm_bụt', asset: Hoa_râm_bụtSound },
    // { key: 'Hoa_bồ_công_anh', asset: xSound },
    // { key: 'Hoa_cẩm_chướng', asset: xSound },
    { key: 'Hoa_thuỷ_tiên', asset: Hoa_thuỷ_tiênSound },
    { key: 'Hoa_cẩm_tú_cầu', asset: Hoa_cẩm_tú_cầuSound },
    { key: 'Hoa_bằng_lăng', asset: Hoa_bằng_lăngSound },
    { key: 'Hoa_bướm', asset: Hoa_bướmSound },
    { key: 'Hoa_cúc', asset: Hoa_cúcSound },
    { key: 'Vịnh_Hạ_Long', asset: Vịnh_Hạ_LongSound },
    { key: 'Lăng_Bác', asset: Lăng_BácSound },
    { key: 'Nhà_thờ_Đức_Bà', asset: Nhà_thờ_Đức_BàSound },
    // { key: 'Hoàng_thành_Huế', asset: Hoàng_thành_HuếSound},
    { key: 'Cầu_rồng_Đà_Nẵng', asset: Cầu_rồng_Đà_NẵngSound},
    { key: 'Chùa_Một_Cột', asset: Chùa_Một_CộtSound},
  ]
}

export default assetSpec
