import React from "react";
import Footer from "rc-footer";

import "rc-footer/assets/index.css";

const FooterCustom = () => {
  return (
    <Footer
      style={{ marginTop: "100px" }}
      columns={[
        {
          title: "Company",
          items: [
            {
              title: "About us",
              url: "https://pro.ant.design/",
              openExternal: true,
            },
            {
              title: "Blog",
              url: "https://mobile.ant.design/",
              openExternal: true,
            },
            {
              title: "Gift cards",
              url: "https://kitchen.alipay.com/",
              description: "Sketch",
            },
          ],
        },

        {
          title: "Products",
          items: [
            {
              title: "Information",
              url: "https://pro.ant.design/",
              openExternal: true,
            },
            {
              title: "Download",
              url: "https://mobile.ant.design/",
              openExternal: true,
            },
            {
              title: "Kitchen",
              url: "https://kitchen.alipay.com/",
              description: "Sketch ",
            },
          ],
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
              alt="more products"
            />
          ),
          title: "Vastum",
          items: [
            {
              icon: (
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                  alt="yuque"
                />
              ),
              title: "History",
              url: "https://yuque.com",
              description: "History of route",
              openExternal: true,
            },
            {
              icon: (
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
                  alt="yuque"
                />
              ),
              title: "More",
              url: "https://yunfengdie.com",
              description: "See more",
              openExternal: true,
            },
          ],
        },
      ]}
      bottom="Made with ❤️ by students of FPT University"
    />
  );
};

export default FooterCustom;
