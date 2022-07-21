/**
 * App type definition
 * @typedef {Object} App
 * 
 * @prop {string} id							The id of the app
 * @prop {string} name							The name of the app
 * @prop {string} author						Author name
 * @prop {string} url							URL pointing to the web app
 * @prop {string} iconLarge						URL pointing to a large app icon (512x512)
 * @prop {string} iconSmall						URL pointing to a small app icon (128x128)
 * @prop {string} categoryId					ID of the category this web app belongs to
 * @prop {string} description					Web app description
 * 
 * @prop {Object} [tags]						Defines aditional tags to the web app
 * @prop {boolean} [tags.desktop]				Is desktop optimized	
 * @prop {boolean} [tags.mobile]				Is mobile optimized	
 * @prop {boolean} [tags.offline]				Does it work offline	
 * @prop {boolean} [desktop]					Is open source	
 * 
 * @prop {Object} [lighthouse]					Displays lighthouse information
 * @prop {number} lighthouse.performance		Performance score
 * @prop {number} lighthouse.accessibility		Accessibility score
 * @prop {number} lighthouse.bestPractices		Best Practices score
 * @prop {number} lighthouse.seo				SEO score
 * @prop {number} lighthouse.updatedAt			When was the last time this information was updated at
 */
export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconLarge: string, 
    iconSmall: string,
    /**@deprecated Use iconLarge and iconSmall instead */
    iconUrl?: string,

    categoryId: string,
    description: string,

    tags?: {
        desktop?: boolean,
        mobile?: boolean,
        offline?: boolean,
        openSource?: boolean
    }

    lighthouse?: {
        performance: number,
        accessibility: number,
        bestPractices: number,
        seo: number,
        updatedAt: number
    },    

    /** @deprecated To be removed*/ 
    appStoreLink?: string,
    /** @deprecated To be removed*/ 
    playStoreLink?: string
}