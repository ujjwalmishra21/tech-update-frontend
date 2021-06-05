import React,{ Component } from 'react';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import './Signup.css';
import { checkValidity, updateObject } from '../../utility/utility';
import { Button, TextField } from '@material-ui/core';

class Signup extends Component{
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
                },
                'confirmPassword':{
                    name:'confirmPassword',
                    type:'password',
                    value:'',
                    touched: false,
                    valid: true,
                    error:null,
                    placeholder: 'Re-enter password',
                    validation:{
                        required: true,
                        minLength:8
                    }
                }
        },
    
        
    }
    onSubmit = () => {
        if(this.state.formIsValid){
            if(this.state.formIsValid){
                if(this.state.form['confirmPassword'].value.localeCompare(this.state.form['password'].value) === 0){
                    let data = {};
                    for(let field in this.state.form){
                        data[field] = this.state.form[field].value;
                    }
                    data['roleIds'] = [2];
                    this.props.submitSignup(data);
                }else{
                    alert('Passwords do not match');
                }
                
            }else{
                alert('Fill all the fields correctly')
            }
        }else{
            alert('Fill all the fields')
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
            <form className="signup-form">
                {formElementArr.map(element => {
                   return(
                    <div key={element.id}>
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
                <Button disabled={this.props.loading} onClick={this.onSubmit} variant='contained' color='primary'>Sign Up</Button>
                
            </form>
        );

        return (
            <React.Fragment>
                {form}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitSignup: (data) => dispatch(actions.signup(data))
    };
}

export default connect(null, mapDispatchToProps)(Signup);
