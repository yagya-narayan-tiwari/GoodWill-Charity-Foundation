import { Button, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';


export function ConfirmDialog(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#018f70" , fontSize:"22px" , fontWeight:"600", fontFamily:"sans-serif"} }>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontWeight:"600" , color:"#1F2120" , fontFamily:"sans-serif"}}>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button style={{ padding:"5px 15px" , backgroundColor:"#14C79F" , border:"none"}} onClick={props.onYes}>
                    Yes
                </Button>
                <Button  style={{ padding:"5px 15px" , backgroundColor:"white" ,borderColor:"#14C79F", color:"black"}} onClick={props.onHide}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ConfirmDialog.propTypes = {
    // background: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    onYes: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
};