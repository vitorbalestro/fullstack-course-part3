const FilterForm = (props) => {

    return(
        <>
        <form>
            filter shown with: &nbsp;
        <input onChange={props.handleFilterChange} />
      </form>
      </>
    )
}

export default FilterForm;