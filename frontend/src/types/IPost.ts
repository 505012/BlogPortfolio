export default interface IPost {
    uuid: string,
    pid?: any | null
    title: string,
    writer: string,
    content: any,
    insertTime: string
}