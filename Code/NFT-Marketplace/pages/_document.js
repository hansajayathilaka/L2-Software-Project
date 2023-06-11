import Document, {Html, Head, Main, NextScript} from "next/document";

export default class _Document extends Document {
    render() {
        return (
            <Html>
                <Head >
                    <title>VOMS Marketplace</title>
                    <link rel="icon" href="/favicon.svg" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}