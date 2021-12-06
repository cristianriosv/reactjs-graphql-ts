import { FC } from 'react';
import CSS from 'csstype';
import { Layout as LibLayout, PageHeader } from 'antd';
import { TEXTS } from '../../constants/texts';

const contentStyles: CSS.Properties = {
    padding: '30px',
    background: '#fff'
}
const mainContentStyle: CSS.Properties = {
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto'
}
const footerStyles: CSS.Properties = {
    textAlign: 'right'
}
const headerStyles: CSS.Properties = {
  background: 'unset'
} 

const Layout:FC = ({ children }) => {
  const { Header, Content, Footer } = LibLayout;
  return (
    <LibLayout>
      <Header style={headerStyles}>
        <PageHeader
          title={TEXTS.common.title}
        />
      </Header>
      <Content style={contentStyles}>
        <div style={mainContentStyle}>
          {children}
        </div>
      </Content>
      <Footer style={footerStyles}>
        {TEXTS.common.footer}
      </Footer>
    </LibLayout>
  );
}

export default Layout;