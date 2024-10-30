import { Footer } from 'antd/es/layout/layout'
import { Layout } from 'antd'
import './global.css'

export function GlobalFooter(){

return <Layout>
    <Footer  className="global-footer">
      Created with ❤ by <a style={{ color: 'white', textDecoration: 'underline',fontFamily:'Helvetica' }} href="https://github.com/lawlie8">lawlie8</a>
      <span style={{ float: "right", position: "absolute", right: "1%", fontWeight: "bold" }}>v.0.1</span>
    </Footer>
  </Layout>
}