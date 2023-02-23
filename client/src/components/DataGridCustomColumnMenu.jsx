import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from "@mui/x-data-grid"

const DataGridCustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
        <GridColumnMenuContainer hideMenu={hideMenu} open={open} currentColumn={currentColumn}>
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    )
}

export default DataGridCustomColumnMenu