import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



export default function SnackBar(props) {

    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        props.handleSnackBarAddItemClose();
    };

    return (
        <div>
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={props.isOpen}
                    // open='true'
                    key={vertical + horizontal}
                    autoHideDuration={500}
                    message={props.msg}
                    action={[<IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>x
                        </IconButton>]}
                />
            </div>
        </div>
    );
}