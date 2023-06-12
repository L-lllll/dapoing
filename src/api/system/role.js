 import request from "../../untils/request";
 export function getListRoles(){
    return request( {
        url:'park/sys/role',
        method:'get'
     })
 }