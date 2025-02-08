import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { ClosedIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Modal({ children, isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={cx('modal')}>
            <div className={cx('modal-overlay')} onClick={onClose}>
                <div
                    className={cx('modal-content')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ClosedIcon className={cx('close-btn')} onClick={onClose} />
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Modal;
