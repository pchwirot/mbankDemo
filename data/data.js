/* jshint strict: false, unused: false, quotmark:false */
/*globals $, setTimeout, window, console*/
var UserModel = {
    name: 'Piotr',
    surname: 'Chwirot',
    settings: {},
    accounts: [new Account('eKonto'), new Account('eMax')],
    messages: [],
    cards: [],
    addressBook: [],
    getAccounts: function() {
        var _this = this;
        var getAccountsTypes = function() {
            var i = 0;
            var accountsString = '';
            for (i; i < _this.accounts.length; i++) {
                accountsString += _this.accounts[i].getAccountType();
                if (i < _this.accounts.length - 1) {
                    accountsString += ' | ';
                }
            }
            return accountsString;
        }
        return {
            accounts: _this.accounts,
            getAccountsTypes: getAccountsTypes
        };
    }
};

function Account(type) {
    this.id = '#001';
    this.type = type;
    this.balance = '';
    this.history = [];
    this.limits = [];
}
Account.prototype.getAccountType = function() {
    return this.type;
}