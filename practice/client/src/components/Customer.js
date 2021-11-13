import React from 'react';
import {TableRow} from '@material-ui/core';
import {TableCell}  from "@material-ui/core";

class Customer extends React.Component{//Custemer 정의
  render(){//그려지는 내용
    return(
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>{this.props.userID}</TableCell>
        <TableCell>{this.props.date}</TableCell>
        <TableCell>{this.props.wavelength}</TableCell>
        <TableCell>{this.props.laser_power}</TableCell>
        <TableCell>{this.props.swept_time}</TableCell>
        <TableCell>{this.props.cnt_cyto_control}</TableCell>
        <TableCell>{this.props.cnt_cyto_experi}</TableCell>
      </TableRow>
    )
  }
}
export default Customer;