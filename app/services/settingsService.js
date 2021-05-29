import BaseService from './baseService'

var settingsService = {
  getAllBankAccounts: () => {
    return BaseService.get('user/bank-accounts/')
  },

  addBankAccount: (data) => {
    return BaseService.post('user/bank-accounts/', data)
  },

  editBankAccount: (id, data) => {
    return BaseService.patch('user/bank-accounts/' + id + '/', data)
  },

  getAllBitcoinAddresses: () => {
    return BaseService.get('user/crypto-accounts/')
  },

  addBitcoinAddresses: (data) => {
    return BaseService.post('user/crypto-accounts/', data)
  },

  editBitcoinAddresses: (id, data) => {
    return BaseService.patch('user/crypto-accounts/' + id + '/', data)
  },

  getAllMobiles: () => {
    return BaseService.get('user/mobiles/')
  },

  addMobile: (data) => {
    return BaseService.post('user/mobiles/', data)
  },

  makeMobilePrimary: (id, data) => {
    return BaseService.patch('user/mobiles/' + id + '/', data)
  },

  verifyMobile: (otp) => {
    var data = {otp}
    return BaseService.post('auth/mobile/verify/', data)
  },

  resendMobileVerification: (data) => {
    return BaseService.post('auth/mobile/verify/resend/', data)
  },

  deleteMobile: (id) => {
    return BaseService.delete('user/mobiles/' + id + '/')
  },

  getAllEmails: () => {
    return BaseService.get('user/emails/')
  },

  addEmail: (data) => {
    return BaseService.post('user/emails/', data)
  },

  makeEmailPrimary: (id, data) => {
    return BaseService.patch('user/emails/' + id + '/', data)
  },

  resendEmailVerification: (data) => {
    return BaseService.post('auth/email/verify/resend/', data)
  },

  deleteEmail: (id) => {
    return BaseService.delete('user/emails/' + id + '/')
  },

  getAllNotifications: () => {
    return BaseService.get('user/notifications/')
  },

  changeStateOfNotification: (id, data) => {
    return BaseService.patch('user/notifications/' + id + '/', data)
  },

  documentUpload: (file, type) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('document_category', type)
    formData.append('document_type', type)
    return BaseService.documentUpload('user/documents/', formData)
  },
}

export default settingsService
