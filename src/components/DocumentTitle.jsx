// src/components/DocumentTitle.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const DocumentTitle = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};

export default DocumentTitle;
