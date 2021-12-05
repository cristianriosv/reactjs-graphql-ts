import { FC } from 'react';
import CSS from 'csstype';
import { Layout as LibLayout, PageHeader } from 'antd';

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
          title="Search Countries UI"
        />
      </Header>
      <Content style={contentStyles}>
        <div style={mainContentStyle}>
          {children}
        </div>
      </Content>
      <Footer style={footerStyles}>
        Hello globetrotter, this is an exercise made with the stack of: reactjs, typescript and graphql.
        For this project I have used the api of countries.trevorblades.com, ant design for the UI, react-query for the query management, graphql-request for the graphql client scripts, and router-dom for the routing.
        Hope you find it useful!
      </Footer>
    </LibLayout>
  );
}

export default Layout;