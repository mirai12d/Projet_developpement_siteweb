import React from 'react';
import FullScreenMenu from '../memberApp/pages/FullScreenMenu';
import PublicFooter from '../publicSite/components/PublicFooter';
import ScrollButton from '../shared/ScrollButton';
import ScrollToTop from '../shared/ScrollToTop';

const PublicLayout = ({ children }) => (
  <>
    <ScrollToTop />
    <FullScreenMenu />
    <main>{children}</main>
    <ScrollButton />
    <PublicFooter />
  </>
);

export default PublicLayout;
