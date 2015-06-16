import LoginForm from './forms/login';
import CreateAccountForm from './forms/create_account';
import EditAccountForm from './forms/edit_account';
import AddressForm from './forms/address';

export default {
    login: new LoginForm(),
    create_account: new CreateAccountForm(),
    edit_account: new EditAccountForm(),
    address: new AddressForm()
};
