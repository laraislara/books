import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllBooks } from '../actions/books'
import { clearData } from '../actions/header'

class BooksItem extends React.Component {
  static propTypes = {
    item: PropTypes.objectOf(PropTypes.any).isRequired,
    fetchAllBooks: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
  }

  handleClick = event => {
    this.props.clearData()
    const value = event.target.innerText
    this.props.fetchAllBooks({ searchText: `inauthor:${value}` })
    window.scrollTo(0, 0)
  }

  render() {
    const { item } = this.props
    return (
      <Intro>
        <div>
          <h3>
            <Link to={`/books/${item.id}`}>{item.volumeInfo.title}</Link>
          </h3>
          <img
            src={
              item.volumeInfo.imageLinks
                ? item.volumeInfo.imageLinks.smallThumbnail
                : 'http://via.placeholder.com/70x100'
            }
            alt={item.volumeInfo.title}
          />
          <span>
            {item.volumeInfo.authors &&
              item.volumeInfo.authors.length > 0 && (
                <a onClick={this.handleClick}>{item.volumeInfo.authors.join(', ')}</a>
              )}
          </span>
          <span>
            {item.volumeInfo.publishedDate &&
              ` ${new Date(item.volumeInfo.publishedDate).toLocaleString('ru', { year: 'numeric' })}`}{' '}
          </span>
          <span>
            <a href={item.volumeInfo.previewLink}>Предварительный просмотр</a>
          </span>
          <br />
          <span>{item.volumeInfo.description ? `${item.volumeInfo.description.slice(0, 200)}...` : ''}</span>
        </div>
      </Intro>
    )
  }
}

export default connect(
  state => ({
    searchText: state.header.searchText,
  }),
  { fetchAllBooks, clearData }
)(BooksItem)

const Intro = styled.div`
  width: 60%;
  text-align: left;
  margin: 15px 0 15px 150px;
  min-height: 140px;

  span {
    font-size: 15px;
  }

  h3 {
    font-size: 18px;
    margin: 0 0 5px 0;
    font-weight: normal;
    line-height: 1.2;
  }

  img {
    width: 70px;
    height: 100px;
    float: left;
    margin-right: 10px;
  }

  a:hover {
    cursor: pointer;
    color: blue;
  }
`
