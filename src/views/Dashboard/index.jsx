import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './Dashboard.sass'

import { Card, CardIcon, CardHeading, CardText } from 'components/Card'


class Dashboard extends Component {
  componentDidMount = () => {
    console.log(this.props)
  }
  render() {
    return (
      <div className="dash-dashboard">
        <span className="dash-title">Add New Profile</span>
        <div className="row center-xs">
          <Card className="pa-card" bordered rounded medium hover onClick={() => this.props.history.push('/form/pa')}>
              <div className="flex flex-col items-center w-100">
                <CardIcon name="icofont-ui-folder"/>
                <CardHeading>Add Creative Artist</CardHeading>
                <CardText>Add Performing artist profiles to database.</CardText>
              </div>
            </Card>
          <Card className="ca-card" bordered rounded medium hover onClick={() => this.props.history.push('/form/ca')}>
              <div className="flex flex-col items-center w-100">
                <CardIcon name="icofont-microphone-alt"/>
                <CardHeading>Add Performing Artist</CardHeading>
                <CardText>Add Performing artist profiles to database.</CardText>
              </div>
            </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)