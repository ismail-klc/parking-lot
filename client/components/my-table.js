import React, { useState } from 'react'
import DataTable, { Alignment } from 'react-data-table-component'
import { SubHeader } from './table-subheader'

function MyDataTable({
    columns, data, onClick, btnClick, filteredCol1, filteredCol2, filteredBoxLabel
}) {
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const filteredItems = filteredCol2 ? (data.filter(item =>
        item[filteredCol1][filteredCol2] &&
        item[filteredCol1][filteredCol2].toLowerCase().includes(filterText.toLowerCase()))) : 
        (data.filter(item =>
            item[filteredCol1] &&
            item[filteredCol1].toLowerCase().includes(filterText.toLowerCase())))

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <SubHeader
            filteredBoxLabel={filteredBoxLabel}
            onClick={btnClick}
            onClear={handleClear}
            onFilter={e => setFilterText(e.target.value)}
            filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            title={` `}
            highlightOnHover
            dense
            subHeader
            onRowClicked={onClick}
            subHeaderAlign={Alignment.Left}
            subHeaderComponent={subHeaderComponentMemo}
            paginationResetDefaultPage={resetPaginationToggle}
            paginationPerPage={10}
            pagination
            paginationRowsPerPageOptions={[5, 10, 25]}
            fixedHeader
            responsive
        />
    )
}

export default MyDataTable