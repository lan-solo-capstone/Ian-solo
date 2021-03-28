'use strict'

const itemPhotos = [
  {
    id: 1,
    photoTitle: 'ibis_bike',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00y0y_k85pzQTBKgmz_09G07g_600x450.jpg',
    itemId: 1,
  },
  {
    id: 2,
    photoTitle: 'pan',
    CloudREF: '/images/pan.jfif',
    downloadURL:
      ' https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fpan.jfif?alt=media&token=75c2ea85-57ac-48c2-af08-69f83b9f9f0b,',
    itemId: 2,
  },
  {
    id: 3,
    photoTitle: 'stove',
    CloudREF: '/images/stove.jpg',
    downloadURL:
      ' https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fpan.jfif?alt=media&token=75c2ea85-57ac-48c2-af08-69f83b9f9f0b,',
    itemId: 2,
  },
  {
    id: 4,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 3,
  },
  {
    id: 5,
    photoTitle: 'watch',
    CloudREF: '/images/watch.jpg',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fwatch.jpg?alt=media&token=cb3cfdb2-bcda-44de-a289-c6eb1b8abf82',
    itemId: 4,
  },
  {
    id: 6,
    photoTitle: 'boots',
    CloudREF: '/images/boots.webp',
    downloadURL:
      'https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2Fboots.webp?alt=media&token=4cc149ba-2e57-4397-8a89-3d5c79a07c99,',
    itemId: 5,
  },
  {
    id: 7,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 6,
  },
  {
    id: 8,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 7,
  },
  {
    id: 9,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 8,
  },
  {
    id: 10,
    photoTitle: 'puppy.jpg',
    CloudREF: '',
    downloadURL:
      'https://images-na.ssl-images-amazon.com/images/I/81vkislowDL._AC_SL1500_.jpg',
    itemId: 9,
  },
  {
    id: 11,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00g0g_j3ZzaKfhpcHz_0t20CI_600x450.jpg',
    itemId: 10,
  },
  {
    id: 12,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00q0q_eKmFeTBdbnxz_0jm0ew_600x450.jpg',
    itemId: 11,
  },
  {
    id: 13,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00P0P_ehVzksTJSYvz_0jm0ew_600x450.jpg',
    itemId: 11,
  },
  {
    id: 14,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00I0I_7sHNozynFzVz_0jm0ew_600x450.jpg',
    itemId: 11,
  },
  {
    id: 15,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00Z0Z_1c7hUBPhPA2z_0jm0ew_600x450.jpg',
    itemId: 11,
  },
  {
    id: 16,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00V0V_9ldVTBr8XL1z_0jm0ew_600x450.jpg',
    itemId: 11,
  },
  {
    id: 17,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/01717_enOup0im5lTz_0t20CI_600x450.jpg',
    itemId: 12,
  },
  {
    id: 18,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00q0q_6BmTenyF6gXz_0t20CI_600x450.jpg',
    itemId: 12,
  },
  {
    id: 19,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00l0l_47Q9L2NzSQpz_0CI0t2_600x450.jpg',
    itemId: 13,
  },
  {
    id: 20,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00i0i_lLzukY5klXXz_06s038_600x450.jpg',
    itemId: 14,
  },
  {
    id: 21,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00k0k_cxRToPKcAZtz_05a03S_600x450.jpg',
    itemId: 15,
  },
  {
    id: 22,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00z0z_fQgozRvtzVLz_0t20CI_600x450.jpg',
    itemId: 16,
  },
  {
    id: 23,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00K0K_6ZggL1VfTV1z_0t20CI_600x450.jpg',
    itemId: 16,
  },
  {
    id: 24,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00T0T_bYocQlK8BJpz_0t20CI_600x450.jpg',
    itemId: 16,
  },
  {
    id: 25,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00l0l_52bcINB6sgoz_0CI0iL_600x450.jpg',
    itemId: 17,
  },
  {
    id: 26,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00h0h_jN8Pm1g5bObz_07K0ak_600x450.jpg',
    itemId: 18,
  },
  {
    id: 27,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/01212_i4s8lNpfl5Ez_0CI0t2_600x450.jpg',
    itemId: 19,
  },
  {
    id: 28,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00202_3Vd2LjO5tNrz_0i40ww_600x450.jpg',
    itemId: 20,
  },
  {
    id: 29,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00z0z_hFDx1JVbLIwz_0i40ww_600x450.jpg',
    itemId: 20,
  },
  {
    id: 30,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00s0s_1gneT7k3cRRz_0lM0t2_600x450.jpg',
    itemId: 21,
  },
  {
    id: 31,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/01616_hMIVD7e4u0u_0CI0iP_600x450.jpg',
    itemId: 22,
  },
  {
    id: 32,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00h0h_lafVWJ1CNRL_0CI0lM_600x450.jpg',
    itemId: 22,
  },
  {
    id: 33,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00h0h_lafVWJ1CNRL_0CI0lM_600x450.jpg',
    itemId: 22,
  },
  {
    id: 34,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00d0d_hZS6IL78NWzz_0t20CI_600x450.jpg',
    itemId: 23,
  },
  {
    id: 35,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00n0n_6rfL44at1qIz_0gw0b1_600x450.jpg',
    itemId: 24,
  },
  {
    id: 36,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00d0d_9ND2VEpAeYAz_0CI0hS_600x450.jpg',
    itemId: 25,
  },
  {
    id: 37,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00X0X_bc5haCP066Rz_0CI0hS_600x450.jpg',
    itemId: 25,
  },
  {
    id: 38,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00202_dRuI1anU4wOz_0CI0hS_600x450.jpg',
    itemId: 25,
  },
  {
    id: 39,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00Y0Y_ioIdCXHEEUm_0CI0t2_600x450.jpg',
    itemId: 26,
  },
  {
    id: 40,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 27,
  },
  {
    id: 41,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00000_yiktoNGNXSz_0CI0t2_600x450.jpg',
    itemId: 28,
  },
  {
    id: 42,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/01717_k6qZZAslGe1z_0t20t2_600x450.jpg',
    itemId: 29,
  },
  {
    id: 43,
    photoTitle: 'freeTree',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00000_du2vYCxHm7mz_0lM0t2_600x450.jpg',
    itemId: 30,
  },
  {
    id: 44,
    photoTitle: 'freeTree2',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00u0u_VSo0d5bRPqz_0lM0t2_600x450.jpg',
    itemId: 30,
  },
  {
    id: 45,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00000_hgzCG1V861sz_1320MM_600x450.jpg',
    itemId: 31,
  },
  {
    id: 46,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00d0d_960MPvhFynVz_07A07A_600x450.jpg',
    itemId: 31,
  },
  {
    id: 47,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00P0P_eA8DpBfp9tyz_0hK0CI_600x450.jpg',
    itemId: 32,
  },
  {
    id: 48,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00M0M_bwAGShHRws0z_0iK0jm_600x450.jpg',
    itemId: 33,
  },
  {
    id: 49,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00u0u_k1AXgVMUma9z_0lM0t2_600x450.jpg',
    itemId: 34,
  },
  {
    id: 50,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00c0c_as7xRwOalI5z_0t20lM_600x450.jpg',
    itemId: 34,
  },
  {
    id: 51,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00000_dlk127Llmm0z_0lM0t2_600x450.jpg//',
    itemId: 35,
  },
  {
    id: 52,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00R0R_1YygE0iURWfz_0lh0t2_600x450.jpg',
    itemId: 36,
  },
  {
    id: 53,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00h0h_73oBxg09NP9z_0CI0cR_600x450.jpg',
    itemId: 36,
  },
  {
    id: 54,
    photoTitle: '',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00W0W_lgdYrdaLMNuz_0CI0q8_600x450.jpg',
    itemId: 36,
  },
  {
    id: 55,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 37,
  },
  {
    id: 56,
    photoTitle: 'christmas1',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00K0K_b9ZvkarpIvN_0iu0as_600x450.jpg',
    itemId: 38,
  },
  {
    id: 57,
    photoTitle: 'christmas2',
    CloudREF: '',
    downloadURL: 'https://images.craigslist.org/00N0N_8mRxAFHxzvi_600x450.jpg',
    itemId: 38,
  },
  {
    id: 58,
    photoTitle: 'christmas3',
    CloudREF: '',
    downloadURL: 'https://images.craigslist.org/00Q0Q_cIxfY4F7GPI_600x450.jpg',
    itemId: 38,
  },
  {
    id: 59,
    photoTitle: 'tractor_wheel',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00m0m_1vonsG3xj9tz_0t20CI_600x450.jpg',
    itemId: 39,
  },
  {
    id: 60,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 40,
  },
  {
    id: 61,
    photoTitle: 'popcornCart',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00r0r_kl7E5VpMdqNz_04M07g_600x450.jpg',
    itemId: 41,
  },
  {
    id: 62,
    photoTitle: 'oil_sign',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00H0H_h0srSr7184Z_0hq0hq_600x450.jpg',
    itemId: 42,
  },
  {
    id: 63,
    photoTitle: 'oil_sign',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00404_bkvYTysoooy_0hq0hq_600x450.jpg',
    itemId: 42,
  },
  {
    id: 64,
    photoTitle: 'oil_sign',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00v0v_htuENLweWgX_0hq0hq_600x450.jpg',
    itemId: 42,
  },
  {
    id: 65,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 43,
  },
  {
    id: 66,
    photoTitle: 'restorationhardwareTable',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00J0J_dp52nNf2U2Xz_0dR08O_600x450.jpg',
    itemId: 44,
  },
  {
    id: 67,
    photoTitle: 'desk',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00p0p_a9NFBUxSOK9z_0i90iH_600x450.jpg',
    itemId: 45,
  },
  {
    id: 68,
    photoTitle: 'deskChair',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00n0n_4gk3bkHHcHAz_0i90hZ_600x450.jpg',
    itemId: 46,
  },
  {
    id: 69,
    photoTitle: 'IKEA_dresser',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00H0H_gy84YdgKSWSz_0CI0xj_600x450.jpg',
    itemId: 47,
  },
  {
    id: 70,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 48,
  },
  {
    id: 71,
    photoTitle: 'cameraAccessories',
    CloudREF: '',
    downloadURL:
      'https://images.craigslist.org/00r0r_3c91Tf8iDV0z_0t20CI_600x450.jpg',
    itemId: 49,
  },
  {
    id: 72,
    photoTitle: 'default.jpeg',
    CloudREF: '',
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/freeshare-7b345.appspot.com/o/images%2FfreeShareDefaultPic.jpeg?alt=media&token=5f6c8b0b-da4e-4138-b4fb-5c4fb4a4319c'",
    itemId: 50,
  },
]
module.exports = itemPhotos
