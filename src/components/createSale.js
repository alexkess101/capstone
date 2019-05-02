import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

export default class CreateSale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            value: null
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExit = this.handleExit.bind(this);
        
    }

    handleSubmit() {
        let addFirstName = this.state.firstName;
        let addLastName = this.state.lastName;
        let addValue = parseFloat(this.state.value);

        event.preventDefault();
        fetch(`https://ak-clearsummer.herokuapp.com/home/${sessionStorage.getItem('user_id')}/create_sale`, {
            method: 'POST',
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account_name_first: addFirstName,
                account_name_last: addLastName,
                account_value: addValue
            }) 
        })
        .then(returnData => {
            this.setState({
                firstName: "",
                lastName: "",
                value: null
            })
            returnData.json()
            this.props.history.push(`/home`)
        })
        .catch(err => {console.log(err)})        
    }

    handleExit() {
        event.preventDefault();
        this.props.history.push(`/home`);
        console.log(this.props)
    }



    render() {
        return (
            <div className="create-sale-wrapper" onClick={this.handleExit}>
                <div className="create-sale-container" onClick={event => {event.stopPropagation();}}>
                    <h1>This is where you create a sale</h1>
                    
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="account_first_name"
                            placeholder="First Name"
                            value={this.firstName}
                            onChange={event => {
                                this.setState({
                                    firstName: event.target.value
                                    })                 
                                }
                            }
                        />

                        <input
                            type="text"
                            name="account_last_name"
                            placeholder="Last Name"
                            value={this.lastName}
                            onChange={event => {
                                this.setState({
                                    lastName: event.target.value
                                    })                 
                                }
                            }
                        />

                        <input
                            type="number"
                            name="value"
                            placeholder="Enter contract value"
                            value={this.value}
                            onChange={event => {
                                this.setState({
                                    value: event.target.value
                                    })                 
                                }
                            }
                        />

                        <button type="submit">Add Sale</button>

                        <NavLink to={`/home`}>Exit </NavLink>
                    </form>
                </div>

            </div>
        )
    }
}