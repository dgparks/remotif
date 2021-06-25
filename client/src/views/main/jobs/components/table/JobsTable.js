import GridTable from '@dgparks/remotefirst-client';
import { useTheme } from '@material-ui/core/styles';
import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import jobs_unsorted from "../../../../../assets/data/jobs_nodesc.json";
import getColumns from './getColumns';
import './index.css';

// make unix_timestamp the default sort order
const jobs = jobs_unsorted.sort(function (a, b) {
    return b.unix_timestamp < a.unix_timestamp ? -1 // if b should come earlier, push a to end
        : b.unix_timestamp > a.unix_timestamp ? 1 // if b should come later, push a to begin
            : 0;                   // a and b are equal
});

const JobsTable = ({ headerSearchText, sidebarFilters, ...props }) => {

    const tableManager = useRef(null);
    const setTableManager = tm => tableManager.current = tm;
    const [editRowId, setEditRowId] = useState(null);
    let [searchText, setSearchText] = useState(headerSearchText);
    let [filters, setFilters] = useState(null);
    let [selectedRowsIds, setSelectedRowsIds] = useState([]);
    let [sort, setSort] = useState({ colId: null, isAsc: true });
    let [page, setPage] = useState(props.page);
    let [pageSize, setPageSize] = useState(20);
    let [pageSizes, setPageSizes] = useState([20, 50, 100]);
    let [enableColumnsReorder, setEnableColumnsReorder] = useState(true);
    let [highlightSearch, setHighlightSearch] = useState(true);
    let [showSearch, setShowSearch] = useState(false);
    let [showRowsInformation, setShowRowsInformation] = useState(true);
    let [showColumnVisibilityManager, setShowColumnVisibilityManager] = useState(true);
    let [isHeaderSticky, setIsHeaderSticky] = useState(true);
    let [isVirtualScroll, setIsVirtualScroll] = useState(true);
    let [isPaginated, setIsPaginated] = useState(true);
    let [minSearchChars, setMinSearchChars] = useState(2);
    let [minColumnResizeWidth, setMinColumnWidth] = useState(70);
    let [columns, setColumns] = useState(getColumns({ setRowsData: newRows => tableManager.current.asyncApi.setRows(newRows) }));
    let [selectAllMode, setSelectAllMode] = useState('page');

    const controllers = {
        columns: [columns, setColumns],
        editRowId: [editRowId, setEditRowId],
        searchText: [searchText, setSearchText],
        filters: [filters, setFilters],
        selectedRowsIds: [selectedRowsIds, setSelectedRowsIds],
        sort: [sort, setSort],
        page: [page, setPage],
        pageSize: [pageSize, setPageSize],
        pageSizes: [pageSizes, setPageSizes],
        enableColumnsReorder: [enableColumnsReorder, setEnableColumnsReorder],
        highlightSearch: [highlightSearch, setHighlightSearch],
        showSearch: [showSearch, setShowSearch],
        showRowsInformation: [showRowsInformation, setShowRowsInformation],
        showColumnVisibilityManager: [showColumnVisibilityManager, setShowColumnVisibilityManager],
        isHeaderSticky: [isHeaderSticky, setIsHeaderSticky],
        isVirtualScroll: [isVirtualScroll, setIsVirtualScroll],
        isPaginated: [isPaginated, setIsPaginated],
        minSearchChars: [minSearchChars, setMinSearchChars],
        minColumnResizeWidth: [minColumnResizeWidth, setMinColumnWidth],
        selectAllMode: [selectAllMode, setSelectAllMode]
    }

    const theme = useTheme();

    const history = useHistory();

    const HandleOpen = (data) => {
        history.push({
            pathname: `/jobs/${data.slug}`,
            state: {
                _id: data._id.$oid,
                title: data.title,
                company: data.company,
                returnToPage: {
                    table: 'Jobs',
                    pageNum: page,
                    sort: sort
                }
            }
        })
    };

    if (props.sort !== undefined) {
        setSort(props.sort)
    }

    React.useEffect(() => {
        setFilters(sidebarFilters);
    }, [sidebarFilters])

    const onRowsRequest = async (requestData, tableManager) => {
        let {
            sortApi: {
                sortRows
            },
            searchApi: {
                searchRows
            },
        } = tableManager;

        let allRows = jobs;

        // example: if pageSize is 20, then if requesting rows 20 to 40,
        // we get 40 / 20 - 1 = 2 - 1 = 1 (result is algolia request page 1)
        let pageNumToRequest = requestData.to / pageSize - 1

        const response = await searchRows(allRows, pageSize, pageNumToRequest);
        const rows = sortRows(response.rows);

        const noFilters = await !sidebarFilters
        const noSearchText = await !headerSearchText

        if (noFilters && noSearchText) {
            return {
                rows: allRows.slice(requestData.from, requestData.to),
                totalRows: allRows.length
            }
        }
        return {
            rows: rows,
            totalRows: response.totalRows
        };
    }

    return (
        <div className={theme.palette.mode === 'light' ? 'lightmode' : 'darkmode'}>
            <div className="jobsTable">
                <div className="tableWrapper">
                    <GridTable
                        columns={columns}
                        onColumnsChange={setColumns}
                        onRowsRequest={onRowsRequest}
                        editRowId={editRowId}
                        onEditRowIdChange={setEditRowId}
                        selectedRowsIds={selectedRowsIds}
                        onSelectedRowsChange={setSelectedRowsIds}
                        onRowClick={
                            ({ data }) =>
                                HandleOpen(data)

                        }
                        style={{ boxShadow: 'rgb(0 0 0 / 30%) 0px 40px 40px -20px', border: 'none' }}
                        onLoad={setTableManager}
                        searchText={headerSearchText}
                        onSearchTextChange={setSearchText}
                        filters={sidebarFilters}
                        onFiltersChange={setFilters}
                        sort={sort}
                        onSortChange={setSort}
                        page={page}
                        onPageChange={setPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        pageSizes={pageSizes}
                        enableColumnsReorder={enableColumnsReorder}
                        highlightSearch={highlightSearch}
                        showSearch={showSearch}
                        showRowsInformation={showRowsInformation}
                        showColumnVisibilityManager={showColumnVisibilityManager}
                        isHeaderSticky={isHeaderSticky}
                        isVirtualScroll={isVirtualScroll}
                        isPaginated={isPaginated}
                        minSearchChars={minSearchChars}
                        minColumnResizeWidth={minColumnResizeWidth}
                        selectAllMode={selectAllMode}
                        texts={{ totalRows: 'Jobs Found:' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default JobsTable;