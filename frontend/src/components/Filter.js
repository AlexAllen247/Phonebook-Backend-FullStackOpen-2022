const Filter = ({ search, handleSearch }) => {
    return (
        <div>
            <form>
                <p>filter shown with: <input value={search} onChange={handleSearch} /></p>
            </form>
        </div>

    )
}

export default Filter