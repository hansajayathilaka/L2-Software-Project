import Document, {Html, Head, Main, NextScript} from "next/document";
import {ToastContainer} from "react-toastify";

export default class _Document extends Document {
    render() {
        return (
            <Html>
                <Head >
                    <title>VOMS Marketplace</title>
                    <link rel="icon" href="/favicon.svg" />
                </Head>
                <body>
                    <ToastContainer draggable={false} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}