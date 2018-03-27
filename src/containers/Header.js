import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import { fetchAllBooks } from '../actions/books'
import * as headerActions from '../actions/header'

class Header extends PureComponent {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    fetchAllBooks: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  searchHandler = event => {
    event.target.blur();
    const { searchText } = this.props
    this.props.clearData()
    this.props.fetchAllBooks({searchText})
    this.props.history.push('/books');
  }

  render() {
    const { searchText } = this.props
    return(
      <Intro>
        <div>
          <h1>BOOKS</h1>
          <TextBox
            onChange={text => this.props.changeText(text)}
            onKeyDown={event => event.key === 'Enter' && this.searchHandler(event)}
            value={searchText}
          />
          <Button onClick={this.searchHandler}>Поиск</Button>
        </div>
      </Intro>
    )
  }
}

export default connect(
  state => ({
      searchText: state.header.searchText,
    }),{...headerActions, fetchAllBooks})(Header)

const Intro = styled.div`
  input {
    height: 40px;
    width: 70%;
    font-size: 20px;
    margin: 10px;
    padding-left: 10px;
   }
    
  button {
    height: 50px;
    width: 75px;
    font-size: 18px;
    border-radius: 5px;
    margin: 10px;
   }
    
  button:hover {
    cursor: pointer;
   }
`
