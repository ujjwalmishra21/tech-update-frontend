import React,{ Component } from 'react';

import {connect} from 'react-redux';

import './Login.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utility/utility';
import { Button, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    state = {
        form: {
            
                'username':{
                    name:'username',
                    type:'text',
                    value:'',
                    touched:false,
                    error:null,
                    valid:true,
                    placeholder:'Enter username',
                    validation:{
                        required: true
                    }
                },
                'password':{
                    name:'password',
                    type:'password',
                    value:'',
                    touched: false,
                    valid:true,
                    error:null,
                    placeholder:'Enter password',
                    validation:{
                        required: true,
                        minLength:8
                    }
                }
        }        
    }
    onSubmit = () => {
        if(this.state.formIsValid){
            let data = {};
            for(let field in this.state.form){
                data[field] = this.state.form[field].value;
            }
            this.props.submitLogin(data);
        }else{
            alert('Fill all the fields correctly');
        }
        
    }

    onChange = (event, inputField) => {
        
        const updatedFormElement = updateObject(this.state.form[inputField],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.form[inputField].validation),
            touched: true
        });
     
        const updatedForm = updateObject(this.state.form,{
            [inputField]: updatedFormElement
        });
        
        let formIsValid = true;
        for(let inputField in updatedForm){
            formIsValid = updatedForm[inputField].touched && updatedForm[inputField].valid && formIsValid;
        }

        this.setState({
            form: updatedForm,
            formIsValid: formIsValid
        });
    }
        
    render(){
        let formElementArr = [];

        for(let key in this.state.form){
            formElementArr.push({
                id: key,
                properties : this.state.form[key]
            });
        }
      
        let form = (
            <form className="login-form">
                {formElementArr.map(element => {
                   return(
                    <div  key={element.id}>
                       <TextField 
                            label={element.properties.name} 
                            variant="outlined"
                            error={element.properties.touched & !element.properties.valid } 
                            helperText={element.properties.error} 
                            value={element.properties.value} 
                            onChange={(event)=>this.onChange(event,element.properties.name)}
                            placeholder={element.properties.placeholder}
                            className='text-field' /><br/>                            
                    </div>
                   );
                })

                }
                <Button disabled={this.props.loading} onClick={this.onSubmit} variant='contained' color='primary'>LOG IN</Button>
                
            </form>
        );
        
        let redirect = null;
        
        if(this.props.isAuthenticated){
            redirect = <Redirect to="/" />
        }
        return (
            <React.Fragment>
                {redirect}
                {form}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch(actions.authInit(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
