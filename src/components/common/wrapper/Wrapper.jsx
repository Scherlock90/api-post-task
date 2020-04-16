import React from 'react';

export const Wrapper = ({ name, children }) =>
    <tr>
        <td className="body-container-form">
            { name }
        </td>
        <td className="body-container-form2">
            { children }
        </td>
    </tr>
