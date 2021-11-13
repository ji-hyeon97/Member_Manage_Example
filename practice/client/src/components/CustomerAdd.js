import React from "react";
import {post} from 'axios';//서버랑 통신

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {    
            userID:'',               
            date: '',                
            wavelength: '',                
            laser_power: '',                
            swept_time: '',    
            cnt_cyto_control:'',            
            cnt_cyto_experi:'',
            fileName:''            
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()        
        this.addCustomer() 
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
        })        
        this.setState({ 
            userID:'',             
            date: '',                
            wavelength: '',                
            laser_power: '',                
            swept_time: '',    
            cnt_cyto_control:'',
            cnt_cyto_experi:'',
            fileName:''          
        })                
        this.props.stateRefresh();    
    }
   
    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('userID', this.state.userID)
        formData.append('date', this.state.date)
        formData.append('wavelength', this.state.wavelength)
        formData.append('laser_power', this.state.laser_power)
        formData.append('swept_time', this.state.swept_time)  
        formData.append('cnt_cyto_control', this.state.cnt_cyto_control) 
        formData.append('cnt_cyto_experi', this.state.cnt_cyto_experi)       
        const config = {   
            headers: {   
                'content-type': 'text/plain'   
            }                
        }        
        return post(url, formData, config);        
    }

    render() {
        return (        
        <form onSubmit={this.handleFormSubmit}>        
        <h1>데이터 추가</h1>
        userID : <input type="text" name="userID" value={this.state.userID} onChange={this.handleValueChange} /><br/>
        date : <input type="text" name="date" value={this.state.date} onChange={this.handleValueChange} /><br/>
        wavelength: <input type="number" name="wavelength" value={this.state.wavelength} onChange={this.handleValueChange} /><br/>
        laser_power: <input type="number" name="laser_power" value={this.state.laser_power} onChange={this.handleValueChange} /><br/>
        swept_time: <input type="number" name="swept_time" value={this.state.swept_time} onChange={this.handleValueChange} /><br/>
        cnt_cyto_control : <input type="number" name="cnt_cyto_control" value={this.state.cnt_cyto_control} onChange={this.handleValueChange} /><br/>
        cnt_cyto_experi : <input type="number" name="cnt_cyto_experi" value={this.state.cnt_cyto_experi} onChange={this.handleValueChange} /><br/>
        <button type="submit">추가하기</button>
        </form>      
    )}
}

export default CustomerAdd