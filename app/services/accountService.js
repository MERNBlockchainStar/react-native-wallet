import BaseService from './baseService'

var AccountService = {
    getAllAccounts: () => {
        return BaseService.get('accounts/')
    },

    getMoreAccounts: (url) => {
        return BaseService.getWithFullUrl(url)
    },

    getAllAccountCurrencies: (reference) => {
        return BaseService.get('accounts/' + reference + '/currencies/')
    },
    getSelectedCurrency: (data) => {
        return BaseService.get('accounts/?currency=' + data)
    },

    getMoreAccountCurrencies: (url) => {
        return BaseService.getWithFullUrl(url)
    },

    setActiveCurrency: (reference, code) => {
        var data = {active: true}
        return BaseService.put('accounts/' + encodeURIComponent(reference) + '/currencies/' + code + '/', data)
    },
}

export default AccountService
