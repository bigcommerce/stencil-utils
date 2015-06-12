import AddressForm from './address';

export default class extends AddressForm {
    /**
     * @Constructor
     */
    constructor() {

    }

    email(value) {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        return re.test(value);
    }

    password(value) {
        let r1 = /[A-Za-z]/,  // alphabetic
            r2 = /[0-9]/;  // numeric

        if (!r1.test(value)) {
            return false;
        }

        if (!r2.test(value)) {
            return false;
        }

        return value.length >= 7;
    }

    passwordMatch(password1, password2) {
        return password1 === password2;
    }
}
