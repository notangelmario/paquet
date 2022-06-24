import UA from "ua-parser-js";
import { useEffect, useState } from "react";


export const useBrowser = () => {
    const [ parsed, setParsed ] = useState<{
        browser: UA.IBrowser | null,
        device: UA.IDevice | null,
        os: UA.IOS | null,
        isIos: boolean
    }>({
        browser: null,
        device: null,
        os: null,
        isIos: false,
    })

    useEffect(() => {
        const parser = new UA();

        setParsed({
            browser: parser.getBrowser(),
            device: parser.getDevice(),
            os: parser.getOS(),
            isIos: parser.getOS().name === "iOS"
        })
    }, [])
    
    return parsed
}