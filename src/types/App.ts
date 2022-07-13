export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconUrl: string,
    categoryId: string,
    description: string,

    // DEPRECATED. To be removed
    appStoreLink?: string,
    playStoreLink?: string

    lighthouse?: {
        performance: number,
        accessibility: number,
        bestPractice: number,
        seo: number
    }
}