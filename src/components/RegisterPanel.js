import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


export default class RegisterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate() {

        let username = this.state.username;
        let password = this.state.password;
        let errors = {};
        let isValid = true;

        if (!username) {
            isValid = false;
            errors["username"] = "*Please enter your username.";
        }
        if (!password) {
            isValid = false;
            errors["password"] = "*Please enter your password.";
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }
 
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })

    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    onSubmit(e) {
        if (this.validate()) {       
            const register = {
                username: this.state.username,
                password: this.state.password
            }

            axios.post('http://localhost:5000/register', register)
                .then(res => {
                    //if (res.status === 200) {
                    window.location = "/"
                })
                .catch(res => {
                    if (res.response) {
                        let errors = {};
                        errors["userNameAvailable"] =res.response.data;
                        this.setState({ errors: errors }
                          )
                    }});
        }
    }

    render() {
        return (
            <div className="box-container">
                <div className="inner-container">
                    <div className="App-header-register">
                        Register
                    </div>

                    <div className="box">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                required
                                className="login-input"
                                value={this.state.username}
                                onChange={this.onChangeUsername}

                                placeholder="Username" />
                        </div>
                        <div className="errorMsg">{this.state.errors.username}</div>
                        <div className="errorMsg">{this.state.errors.userNameAvailable}</div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                className="login-input"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                placeholder="Password" />
                        </div>
                        <div className="errorMsg">{this.state.errors.password}</div>
                        <button type="submit"
                            className="my-btn"
                            onClick={this.onSubmit}>Register</button>
                    </div>
                    <a href="/">Login</a>
                </div>
            </div>
        );
    }
}