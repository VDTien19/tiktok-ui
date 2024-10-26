import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { ClosedIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Modal({ children, isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
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
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
