import BaseService from './baseService'

var transactionService = {

    getAllTransactionsByCurrecny: (code) => {
        return BaseService.get('transactions/?currency=' + code)
    },

    getAllTransactions: () => {
        return BaseService.get('transactions/')
    },

    getNextTransactions: (url) => {
        return BaseService.getWithFullUrl(url);
    },

    sendMoney: (amount, recipient, note, currency, debit_account) => {
        var data = {
            amount,
            recipient,
            note,
            currency,
            debit_account
        }
        return BaseService.post('transactions/transfer/', data)
    },

    withdraw: (amount, reference, currency) => {
        var data = {
            amount,
            reference,
            currency,
        }
        return BaseService.post('transactions/debit/', data)
    },
}

export default transactionService
