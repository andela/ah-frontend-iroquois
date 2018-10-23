import React, {Component} from 'react';
import {Row, Button} from 'react-materialize';
import styles from '../../../styles/signup.scss';
import PropTypes from 'prop-types';
import {emailValidation, field, generateInput} from "../../../utils/utils";
import {notify} from "react-notify-toast";

class SignUpForm extends Component {

    formHasErrors = true;

    constructor(props) {
        super(props);

        this.state = {
                username: '',
                usernameError:'',
                email:'',
                emailError:'',
                password:'',
                passwordError:'',
                confirm_password:'',
                confirm_passwordError:'',
                visible: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();

        const fields = Object.keys(this.refs);
        const resp = fields.filter(field => {
            const fun = `validate_${field}`;
            const val = this[fun]({target: {value: this.refs[field].value.trim()}});
            return !val;
        });

        fields.length === resp.length
            ? this.props.userSignUpRequest(this.state)
            : notify.show("Please fill in the required fields in the form", 'error', 5000)
    }

    validate_password = (event) => {

        const password = event.target.value;
        this.setState({passwordError:"", visible: true, password: password});
        this.formHasErrors = false;

        if (password.length=== 0 ){
            this.setState({passwordError:"Password is required", visible:false});
            this.formHasErrors = true;
        }else if(password.length<8){
            this.setState({passwordError:"Weak password, must be at least 8 characters", visible:false});
            this.formHasErrors = true;
        }else if (password.search(/\d/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 digit", visible:false});
            this.formHasErrors = true;
        }else if (password.search(/[a-zA-Z]/) === -1) {
            this.setState({passwordError:"Weak password, must have at least 1 letter", visible:false});
            this.formHasErrors = true;
        }
        return this.formHasErrors;
    };

    validate_confirm_password = (event) => {

        const confirm_password = event.target.value;
        const password = this.refs.password.value;
        this.formHasErrors = false;

        this.setState({confirm_passwordError:"", visible: true, confirm_password: confirm_password});

        this.checkLength(confirm_password, 'confirm_passwordError', "Please confirm your password");

        if (confirm_password !== password){
            this.setState({confirm_passwordError:"Password mismatch",visible:false});
            this.formHasErrors = true;
        }
        return this.formHasErrors;
    };

    checkLength = (lenField, prop, err) => {

        if (lenField.length === 0){
            const message = {};
            message[prop] = err;

            this.setState({...message, visible:false});
        }
    };

    validate_username = (event) => {
        const username = event.target.value;
        this.setState({usernameError:"", visible: true, username: username});
        this.formHasErrors = false;

        this.checkLength(username, 'usernameError', "Username is required");

        if(username.length < 5){
            this.setState({usernameError:"Username must be at least five characters", visible:false});
            this.formHasErrors = true;
        }
        return this.formHasErrors;
    };

    validate_email = (event) => {
        const email = event.target.value;
        this.setState({emailError:"", visible: true, email: email});
        const data = emailValidation(email, 'emailError','visible');
        this.setState(data);
        return data.visible;
    };

    render() {

        const inputs =[
            ['text', 'username', this.state.username, 'username','Username', 'account_box', this.state.usernameError], ['text', 'email', this.state.email, 'email', 'Email','email', this.state.emailError],
            ['password', 'password', this.state.password, 'password', 'Password','vpn_key', this.state.passwordError], ['password', 'confirm_password', this.state.confirm_password, 'confirm_password','Confirm password','vpn_key', this.state.confirm_passwordError]
        ].map(fld => field(fld));
        let signupForm =inputs.map((field, index) => generateInput(field,index, this));
        return (
            <div>
                <Row className={styles.row}><label className={styles["signup-header"]}><b>Sign Up</b></label></Row>
                <div className={'row'}>
                    <form className={styles["card-form-signup"]} onSubmit={this.handleSubmit} >
                        <div className={'row'}>
                            <div className={'input-field col s12 '}>
                                {signupForm}
                            </div>
                        </div>
                        <Row style={{padding: '0.75rem'}}><Button className={styles["button-effects"]} type='submit' value='Submit' > Sign up </Button></Row>
                    </form>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired
};

export default SignUpForm;
