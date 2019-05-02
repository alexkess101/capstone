import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

export default class ViewSales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saleData: [],
            isLoaded: true
        }

        this.handleExit = this.handleExit.bind(this);
    
    }

    componentDidMount() {
        
        fetch(`https://ak-clearsummer.herokuapp.com/sale/${sessionStorage.getItem('user_id')}/view_sales`, {
            method: ['GET'],
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(data => {return data.json()})
        .then(resultData => {
            this.setState({
                saleData: resultData,
                isLoaded: false
            })
        })
    }

    handleExit() {
        event.preventDefault();
        this.props.history.push(`/home`);
        
    }

    render() {
        return (
            
            <div className='view-sales-wrapper' onClick ={this.handleExit}>
                
                <div className="view-sales-container" onClick={event => {event.stopPropagation();}}>
                <LoadingOverlay
                    active={this.state.isLoaded}
                    spinner
                    text="Loading..."
                    fadeSpeed={200}
                >
                    This is where you see your sales
                    <NavLink to={`/home`}>Exit</NavLink>
                    
                    {
                        this.state.saleData.map(item => {
                            return (
                                <div key={item[0]}className='sale-wrapper'>
                                    <div className='sale-name'>
                                        {item[2]}
                                        {item[3]}
                                    </div>
                                   
                                    <div>
                                        ${item[4]}
                                        {item[1]}
                                    </div>
                                </div>
                            )

                        })
                    }
                    
                    
                    </LoadingOverlay>
                </div>
                
            </div>
            
        )
    }
}