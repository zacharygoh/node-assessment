namespace App {
    export function getName() {
        const nameArray = process.cwd().split('/')
        let name = nameArray[nameArray.length -1]
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}

export default App