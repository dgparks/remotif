import GridTable from '@dgparks/remotefirst-client';
import { useTheme } from '@material-ui/core/styles';
import ls from 'local-storage';
import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import jobs_unsorted from "../../../../assets/data/jobs_nodesc.json";
import getColumns from '../../jobs/components/table/getColumns';
import '../../jobs/components/table/index.css';

const SavedJobsTable = () => {

    const savedJobsIds = ls.get('savedJobs') || [];
    const savedJobs = jobs_unsorted.filter(job => savedJobsIds.includes(job._id.$oid))
                                    .sort((a, b) => savedJobsIds.indexOf(a._id.$oid) - savedJobsIds.indexOf(b._id.$oid))

    const tableManager = useRef(null);
    const setTableManager = tm => tableManager.current = tm;
    const [editRowId, setEditRowId] = useState(null);
    let [searchText, setSearchText] = useState('');
    let [selectedRowsIds, setSelectedRowsIds] = useState([]);
    let [sort, setSort] = useState({ colId: null, isAsc: true });
    let [page, setPage] = useState(1);
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
            state: { _id: data._id.$oid, returnToPage: { table: 'SavedJobs', pageNum: page } }
        })
    };

    const onRowsRequest = async (requestData, tableManager) => {
        let {
            sortApi: {
                sortRows
            },
            searchApi: {
                searchRows
            },
        } = tableManager;

        let allRows = savedJobs;
        allRows = await searchRows(allRows);
        allRows = sortRows(allRows);

        return {
            rows: allRows.slice(requestData.from, requestData.to),
            totalRows: allRows.length
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
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
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
                    />
                </div>
            </div>
        </div>
    )
}

export default SavedJobsTable;