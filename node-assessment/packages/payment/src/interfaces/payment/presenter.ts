export class Presenter {
    static reply(data: object) {
        return {
            data: data
        }
    }

    static error(data: object) {
        return {
            data: data
        }
    }
}