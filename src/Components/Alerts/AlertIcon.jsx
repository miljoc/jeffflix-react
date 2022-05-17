import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeColors } from 'Styles/Variables';

const AlertIcon = (type) => {
    switch (type) {
        case 'error':
            return <FontAwesomeIcon icon={faExclamationCircle} color={ThemeColors.error} size="2x" />;
        case 'info':
            return <FontAwesomeIcon icon={faQuestionCircle} color={ThemeColors.info} size="2x" />;
        case 'success':
            return <FontAwesomeIcon icon={faCheckCircle} color={ThemeColors.success} size="2x" />;
        default:
            return false;
    }
};

AlertIcon.propTypes = {
    type: PropTypes.string.isRequired,
};

export default AlertIcon;
