export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconUrl: string, // Soon to be removed
    categoryId: string,
    description: string,

    // Not fully implemented yet
    lighthouse?: {
        performance: number,
        accessibility: number,
        bestPractice: number,
        seo: number,
        updatedAt: number
    },

    // Not fully implemented yet
    iconLarge?: string, // For UI that requires big icon 
    iconSmall?: string, // For UI that required small icon
    

    // DEPRECATED. To be removed
    appStoreLink?: string,
    playStoreLink?: string
}