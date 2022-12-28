import type { NextPage } from "next";
import React from "react";


const PrivacyPolicy: NextPage = () => {
    return (
        <div>
            <iframe
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                src={"https://docs.google.com/document/d/1pGUJPCFEXCfSl3UQlOIpbQolh4L1K-lx/edit?usp=share_link&ouid=102906549979078057393&rtpof=true&sd=true"}
                frameBorder="0"
            />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {},
    };
}
export default PrivacyPolicy;
