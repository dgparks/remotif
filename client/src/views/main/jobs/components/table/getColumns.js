import React from "react";
import RemoteScoreCell from '../controllers/RemoteScoreCell';
import SaveJobCell from '../controllers/SaveJobCell';
import TagsCell from '../controllers/TagsCell';
import UsernameCell from '../controllers/UsernameCell';

const EDIT_SVG = <svg height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" stroke="#1856bf" transform="translate(2 2)"><path d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z" transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)" /><path d="m13.5 4.5 1 1" /></g></svg>;
const CANCEL_SVG = <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#dc1e1e" transform="translate(5 5)"><path d="m.5 10.5 10-10" /><path d="m10.5 10.5-10-10z" /></g></svg>;
const SAVE_SVG = <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m.5 5.5 3 3 8.028-8" fill="none" stroke="#4caf50" transform="translate(5 6)" /></svg>;

const styles = {
    select: { margin: '0 20px' },
    buttonsCellContainer: { padding: '0 20px', width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
    editButton: { background: '#f3f3f3', outline: 'none', cursor: 'pointer', padding: 4, display: 'inline-flex', border: 'none', borderRadius: '50%', boxShadow: '1px 1px 2px 0px rgb(0 0 0 / .3)' },
    buttonsCellEditorContainer: { height: '100%', width: '100%', display: 'inline-flex', padding: '0 20px', justifyContent: 'flex-end', alignItems: 'center' },
    cancelButton: { background: '#f3f3f3', outline: 'none', cursor: 'pointer', marginRight: 10, padding: 2, display: 'inline-flex', border: 'none', borderRadius: '50%', boxShadow: '1px 1px 2px 0px rgb(0 0 0 / .3)' },
    saveButton: { background: '#f3f3f3', outline: 'none', cursor: 'pointer', padding: 2, display: 'inline-flex', border: 'none', borderRadius: '50%', boxShadow: '1px 1px 2px 0px rgb(0 0 0 / .3)' }
}

const getColumns = ({ setRowsData }) => {

    return [
        {
            id: 'checkbox',
            visible: true,
            pinned: false,
            width: '60px',
            headerCellRenderer: () => (
                <div style={styles.buttonsCellContainer}>
                </div>
            ),
            cellRenderer: SaveJobCell
        },
        {
            id: '2',
            field: 'company',
            label: 'Company',
            visible: true,
            searchable: true,
            editable: false,
            sortable: true,
            resizable: false,
            cellRenderer: UsernameCell,
            width: 'calc((100vw - 62px) * 0.12)',
            editorCellRenderer: props => <UsernameCell {...props} isEdit />
        },
        {
            id: '3',
            field: 'title',
            label: 'Job Title',
            visible: true,
            searchable: true,
            editable: false,
            sortable: true,
            resizable: false,
            width: 'calc((100vw - 62px) * 0.22)',
            sort: ({ a, b, isAscending }) => {
                let aa = a.replace(/\W/g, '').toLowerCase(),
                    bb = b.replace(/\W/g, '').toLowerCase();
                return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
            }
        },
        {
            id: '6',
            field: 'category',
            label: 'Job Category',
            visible: true,
            searchable: true,
            editable: false,
            sortable: true,
            resizable: false,
        },
        {
            id: '7',
            field: 'industry',
            label: 'Industry',
            visible: true,
            searchable: true,
            editable: false,
            sortable: true,
            resizable: false,
            width: 'calc((100vw - 62px) * 0.12)',
        },
        {
            id: '9',
            field: '_tags',
            label: 'Tags',
            visible: true,
            searchable: false,
            editable: false,
            sortable: false,
            resizable: false,
            width: 'calc((100vw - 62px) * 0.19)',
            cellRenderer: (props) => <TagsCell {...props} />,
            editorCellRenderer: props => <TagsCell {...props} isEdit />
        },
        {
            id: '10',
            field: 'remote_score',
            label: 'Remote Score',
            visible: true,
            searchable: false,
            editable: false,
            sortable: true,
            resizable: false,
            width: 'calc((100vw - 62px) * 0.12)',
            cellRenderer: RemoteScoreCell,
        },
        {
            id: '11',
            field: 'date_posted',
            label: 'Date Posted',
            visible: true,
            searchable: false,
            editable: false,
            sortable: true,
            resizable: false,
            width: 'calc((100vw - 62px) * 0.10)',
            sort: ({ a, b, isAscending }) => {
                const aa = Date.parse(a.replace('at ', ''))/1000;
                const bb = Date.parse(b.replace('at ', ''))/1000;
                return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
            }
        },
        {
            id: '12',
            field: 'description',
            visible: false,
            searchable: true,
            editable: false,
            sortable: false,
            resizable: false,
        },
        {
            id: '13',
            field: 'unix_timestamp',
            visible: false,
            searchable: true,
            editable: false,
            sortable: false,
            resizable: false,
        },
        {
            id: 'buttons',
            width: 'max-content',
            visible: false,
            pinned: true,
            sortable: false,
            resizable: false,
            cellRenderer: ({ tableManager, data  }) => (
                <div style={styles.buttonsCellContainer}>
                    <button
                        title="Edit"
                        style={styles.editButton}
                        onClick={e => {e.stopPropagation(); tableManager.rowEditApi.setEditRowId(data.id)}}
                    >
                        {EDIT_SVG}
                    </button>
                </div>
            ),
            editorCellRenderer: ({ tableManager, data  }) => (
                <div style={styles.buttonsCellEditorContainer}>
                    <button
                        title="Cancel"
                        style={styles.cancelButton}
                        onClick={e => {e.stopPropagation(); tableManager.rowEditApi.setEditRowId(null)}}
                    >
                        {CANCEL_SVG}
                    </button>
                    <button
                        title="Save"
                        style={styles.saveButton}
                        onClick={e => {
                            e.stopPropagation();
                            let rowsClone = [...tableManager.rowsApi.rows];
                            let updatedRowIndex = rowsClone.findIndex(r => r.id === data.id);
                            rowsClone[updatedRowIndex] = data;
                            setRowsData(rowsClone);
                            tableManager.rowEditApi.setEditRowId(null);
                        }}
                    >
                        {SAVE_SVG}
                    </button>
                </div>
            )
        }
    ]
}

export default getColumns;