import { Toast, ToastContainer } from "react-bootstrap";
import PropTypes from 'prop-types';

export function ToastNotification(props) {
    return (
        <ToastContainer position="top-end">
            <Toast bg={props.background} onClose={props.onClose} show={props.show} delay={3000} autohide>
                <Toast.Header>
                    <strong style={{color:" #361db7"}} className="me-auto">Confirmation</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

ToastNotification.propTypes = {
    background: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
};