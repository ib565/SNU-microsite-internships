import React from 'react';

function ContactModal({ showModal, toggleModal, handleSubmit }) {
    return (
        <>
            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Send a Message</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="messageText">Message</label>
                                        <textarea
                                            className="form-control"
                                            id="messageText"
                                            rows="3"
                                            placeholder="Enter your message here..."
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
}

export default ContactModal;
