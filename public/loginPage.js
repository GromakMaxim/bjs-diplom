let loginController = (data) => {
    ApiConnector.login({ login: data.login, password: data.password }, response => {
        (response.success && response.userId != null) ? location.reload(): console.warn("wtf? idont know you! get the hell outta here!");
    });
};

let rigistrationController = (data) => {
    ApiConnector.register({ login: data.login, password: data.password }, response => {
        (response.success && response.userId != null) ? location.reload(): console.warn("wtf? ur data isn't valid.");
        console.log(response);
    });
}

let userForm = new UserForm();

userForm.loginFormCallback = loginController;
userForm.registerFormCallback = rigistrationController;