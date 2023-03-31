import {useRouter} from "next/router";
import {useHeight, useWidth} from "./hooks";

export default function ImageFromHash() {
    const router = useRouter()
    const { hash } = router.query

    const ipfsUrlSuffix = process.env.NEXT_PUBLIC_IPFS_URL_PREFIX;

    const height = useHeight();
    // const width = useWidth();

    return(
        <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={ipfsUrlSuffix + hash}
                alt="Image description"
                style={{
                    width: "auto",
                    height: height - 88,
                    objectFit: "contain"
                }}
            />
        </div>
    )
}
