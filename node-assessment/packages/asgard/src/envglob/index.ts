export default class EnvGlob {
    private static _folder: string
    private static _type: string

    public static setEnvGlob() {
        EnvGlob._folder = process.env.NODE_ENV === 'production' ? 'dist' : 'src' 
        EnvGlob._type = process.env.NODE_ENV === 'production' ? 'js' : 'ts' 
    }
    
    public static get folder(): string {
        return EnvGlob._folder
    }

    public static get type(): string {
        return EnvGlob._type
    }
}