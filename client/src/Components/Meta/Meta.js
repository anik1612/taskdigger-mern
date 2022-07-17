import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'TASKDIGGER - Freelancing Website',
  description: 'We give the best experience for cheap price',
  keywords: 'taskdigger, freelancing, freelancing website',
};

export default Meta;
