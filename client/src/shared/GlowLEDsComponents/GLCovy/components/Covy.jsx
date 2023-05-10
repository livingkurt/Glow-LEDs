/* eslint-disable react/no-render-return-value */
/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-dom';
import ShowSnackbar from './ShowSnackbar';
import SnackBarReqLoadBar from './SnackBarReqLoadBar';
import ShowAutosave from './ShowAutosave';

const containerNode = document.getElementById('covy-container');
const loaderContainerNode = document.getElementById('covy-loader-container');

const Covy = () => ({
  says: msg => console.log(msg),
  showSnackbar: ({ message, severity, horizontal, vertical, duration }) =>
    render(
      <ShowSnackbar
        anchorOrigin={{ horizontal, vertical }}
        containerNode={containerNode}
        duration={duration}
        message={message}
        severity={severity}
        open
      />,
      containerNode
    ),
  showSnackBarReqLoadBar: ({ formData, loadMessage, successMessage, failMessage, path, updateState }) =>
    render(
      <SnackBarReqLoadBar
        containerNode={loaderContainerNode}
        path={path}
        formData={formData}
        loadMessage={loadMessage}
        successMessage={successMessage}
        failMessage={failMessage}
        updateState={updateState}
      />,
      loaderContainerNode
    ),
  showAutosave: ({ message, severity, horizontal, vertical, duration }) =>
    render(
      <ShowAutosave
        anchorOrigin={{ horizontal, vertical }}
        containerNode={containerNode}
        duration={duration}
        message={message}
        severity={severity}
        open
      />,
      containerNode
    ),
});

window.Covy = Covy();

export default Covy;
