import styles from './Image.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";


export const CustomImage = ({src, size}) => {
    const [config, setConfig] = useState({
        height: 100,
        width: 100,
        src: "",
    })
    const ipfsUrlSuffix = process.env.NEXT_PUBLIC_IPFS_URL_PREFIX;

    useEffect(() => {
        switch (size) {
            case undefined:
                setConfig({
                    ...config,
                    height: 100,
                    width: 100,
                });
                break;
            case "large":
                setConfig({
                    ...config,
                    height: 500,
                    width: 500,
                });
                break;
        }

    }, [])


    return(
        <div className="w-full">
            <Image
                loader={() => src} src={ipfsUrlSuffix + src}
                alt="NFT Thumbnail"
                layout="responsive"
                width={1000}
                height={600}
                className="object-cover w-full h-full"
                unoptimized
            />
        </div>
    );
};
