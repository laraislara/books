import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import throttle from 'lodash.throttle'
import BooksItem from '../components/BooksItem'
import { fetchAllBooks } from '../actions/books'

class BooksList extends PureComponent {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoaded: PropTypes.bool.isRequired,
    fetchAllBooks: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    startIndex: PropTypes.number.isRequired,
  }

  handlePageScroll = () => {
    const { searchText, startIndex } = this.props
    this.props.fetchAllBooks({ searchText, startIndex })
  }

  render() {
    const { books, isLoaded } = this.props
    return (
      <div>
        {isLoaded && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.handlePageScroll}
            hasMore={() => throttle(() => true, 2000)}
            loader={<div className="loader">Loading ...</div>}
          >
            {books.map(item => <BooksItem item={item} key={item.id} />)}
          </InfiniteScroll>
        )}
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
  }),
  { fetchAllBooks }
)(BooksList)
