import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import throttle from 'lodash.throttle'
import { BooksItem } from '../components/BooksItem'
import { fetchData } from '../actions/header'

const Intro = styled.div`
  ul {
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
  }
  
  li {
    display: inline-block;
  }
  
  .break a {
    cursor: default;
  }
`
class BooksList extends PureComponent {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoaded: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    startIndex: PropTypes.number.isRequired,
  }

  handlePageScroll = () => {
    this.props.fetchData(
      this.props.searchText,
      this.props.startIndex,
    )
  }

  render() {
    const { books, isLoaded } = this.props
    return (
      <div>
        {isLoaded &&
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handlePageScroll}
          hasMore={() => throttle(() => true, 2000)}
          loader={<div className="loader">Loading ...</div>}>
          {books.map(item => (
            <BooksItem item={item} key={item.id}/>
          ))}
        </InfiniteScroll>}
      </div>
    )
  }
}

export default connect(
  state => ({
    books: state.books.items,
    isLoaded: state.books.isLoaded,
    searchText: state.header.searchText,
    startIndex: state.books.startIndex,
    hasMore: state.books.hasMore,
  }), { fetchData })(BooksList)
