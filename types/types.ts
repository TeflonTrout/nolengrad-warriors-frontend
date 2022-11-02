export interface Traits {
    trait_type: string,
    value: number
}

export interface Warrior {
    name: string,
    description: string,
    external_url: string,
    image: string,
    tokenId: number,
    attributes: Array<{
        trait_type: string,
        value: number
    }>
}