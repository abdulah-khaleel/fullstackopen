const SearchResult = ({ resultList, onShowClick }) => {
  const styles = { marginTop: 1, marginBottom: 1, display: 'inline' }
  let searchResultList = null

  if (resultList.length >= 1) {
    searchResultList = resultList.map((item) => (
      <div className="result-line" key={`${item}-line`}>
        <p key={item} style={styles}>
          {item}
        </p>
        <button onClick={() => onShowClick(item)} key={`${item}-btn`}>
          show
        </button>
      </div>
    ))
  }

  return searchResultList
}

export default SearchResult
