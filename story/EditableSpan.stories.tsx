import React from 'react';
import { action } from '@storybook/addon-actions';
import EditableSpan from '../components/EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
};

const callback = action('Span new value was changed');

export const EditableSpanBasicExamole = () => {
    return <EditableSpan title='Start value' newValue={callback}/>;
};

