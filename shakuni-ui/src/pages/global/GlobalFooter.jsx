import { Footer } from 'antd/es/layout/layout'
import { Layout } from 'antd'
import './global.css'
import { useState } from 'react'

export default function GlobalFooter() {

  const [version, setVersion] = useState("0.1");

  //Fetch Version
  useEffect(() => {
    instance.get(VERSION_API).then((response) => {
      setVersion(response.data);
    }).catch(() => {

    })
  }, [])



  return <Layout>
    <Footer className="global-footer">
      Created with ❤ by <a style={{ color: 'white', textDecoration: 'underline', fontFamily: 'Helvetica' }} href="https://github.com/lawlie8">lawlie8</a>
      <span style={{ float: "right", position: "absolute", right: "1%", fontWeight: "bold" }}>v{version}</span>
    </Footer>
  </Layout>
}