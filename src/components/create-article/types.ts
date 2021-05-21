export interface IFormInput {
    title: string,
    description: string,
    body: string,
    tags: Array<{
        id: number,
        value: string
    }>
}