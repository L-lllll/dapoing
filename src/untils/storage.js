

const identity = 'identity'
export function setId(data){
    return localStorage.setItem(identity,JSON.stringify(data))
}
export function getId(){
    return JSON.parse(localStorage.getItem(identity))
}
export function removeId(){
    return localStorage.removeItem(identity)
}