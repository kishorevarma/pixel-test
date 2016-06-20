import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import LiquorTable from '../components/LiquorTable';

const mapStateToProps = (state) => (
  { ...state.liquorReducer }
);
const mapActionToProps = dispatch => (
  {
    actions: bindActionCreators({...actions}, dispatch)
  }
);
class LiquorContainer extends Component {
  componentDidMount() {
    this.props.actions.loadLiquorData();
  }
  render() {
    return <LiquorTable {...this.props} />;
  }
}

LiquorContainer.fetchData = ({ store }) => (store.dispatch(actions.loadLiquorData()));

export default connect(mapStateToProps, mapActionToProps)(LiquorContainer);