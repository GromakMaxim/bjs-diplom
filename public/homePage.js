function doExit() {
    ApiConnector.logout((response) => {
        if (response != null) location.reload();
    });
}

let exit = new LogoutButton();
exit.action = doExit;

function getUserData(response) {
    (response.success) ? ProfileWidget.showProfile(response.data): console.error("cant find such user");
}


ApiConnector.current(getUserData);

let board = new RatesBoard();

function getCurrentExchangeRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            board.clearTable();
            board.fillTable(response.data);
        }
    });
}
setInterval(getCurrentExchangeRates, 1000);

function addMoney(data) {
    ApiConnector.addMoney({ currency: data.currency, amount: data.amount }, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Modey successfully added");
        } else {
            moneyManager.setMessage(false, "Idn what happened! Money didn't added!");
        }
    })
}

function convertMoney(data) {
    ApiConnector.convertMoney({ fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount }, (response) => {
        if (response != null) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Modey successfully converted");
        } else {
            moneyManager.setMessage(false, "Idn what happened! Money didn't converted!");
        }
    })
}

function transferMoney(data) {
    ApiConnector.transferMoney({ to: data.to, currency: data.currency, amount: data.amount }, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Transfer completed successfully");
        } else {
            moneyManager.setMessage(false, "Idn what happened! Transfer failed.");
        }
    })
}

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = addMoney;
moneyManager.conversionMoneyCallback = convertMoney;
moneyManager.sendMoneyCallback = transferMoney;

let favourites = new FavoritesWidget();

ApiConnector.getFavorites((data) => {
    if (data.success) {
        favourites.clearTable();
        favourites.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
    }
});


function addUser(data) {
    ApiConnector.addUserToFavorites({ id: data.id, name: data.name }, (response) => {
        if (response.success) {
            favourites.clearTable();
            favourites.fillTable(response.data);
            moneyManager.setMessage(true, "New user added!");
        } else {
            moneyManager.setMessage(false, "Cant add new user!");
        }
    })
}

function removeUser(data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favourites.clearTable();
            favourites.fillTable(response.data);
            moneyManager.setMessage(true, `User with id:${data} was removed`);
        } else {
            moneyManager.setMessage(false, "Cant remove such user!");
        }
    })
}

favourites.addUserCallback = addUser;
favourites.removeUserCallback = removeUser;