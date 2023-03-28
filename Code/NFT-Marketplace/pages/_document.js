import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head >
                    <title>VOMS Marketplace</title>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}